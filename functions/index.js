const functions = require("firebase-functions");
const admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://stockrain-3d18d-default-rtdb.asia-southeast1.firebasedatabase.app"
});


//const firestore = admin.firestore();
const firestore = admin.firestore()

exports.test = functions.https.onRequest((req, res) => {
  res.send("Hello from Firebase functions!");

});



exports.testbuy = functions.https.onRequest(async (request, response) => {
  try {
    const stocks = firestore.collection('Stocks');
    const docRef = stocks
      .doc('Automobiles ')
      .collection('BMW')
      .doc('StockRates')
      .get()
        .then((snapshot) => {
          if (!snapshot.empty) {
    
            console.log(snapshot.data());
          } else {
            response.send("Not Found");
          }
        })





    /*var ref = database.ref('/Stocks/Automobile /BMW/StockRates');

    console.log("Ref is: ", ref)

    ref.once("value")
    .then( function(snapshot){
      var name = snapshot.child("rates[0]").val(); 
      console.log(name);
    })*/
 



  } catch (err) {
    response.send("Could not resolve ", err.message);
  }
})
