const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const stocksRef = admin.firestore().collection("stocks");

exports.buy = functions.https.onRequest((req, res) => {
  var buyer = req.headers['x-forwarded-for'];
  const query = req.query;
  var company = query.company; 
  var nStocks = query.stocks;
  var balance, freeStocks, price;

  stocksRef.doc(buyer).get().then(doc => {
    if (doc.exists) {  
      freeStocks = doc.data().freeStocks;
      balance = doc.data().balance;
      price = doc.data().price;
    }
  });

  if(balance>=nStocks*price && nStocks<=freeStocks){
    balance-=nStocks*price;
    freeStocks-=nStocks;
    stocksRef.doc(buyer).update({
      company: company,
      nStocks: nStocks,
      freeStocks: freeStocks,
      balance: balance
    });
    res.json({ success: true });
  } else{
    res.json({ success: false });
  }
});

exports.sell = functions.https.onRequest((req, res) => {
    var clientIp = req.headers['x-forwarded-for'];
    let Company = req.query.company;
    let stocks = req.query.stocks;
  

});
