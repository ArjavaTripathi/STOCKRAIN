const functions = require("firebase-functions");
const admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://stockrain-3d18d-default-rtdb.asia-southeast1.firebasedatabase.app"
});


const firestore = admin.firestore();

exports.test = functions.https.onRequest((req, res) => {
  res.send("Hello from Firebase functions!");

});



exports.testbuy = functions.https.onRequest(async (request, response) => {
  try {
    const stocks = firestore.collection('Stocks');
    const docRef = stocks
      .doc('Automobile ')
      .collection('BMW')
      .doc('StockRates'); // Removed the `collection` call here

    const doc = await docRef.get();

    console.log(doc)

    if (doc.exists) {
      console.log(doc.id, '=>', doc.data().rates[0]);
    } else {
      response.send("Not Found");
    }

  } catch (err) {
    response.send("Could not resolve ", err.message);
  }
})
