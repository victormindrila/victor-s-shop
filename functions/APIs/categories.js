const path = require('path');
const { admin, database } = require('../util/admin');
const config = require('../util/config');

exports.getAllCategories = (req, res) => {
	database
		.collection('categories')
		.get()
		.then((data) => {
			categories = [];
			data.forEach((doc) => {
				categories.push({
					id: doc.id,
					description: doc.data().description,
					name: doc.data().name,
					imageUrl: doc.data().imageUrl
				});
			});
			return res.json(categories);
		})
		.catch((err) => {
			console.log(err);
			return res.status(500).json({ error: err.code });
		});
};

exports.addCategory = (request, response) => {
	if (request.body.description.trim() === '') {
		return response.status(400).json({ description: 'Must not be empty' });
	}

	const newCategory = {
		description: request.body.description,
		name: request.body.name,
		createdAt: new Date().toISOString()
	};

	database
		.collection('categories')
		.add(newCategory)
		.then((doc) => {
			const responseCategory = newCategory;
			responseCategory.id = doc.id;
			return response.json({ category: responseCategory, message: 'Category created successfully' });
		})
		.catch((err) => {
			console.log(err);
			return response.status(500).json({ error: 'Something went wrong' });
		});
};

exports.editCategory = (request, response) => {
	if (request.body.productId || request.body.createdAt) {
		response.status(403).json({ message: 'Not allowed to edit' });
	}
	let document = database.collection('categories').doc(`${request.params.categoryId}`);

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

exports.deleteCategory = (request, response) => {
	const document = database.doc(`/categories/${request.params.categoryId}`);

	document
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return response.status(404).json({ error: 'Category not found' });
			}
			let image = path.basename(doc.data().imageUrl).split('?')[0];
			deleteImage(image);
			return document.delete();
		})
		// eslint-disable-next-line
		.then(() => {
			response.json({ message: 'Category deleted successfully' });
		})
		.catch((err) => {
			console.log(err);
			return response.status(500).json({ error: err.code });
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

exports.uploadCategoryPhoto = (request, response) => {
	const BusBoy = require('busboy');
	const path = require('path');
	const os = require('os');
	const fs = require('fs');
	const busboy = new BusBoy({ headers: request.headers });

	let imageFileName;
	let imageToBeUploaded = {};
	let categoryId;

	busboy.on('field', (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) => {
		if (fieldname === 'categoryId') categoryId = val;
	});

	busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
		if (mimetype !== 'image/png' && mimetype !== 'image/jpeg') {
			return response.status(400).json({ error: 'Wrong file type submited' });
		}
		const imageExtension = filename.split('.')[filename.split('.').length - 1];
		imageFileName = `${categoryId}.${imageExtension}`;
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
				return database.doc(`/categories/${categoryId}`).update({
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

exports.getCategoryDetails = (request, response) => {
	let categoryData = {};
	database
		.doc(`/categories/${request.query.categoryId}`)
		.get()
		.then((doc) => {
			// eslint-disable-next-line
			if (doc.exists) {
				categoryData = doc.data();
				return response.json(categoryData);
			}
		})
		.catch((error) => {
			console.error(error);
			return response.status(500).json({ error: error.code });
		});
};
