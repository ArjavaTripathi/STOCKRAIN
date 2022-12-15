const functions = require("firebase-functions");
const express = require("express");
const admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKeys.json");
const app = express();
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://stockrain-3d18d-default-rtdb.asia-southeast1.firebasedatabase.app"
});
const firestore = admin.firestore();
const authenticate = async(req, res, next) => {
    const idToken = req.headers.authorization; 
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.userId = decodedToken.uid;
    next();
};




exports.test = functions.https.onRequest((req, res) => {
  res.send("Hello from Firebase functions!");

});



exports.testbuy = functions.https.onRequest(async (request, response) => {
  try {
  
    app.use(authenticate)
    const stocks = firestore.collection('Stocks');
    const docRef = stocks
      .doc('Food')
      .collection('McDonalds')
      .doc('StockRates ')
      .get().then((snapshot) =>{
        if (!snapshot.empty) {
        console.log("Snapshot Found");
        console.log();
        console.log("I can sleep happy tonight")
      } else {
        response.send("Not Found");
      }}); 
  

  } catch (err) {
    response.status(err).send("Could not Resolve!")
  }
})
