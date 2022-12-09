class Purchase{
    constructor(buyer,company,nStocks,freeStocks,balance,price){
        this.buyer = buyer;
        this.balance = balance;
        this.company = company;
        this.nStocks = nStocks;
        this.freeStocks = freeStocks;
        this.price = price;
    }

    pruchase(){
        this.balance=Purchase.balance;
        this.nStocks=Purchase.nStocks;
        this.freeStocks=Purchase.freeStocks;
        if(this.balance>=this.nStocks*this.price && this.nStocks<=this.freeStocks){
            this.balance-=this.nstocks*this.price;
            this.freeStocks-=this.nStocks;
            return true;
        }
        else{
            return false;
        }
        console.log(Purchase);
    }
}

Purchase = new Purchase("Arnav", "tesla", 12, 2000, 10000, 100);
Purchase.pruchase();
