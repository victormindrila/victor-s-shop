const { admin, database } = require('../util/admin');
const config = require('../util/config');

exports.addNewOrder = async (request, response) => {
	const newOrder = {
		token: request.body.token,
		uid: request.body.uid,
		email: request.body.email,
		products: request.body.products,
		deliveryAddress: request.body.deliveryAddress,
		billingAddress: request.body.billingAddress,
		comments: request.body.comments,
		completed: false,
		createdAt: new Date().toISOString()
	};

	try {
		const responseOrder = newOrder;
		const document = await database.collection('orders').add(newOrder);
		const { id: orderId } = document;
		responseOrder.id = orderId;
		await database.collection('users').doc(`${request.body.email}`).collection('orders').add({ orderId });

		return response.json({ order: responseOrder, message: 'Order placed successfully' });
	} catch (err) {
		console.log(err);
		return response.status(500).json({ error: 'Something went wrong' });
	}
};

exports.getAllOrders = async (request, response) => {
	try {
		let orders = [];
		const ordersSnapshots = await database.collection('orders').get();
		const usersPromises = [];

		ordersSnapshots.forEach((orderSnapshot) => {
			orders.push({
				id: orderSnapshot.id,
				uid: orderSnapshot.data().uid,
				email: orderSnapshot.data().email,
				products: orderSnapshot.data().products,
				deliveryAddress: orderSnapshot.data().deliveryAddress,
				billingAddress: orderSnapshot.data().billingAddress,
				comments: orderSnapshot.data().comments,
				completed: orderSnapshot.data().completed,
				createdAt: orderSnapshot.data().createdAt
			});
			usersPromises.push(database.doc(`/users/${orderSnapshot.data().email}`).get());
		});

		const usersSnapshots = await Promise.all(usersPromises);

		orders.map((order) => {
			usersSnapshots.forEach((snapshot) => {
				if (order.email === snapshot.data().email)
					order.userName = `${snapshot.data().firstName} ${snapshot.data().lastName}`;
			});
		});

		return response.json(orders);
	} catch (err) {
		console.log(err);
		return response.status(500).json({ error: err.code });
	}
};

exports.getOrderDetails = async (request, response) => {
	try {
		const { orderId } = request.query;
		const orderDocument = await database.doc(`/orders/${orderId}`).get();

		if (orderDocument.exists) {
			let orderData = orderDocument.data();
			orderData.id = orderDocument.id;
			const productsPromises = [];
			orderData.products.forEach((product) => {
				const promise = database.doc(`/products/${product.productId}`).get();
				productsPromises.push(promise);
			});

			const productsSnapshots = await Promise.all(productsPromises);

			const productsData = [];

			productsSnapshots.forEach((product) => {
				let productData = {};
				productData = product.data();
				productData.id = product.id;
				productsData.push(productData);
			});

			orderData.products.map((product) => {
				productsData.forEach((productData) => {
					if (productData.id === product.productId) {
						product.details = productData;
					}
				});
			});

			return response.json(orderData);
		}
		return response.status(404).json({ error: 'Order not found' });
	} catch (error) {
		console.error(error);
		return response.status(500).json({ error: error.code });
	}
};

exports.deleteOrder = async (request, response) => {
	try {
		const documentSnapshot = await database.doc(`/orders/${request.params.orderId}`).get();

		if (!documentSnapshot.exists) {
			return response.status(404).json({ error: 'Order not found' });
		}

		await database.doc(`/orders/${request.params.orderId}`).delete();

		return response.json({ message: 'Order deleted successfully' });
	} catch (err) {
		console.log(err);
		return response.status(500).json({ error: err.code });
	}
};

exports.updateOrder = async (request, response) => {
	if (request.body.orderId || request.body.createdAt || request.body.products) {
		return response.status(403).json({ message: 'Not allowed to edit' });
	}

	try {
		await database.collection('orders').doc(`${request.params.orderId}`).update(request.body);
		return response.json({ message: 'Updated successfully' });
	} catch (error) {
		console.error(err);
		return response.status(400).json({
			error: 'Something went wrong'
		});
	}
};
