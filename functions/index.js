const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');

const {
	getAllProducts,
	addProduct,
	deleteProduct,
	editProduct,
	uploadProductPhoto,
	getProductDetails
} = require('./APIs/products');
const {
	loginUser,
	signUpUser,
	uploadProfilePhoto,
	getUserDetails,
	updateUserDetails,
	getAllUsers,
	deleteUser,
	setUserDetails
} = require('./APIs/users');
const {
	addCategory,
	deleteCategory,
	getAllCategories,
	editCategory,
	uploadCategoryPhoto,
	getCategoryDetails
} = require('./APIs/categories');
const { addToFavorites, deleteFromFavorites } = require('./APIs/favorites');
const { addNewOrder, getAllOrders, getOrderDetails, deleteOrder, updateOrder } = require('./APIs/orders');
const auth = require('./util/auth');

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// admin products
app.get('/admin/products', auth, getAllProducts);
app.get('/admin/product/', auth, getProductDetails);
app.post('/admin/product', auth, addProduct);
app.post('/admin/product/image', auth, uploadProductPhoto);
app.delete('/admin/product/:productId', auth, deleteProduct);
app.put('/admin/product/:productId', auth, editProduct);

//admin categories
app.get('/admin/categories/', auth, getAllCategories);
app.get('/admin/category/', auth, getCategoryDetails);
app.post('/admin/category/', auth, addCategory);
app.post('/admin/category/image', auth, uploadCategoryPhoto);
app.delete('/admin/category/:categoryId', auth, deleteCategory);
app.put('/admin/category/:categoryId', auth, editCategory);

// users
app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.post('/user/image', auth, uploadProfilePhoto);
app.get('/user', auth, getUserDetails);
app.post('/user', auth, updateUserDetails);

// users admin
app.get('/admin/users', auth, getAllUsers);
app.get('/admin/users/view', auth, getUserDetails);
app.delete('/admin/user/:email', auth, deleteUser);

// orders
app.get('/admin/orders/', auth, getAllOrders);
app.post('/order/', auth, addNewOrder);
app.get('/admin/order/', auth, getOrderDetails);
app.delete('/admin/order/:orderId', auth, deleteOrder);
app.put('/admin/order/:orderId', auth, updateOrder);

app.get('/categories', getAllCategories);
app.get('/products', getAllProducts);
app.get('/product', getProductDetails);
app.post('/favorite/', auth, addToFavorites);
app.post('/user/setDetails', auth, setUserDetails);
app.delete('/favorite/', auth, deleteFromFavorites);

exports.api = functions.https.onRequest(app);
