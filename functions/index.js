const functions = require('firebase-functions');
const app = require('express')();
const cors = require('cors');

const { getAllProducts, addProduct, deleteProduct, editProduct, uploadProductPhoto } = require('./APIs/products');
const { loginUser, signUpUser, uploadProfilePhoto, getUserDetails, updateUserDetails } = require('./APIs/users');
const auth = require('./util/auth');

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// products
app.get('/products', getAllProducts);
app.post('/product', auth, addProduct);
app.post('/product/image', auth, uploadProductPhoto);
app.delete('/product/:productId', deleteProduct);
app.put('/product/:productId', auth, editProduct);

// users
app.post('/login', loginUser);
app.post('/signup', signUpUser);
app.post('/user/image', auth, uploadProfilePhoto);
app.get('/user', auth, getUserDetails);
app.post('/user', auth, updateUserDetails);

exports.api = functions.https.onRequest(app);
