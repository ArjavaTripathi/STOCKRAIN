<<<<<<< HEAD
import Purchase from "functions\buy.js"

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

// Get a reference to the Firestore "stocks" collection
const stocksRef = admin.firestore().collection("stocks");

exports.buy = functions.https.onRequest((req, res) => {
  var buyer = req.headers['x-forwarded-for'];
  const query = req.query;
  var company = query.company; 
  var nStocks = query.stocks;
  stocksRef.get(buyer).then(doc => {
    if (doc.exists) {  //Read from another database: freestocks, price. 
      freeStocks = doc.data().freeStocks;
      balance = doc.data().balance;
      price = doc.data().price;
    }
  });

  if(balance>=nStocks*price && nStocks<=freeStocks){
    balance-=nStocks*price;
    freeStocks-=nStocks;
    // Update the "stocks" collection with the new data
    stocksRef.update({
      buyer: buyer,
      company: company,
      nStocks: nStocks,
      freeStocks: freeStocks,
      balance: balance
    });
    return true;
} else{
    return false;
}
});

exports.sell = functions.https.onRequest((req, res) => {
    var clientIp = req.headers['x-forwarded-for'];
    let Company = req.query.company;
    let stocks = req.query.stocks;
  

});
=======
// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access Firestore.
const admin = require('firebase-admin');
admin.initializeApp();

exports.addMessage = fucntions.https.onRequest((req,res)  => {
    Investor = req.params.name
    CompanyStock = req.params.company

})
>>>>>>> ca445d88109062f2550a48a996269f82329f3f06
