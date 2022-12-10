const functions = require('firebase-admin');
functions.initializeApp();

// Get a reference to the Firestore "stocks" collection
const stocksRef = functions.firestore().collection("stocks");

class Purchase{
    constructor(buyer,company,nStocks,freeStocks,balance,price){
        this.buyer = buyer;
        this.company = company;
        this.nStocks = nStocks;

        // Retrieve the document for the given buyer
        stocksRef.get(buyer).then(doc => {
          if (doc.exists) {
            this.freeStocks = doc.data().freeStocks;
            this.balance = doc.data().balance;
            this.price = doc.data().price;
          }
        });
    }

    purchase(){
        if(this.balance>=this.nStocks*this.price && this.nStocks<=this.freeStocks){
            this.balance-=this.nStocks*this.price;
            this.freeStocks-=this.nStocks;
            // Update the "stocks" collection with the new data
            stocksRef.update({
              buyer: this.buyer,
              company: this.company,
              nStocks: this.nStocks,
              freeStocks: this.freeStocks,
              balance: this.balance
            });
            return true;
        }
        else{
            return false;
        }
    }
}

myPurchase = new Purchase("Arnav", "tesla", 12, 2000, 10000, 100);
myPurchase.purchase();
console.log(myPurchase);

module.export;




