const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');

const { getAllProducts, addProduct, deleteProduct, editProduct, uploadProductPhoto } = require('./APIs/products');
const { loginUser, signUpUser, uploadProfilePhoto, getUserDetails, updateUserDetails } = require('./APIs/users');
const auth = require('./util/auth');

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// admin products
app.get('/admin/products', auth, getAllProducts);
app.post('/admin/product', auth, addProduct);
app.post('/admin/product/image', auth, uploadProductPhoto);
app.delete('/admin/product/:productId', auth, deleteProduct);
app.put('/admin/product/:productId', auth, editProduct);

// users
app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.post('/user/image', auth, uploadProfilePhoto);
app.get('/user', auth, getUserDetails);
app.post('/user', auth, updateUserDetails);

exports.api = functions.https.onRequest(app);
