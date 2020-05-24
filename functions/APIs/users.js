const { admin, database } = require('../util/admin');
const config = require('../util/config');
let path = require('path');

const firebase = require('firebase');

firebase.initializeApp(config);

const { validateLoginData, validateSignUpData } = require('../util/validators');

// Login
exports.loginUser = (request, response) => {
	const user = {
		email: request.body.email,
		password: request.body.password
	};

	const { valid, errors } = validateLoginData(user);
	if (!valid) return response.status(400).json(errors);

	let token;
	firebase
		.auth()
		.signInWithEmailAndPassword(user.email, user.password)
		.then((data) => {
			return data.user.getIdToken();
		})
		.then((idToken) => {
			token = idToken;
			return database.doc(`/users/${user.email}`).get();
		})
		.then((doc) => {
			const { firstName, lastName, email } = doc.data();
			return response.status(201).json({ token, firstName, lastName, email });
		})
		.catch((error) => {
			console.log(error);
			return response.status(403).json({ error: 'wrong credentials, please try again' });
		});
};

exports.signUpUser = (request, response) => {
	const newUser = {
		firstName: request.body.firstName,
		lastName: request.body.lastName,
		email: request.body.email,
		phoneNumber: request.body.phoneNumber,
		country: request.body.country,
		password: request.body.password,
		confirmPassword: request.body.confirmPassword
	};

	const { valid, errors } = validateSignUpData(newUser);

	if (!valid) return response.status(400).json(errors);

	let token, userId;
	database
		.doc(`/users/${newUser.email}`)
		.get()
		.then((doc) => {
			if (doc.exists) {
				return response.status(400).json({ email: 'this email is already taken' });
			} else {
				return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
			}
		})
		.then((data) => {
			userId = data.user.uid;
			return data.user.getIdToken();
		})
		.then((idtoken) => {
			token = idtoken;
			const userCredentials = {
				firstName: newUser.firstName,
				lastName: newUser.lastName,
				phoneNumber: newUser.phoneNumber,
				country: newUser.country,
				email: newUser.email,
				createdAt: new Date().toISOString(),
				userId
			};
			return database.doc(`/users/${newUser.email}`).set(userCredentials);
		})
		.then(() => {
			return response.status(201).json({ token, firstName: newUser.firstName, lastName: newUser.lastName });
		})
		.catch((err) => {
			console.error(err);
			if (err.code === 'auth/email-already-in-use') {
				return response.status(400).json({ email: 'Email already in use' });
			} else {
				return response.status(500).json({ general: 'Something went wrong, please try again' });
			}
		});
};

deleteImage = (imageName) => {
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

// Upload profile picture
exports.uploadProfilePhoto = (request, response) => {
	const BusBoy = require('busboy');
	const path = require('path');
	const os = require('os');
	const fs = require('fs');
	const busboy = new BusBoy({ headers: request.headers });

	let imageFileName;
	let imageToBeUploaded = {};

	busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
		if (mimetype !== 'image/png' && mimetype !== 'image/jpeg') {
			return response.status(400).json({ error: 'Wrong file type submited' });
		}
		const imageExtension = filename.split('.')[filename.split('.').length - 1];
		imageFileName = `${request.user.username}.${imageExtension}`;
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
				return database.doc(`/users/${request.user.username}`).update({
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

exports.getUserDetails = async (request, response) => {
	try {
		let userData = {};
		let favorites = [];
		const documentSnapshot = await database.doc(`/users/${request.user.email}`).get();
		const favoritesSnapshot = await database.doc(`/users/${request.user.email}`).collection('favorites').get();
		favoritesSnapshot.forEach((element) => {
			favorites.push(element.id);
		});

		if (documentSnapshot.exists) {
			userData = documentSnapshot.data();
			userData.favorites = favorites;
			return response.json(userData);
		}
	} catch (error) {
		console.error(error);
		return response.status(500).json({ error: error.code });
	}
};

exports.updateUserDetails = (request, response) => {
	let document = database.collection('users').doc(`${request.user.username}`);
	document
		.update(request.body)
		// eslint-disable-next-line
		.then(() => {
			response.json({ message: 'Updated successfully' });
		})
		.catch((error) => {
			console.error(error);
			return response.status(500).json({
				message: 'Cannot Update the value'
			});
		});
};

exports.setUserDetails = async (request, response) => {
	const userCredentials = {
		firstName: request.body.firstName,
		lastName: request.body.lastName,
		phoneNumber: request.body.phoneNumber,
		country: request.body.country,
		email: request.body.email,
		createdAt: new Date().toISOString(),
		userId: request.body.uid
	};
	console.log(userCredentials);
	try {
		const checkSnapshot = await database.doc(`/users/${userCredentials.email}`).get();
		if (checkSnapshot.exists) {
			return response.status(201).json(checkSnapshot.data());
		}

		await database.doc(`/users/${userCredentials.email}`).set(userCredentials);
		return response.status(201).json(userCredentials);
	} catch (error) {
		console.log(error);
		return response.status(500).json({
			message: 'Something went wrong'
		});
	}
};

exports.getAllUsers = async (req, res) => {
	try {
		let users = [];
		const userSnapshots = await database.collection('users').get();
		userSnapshots.forEach((userSnapshot) => {
			users.push({
				uid: userSnapshot.data().userId,
				email: userSnapshot.data().email,
				firstName: userSnapshot.data().firstName,
				lastName: userSnapshot.data().lastName,
				phoneNumber: userSnapshot.data().phoneNumber,
				country: userSnapshot.data().country,
				createdAt: userSnapshot.data().createdAt
			});
		});
		return res.json(users);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ error: err.code });
	}
};

exports.deleteUser = (request, response) => {
	const document = database.doc(`/users/${request.params.email}`);

	document
		.get()
		.then((doc) => {
			if (!doc.exists) {
				return response.status(404).json({ error: 'User not found' });
			}

			return document.delete();
		})
		// eslint-disable-next-line
		.then(() => {
			response.json({ message: 'User deleted successfully' });
		})
		.catch((err) => {
			console.log(err);
			return response.status(500).json({ error: err.code });
		});
};
