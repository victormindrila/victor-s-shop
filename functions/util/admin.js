const admin = require('firebase-admin');

admin.initializeApp();

const database = admin.firestore();

module.exports = { admin, database };
