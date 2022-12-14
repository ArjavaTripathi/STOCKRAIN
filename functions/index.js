const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();


const firestore = admin.firestore();


exports.test = functions.https.onRequest((req, res) => {
    res.send("Hello from Firebase functions!");

});



exports.testbuy = functions.https.onRequest(async (request, response) => {
    try{
        const docRef = firestore.collection("Stocks").doc("Automobile").collection("BMW").doc("StockRate");
        const snapshot = await docRef.get();
        if (snapshot && typeof snapshot.docs !== 'undefined') {
            snapshot.docs.forEach((doc) => {
                console.log(doc.data().rates[0]);
            });
        } else {
            console.error('Snapshot is undefined or null');
        }
    }catch (err) {
        console.error(err, 'Could not resolve');
}
});

    
