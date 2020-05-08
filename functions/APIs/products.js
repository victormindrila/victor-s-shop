let path = require('path');
const { admin, database } = require('../util/admin');
const config = require('../util/config');

exports.getAllProducts = (req, res) => {
	database
		.collection('products')
		.get()
		.then((data) => {
			products = [];
			data.forEach((doc) => {
				products.push({
					id: doc.id,
					description: doc.data().description,
					picture: doc.data().picture,
					price: doc.data().price
				});
			});
			return res.json(products);
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json({ error: err.code });
		});
};

exports.addProduct = (request, response) => {
	if (request.body.price === 0) {
		return response.status(400).json({ body: 'Must not be empty' });
	}

	if (request.body.description.trim() === '') {
		return response.status(400).json({ description: 'Must not be empty' });
	}

	const newProduct = {
		description: request.body.description,
		price: request.body.price,
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
			return response.status(500).json({ errror: 'Something went wrong' });
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

exports.getProductDetails = (request, response) => {
	let productData = {};
	database
		.doc(`/products/${request.query.productId}`)
		.get()
		.then((doc) => {
			// eslint-disable-next-line
			if (doc.exists) {
				productData = doc.data();
				return response.json(productData);
			}
		})
		.catch((error) => {
			console.error(error);
			return response.status(500).json({ error: error.code });
		});
};
