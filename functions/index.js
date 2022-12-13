const functions = require('firebase-functions');
const admin = require('firebase-admin');
const async = require('async');


admin.initializeApp();  //Create function to figure out which time to use! 

const firestore = admin.firestore();






async function getTimePeriod(pricePeriodRef) {
  let time_period;

  try {
    await pricePeriodRef.get().then(doc => {
      if (doc.exists) {
        time_period = doc.TimePeriod;
      }
    });

    return time_period;
  } catch (error) {
    return false;
  }
}


exports.buy = functions.https.onRequest((req, res) => {
  var buyer = req.headers['x-forwarded-for'];          //All needed variables
  const query = req.query;
  const industry = query.industry;
  var company = query.company; 
  var nStocks = query.stocks;


  const stocksRef = admin.firestore().collection("Stocks");
  const industryRef = stocksRef.collection(industry);
  const companyref = industryRef.collection(company);
  const StockRate  = companyref.doc("StockRates");


  const pricePeriodRef = firestore.collection("Stocks").doc("PricePeriod");


  var balance, freeStocks, price;


  let time = getTimePeriod();

  if(typeof time == "number"){
    StockRate.get("rates").then(doc => {  //gets rates of the chosen company if time value has no error
      if (doc.exists) {
        price = doc.data().rates[getTimePeriod(pricePeriodRef)];
      }
    });
  } else{
    res.status(404).set("Database Error").send("Could not find time period in database!");
    return;
  }



  if(balance>=nStocks*price && nStocks<=freeStocks){    //Updates stocks/balance of the investor
    balance-=nStocks*price;
    freeStocks-=nStocks;
    stocksRef.doc(buyer).update({
      company: company,
      nStocks: nStocks,
      freeStocks: freeStocks,
      balance: balance
    });


    res.status(202).send("Updated Successfully");
  } else{


    res.status(500).set("Internal Server Error").send("Investors balance could not be updated");
    return;

  }
});

exports.sell = functions.https.onRequest((request, response) => {
    var clientIp = request.headers['x-forwarded-for'];
    let company = request.query.company;
    let stocks = request.query.stocks;
    var price;
    var balance; 
    var ownedStocks; 
    var nStocks; 
    if (ownedStocks >= nStocks) {


      balance += (stocks *price);//reflects change in money after selling stuff
      //freeStocks += nStocks;//checks if the dude got enough stocks to sell
      //ownedStocks -= nStocks;//updates owned stocks

      response.status(200).send("Success!");
    }
      else {
      response.status(500).send("Failure! Updating balance could not be resolved.");
      return;
  }
  

});


  


exports.profile = functions.https.onRequest((request, response) => {
  let clientIp = request.headers['x-forwarded-for']
  //cannot work on this till profile dabase is made. This will get the values of all stocks and from which companies the guy owns.

})

exports.market = functions.https.onRequest((response, request) => {
  var clientIp = request.headers['x-forwarded=for']
  let Industry = request.query.industry
  
})

exports.changeprice = functions.https.onRequest((response, request)=> {

  const pricePeriodRef = firestore.collection("Stocks").doc("PricePeriod");

  pricePeriodRef.update({
    TimePeriod: admin.firestore.FieldValue.increment(1)
  });
  

})

exports.test = functions.https.onRequest((request, response) => {
  let price = 69;
  response.send(price)
});

