const { admin, database } = require('../util/admin');
const config = require('../util/config');

exports.addNewOrder = async (request, response) => {
	const newOrder = {
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

		ordersSnapshots.forEach((orderSnapshot) => {
			orders.push({
				id: orderSnapshot.id,
				uid: orderSnapshot.data().uid,
				email: orderSnapshot.data().email,
				products: orderSnapshot.data().products,
				deliveryAddress: orderSnapshot.data().deliveryAddress,
				billingAddress: orderSnapshot.data().billingAddress,
				comments: orderSnapshot.data().comments,
				completed: orderSnapshot.data().completed
			});
		});
		for (let i = 0; i < orders.length; i++) {
			const productsPromises = [];
			for (let j = 0; j < orders[i].products.length; j++) {
				const promise = database.doc(`/products/${orders[i].products[j].productId}`).get();
				productsPromises.push(promise);
			}
			const productsSnapshots = await Promise.all(productsPromises);
			const products = [];
			productsSnapshots.forEach((product) => products.push(product.data()));
			console.log(products);
			orders[i].products = products;
		}

		return response.json(orders);
	} catch (err) {
		console.log(err);
		return response.status(500).json({ error: err.code });
	}
};

exports.getOrderDetails = (request, response) => {};

exports.deleteOrder = (request, response) => {};

exports.updateOrder = (request, response) => {};
