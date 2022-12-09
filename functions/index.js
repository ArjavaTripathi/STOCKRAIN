// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

exports.addMessage = fucntions.https.onRequest((req,res)  => {
    Investor = req.params.name
    CompanyStock = req.params.company

})
