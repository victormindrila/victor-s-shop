const { admin, database } = require('../util/admin');
const config = require('../util/config');

exports.addToFavorites = async (request, response) => {
	const productId = request.body.productId;

	try {
		await database.collection('users').doc(`${request.body.email}`).collection(`favorites`).doc(`${productId}`).set({});
		return response.json({ message: 'Successfully added to favorites' });
	} catch (error) {
		console.log(error);
		return response.status(500).json({ error: 'Something went wrong' });
	}
};

exports.deleteFromFavorites = async (request, response) => {
	const productId = request.body.productId;
	try {
		await database
			.collection('users')
			.doc(`${request.body.email}`)
			.collection('favorites')
			.doc(`${productId}`)
			.delete();

		return response.json({ message: 'Product removed from favorites' });
	} catch (err) {
		console.log(err);
		return response.status(500).json({ error: err.code });
	}
};
