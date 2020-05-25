let path = require('path');
const { admin, database } = require('../util/admin');
const config = require('../util/config');

exports.getAllProducts = async (req, res) => {
	try {
		let products = [];
		const productsSnapshots = await database.collection('products').get();
		const categoriesSnapshots = await database.collection('categories').get();
		productsSnapshots.forEach((productsSnapshot) => {
			let categoryDescription;
			categoriesSnapshots.forEach((snapshot) => {
				if (snapshot.id === productsSnapshot.data().category) categoryDescription = snapshot.data().name;
			});
			const productData = productsSnapshot.data();

			products.push({
				// eslint-disable-next-line no-alert
				...productData,
				// eslint-disable-next-line
				id: productsSnapshot.id,
				category: {
					id: productsSnapshot.data().category,
					name: categoryDescription
				}
			});
		});
		return res.json(products);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: err.code });
	}
};

exports.addProduct = (request, response) => {
	if (request.body.price === 0) {
		return response.status(400).json({ price: 'Must not be empty' });
	}

	if (request.body.currency === '') {
		return response.status(400).json({ currency: 'Must not be empty' });
	}

	if (request.body.title.trim() === '') {
		return response.status(400).json({ title: 'Must not be empty' });
	}

	if (request.body.category.trim() === '') {
		return response.status(400).json({ category: 'Must not be empty' });
	}

	const newProduct = {
		title: request.body.title,
		itemNumber: request.body.itemNumber,
		brand: request.body.brand,
		price: request.body.price,
		currency: request.body.currency,
		material: request.body.material,
		weight: request.body.weight,
		description: request.body.description,
		category: request.body.category,
		createdAt: new Date().toISOString()
	};

	database
		.collection('products')
		.add(newProduct)
		.then((doc) => {
			const responseProduct = newProduct;
			responseProduct.id = doc.id;
			return response.json({ product: responseProduct, message: 'Product created successfully' });
		})
		.catch((err) => {
			console.log(err);
			return response.status(500).json({ error: 'Something went wrong' });
		});
};

const deleteImage = (imageName) => {
	const bucket = admin.storage().bucket();
	const path = `${imageName}`;
	return bucket
		.file(path)
		.delete()
		.then(() => {
			return;
		})
		.catch((error) => {
			return;
		});
};

exports.uploadProductPhoto = (request, response) => {
	const BusBoy = require('busboy');
	const path = require('path');
	const os = require('os');
	const fs = require('fs');
	const busboy = new BusBoy({ headers: request.headers });

	let imageFileName;
	let imageToBeUploaded = {};
	let productId;

	busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
		if (fieldname === 'productId') productId = val;
	});

	busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
		if (mimetype !== 'image/png' && mimetype !== 'image/jpeg') {
			return response.status(400).json({ error: 'Wrong file type submited' });
		}
		const imageExtension = filename.split('.')[filename.split('.').length - 1];
		imageFileName = `${productId}.${imageExtension}`;
		const filePath = path.join(os.tmpdir(), imageFileName);
		imageToBeUploaded = { filePath, mimetype };
		file.pipe(fs.createWriteStream(filePath));
	});

	deleteImage(imageFileName);

	busboy.on('finish', () => {
		admin
			.storage()
			.bucket()
			.upload(imageToBeUploaded.filePath, {
				resumable: false,
				metadata: {
					metadata: {
						contentType: imageToBeUploaded.mimetype
					}
				}
			})
			.then(() => {
				const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`;
				return database.doc(`/products/${productId}`).update({
					imageUrl
				});
			})
			.then(() => {
				return response.json({ message: 'Image uploaded successfully' });
			})
			.catch((error) => {
				console.error(error);
				return response.status(500).json({ error: error.code });
			});
	});
	busboy.end(request.rawBody);
};

exports.editProduct = (request, response) => {
	if (request.body.productId || request.body.createdAt) {
		response.status(403).json({ message: 'Not allowed to edit' });
	}
	let document = database.collection('products').doc(`${request.params.productId}`);

	document
		.update(request.body)
		// eslint-disable-next-line
		.then(() => {
			response.json({ message: 'Updated successfully' });
		})
		.catch((err) => {
			console.error(err);
			return response.status(400).json({
				error: 'Something went wrong'
			});
		});
};

exports.deleteProduct = (request, response) => {
	const document = database.doc(`/products/${request.params.productId}`);
	let imagePath;

	deleteImage(request.params.productId);
	document
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return response.status(404).json({ error: 'Product not found' });
			}
			let image = path.basename(doc.data().imageUrl).split('?')[0];
			deleteImage(image);

			return document.delete();
		})
		// eslint-disable-next-line
		.then(() => {
			response.json({ message: 'Product deleted successfully' });
		})
		.catch((err) => {
			console.log(err);
			return response.status(500).json({ error: err.code });
		});
};

exports.getProductDetails = async (request, response) => {
	try {
		const productDoc = await database.doc(`/products/${request.query.productId}`).get();
		const categoriesSnapshots = await database.collection('categories').get();

		let productData = {};
		if (productDoc.exists) {
			productData = productDoc.data();
			categoriesSnapshots.forEach((snapshot) => {
				if (snapshot.id === productData.category) productData.category = snapshot.data().name;
			});
			return response.json(productData);
		}
	} catch (error) {
		console.error(error);
		return response.status(500).json({ error: error.code });
	}
};
