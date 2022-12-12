const functions = require('firebase-functions');
const admin = require('firebase-admin');


admin.initializeApp();  //Create function to figure out which time to use! 



exports.buy = functions.https.onRequest((req, res) => {
  var buyer = req.headers['x-forwarded-for'];          //All needed variables
  const query = req.query;
  const industry = query.industry;
  var company = query.company; 
  var nStocks = query.stocks;
  var price = 0;
  const stocksRef = admin.firestore().collection("Stocks");
  const industryRef = stocksRef.collection(industry);
  const companyref = IndustryRef.collection(company);
  const StockRate = companyref = companyref.doc("StockRates");
  let time_period = 0;
  const pricePeriodRef = firestore.collection("Stocks").doc("PricePeriod");
  var balance, freeStocks, price;

  
  pricePeriodRef.get().then(doc => {     //Reads what time period it is 
    if (doc.exists) {
      time_period = doc.TimePeriod
    }
    });

  
  

 

  StockRate.get("rates").then(doc => {  //gets rates of the chosen company 
    if (doc.exists) {
      price = rates[time_period];
    }
  });

  if(balance>=nStocks*price && nStocks<=freeStocks){    //Updates stocks/balance of the investor
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
    let company = req.query.company;
    let stocks = req.query.stocks;
    if (ownedStocks >= nStocks) {


      balance += (stocks *price);//reflects change in money after selling stuff
      //freeStocks += nStocks;//checks if the dude got enough stocks to sell
      //ownedStocks -= nStocks;//updates owned stocks
      return true;
    }
      else {
      return false;
  }
  

});


  


exports.profile = functions.https.onRequest((req, res) => {
  clientIp = req.headers['x-forwarded-for']
  //cannot work on this till profile dabase is made. This will get the values of all stocks and from which companies the guy owns.

})

exports.market = functions.https.onRequest((res, req) => {
  var clientIp = req.headers['x-forwarded=for']
  let Industry = req.query.industry
  
})

exports.changeprice = functions.https.onRequest((res, req)=> {

  const pricePeriodRef = firestore.collection("Stocks").doc("PricePeriod");

  pricePeriodRef.update({
    TimePeriod: TimePeriod + 1
  });
  

})