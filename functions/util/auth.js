const { admin, database } = require('./admin');

module.exports = (request, response, next) => {
	let idToken;
	if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
		idToken = request.headers.authorization.split('Bearer ')[1];
	} else {
		console.error('No token found');
		return response.status(403).json({ error: 'Unauthorized' });
	}
	admin
		.auth()
		.verifyIdToken(idToken)
		.then((decodedToken) => {
			request.user = decodedToken;
			return database.collection('users').where('userId', '==', request.user.uid).limit(1).get();
		})
		.then((data) => {
			if (data.docs[0]) {
				request.user.email = data.docs[0].data().email;
				request.user.imageUrl = data.docs[0].data().imageUrl;
			}

			return next();
		})
		.catch((err) => {
			console.error('Error while verifying token', err);
			return response.status(403).json(err);
		});
};
