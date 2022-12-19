const functions = require("firebase-functions")
const admin = require("firebase-admin")
const AWS = require('aws-sdk');

admin.initializeApp();

AWS.config.update({
    region: "ap-south-1",
    accessKeyId: "AKIA44SS2E5ZGSGRRD5G",
    secretAccessKey: "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"
})




const db = new AWS.DynamoDB.DocumentClient();

exports.signup = functions.https.onRequest(async (request, response) => {
 // Get the attribute value from the request query parameters
 const email = "arjavatripathi5@gmail.com";

 // Create a new instance of the DynamoDB.DocumentClient class
 const docClient = new AWS.DynamoDB.DocumentClient();

 // Set the table name and the key condition expression for the query
 const params = {
   TableName: 'Profile',
   KeyConditionExpression: '#user = :user ',  // Specify the primary key and sort key attributes and their values in the key condition expression
   ExpressionAttributeValues: {
     ':user': email  // Provide the values for the placeholders in the key condition expression

   },
   ExpressionAttributeNames: {
    '#user': 'user'  // Map the expression attribute name '#user' to the actual attribute name 'user'
  }
 };

 // Try to query the table
 try {
   const result = await docClient.query(params).promise();

   // If the query returned any items, return them in the response
   if (result.Items.length > 0) {
     response.send(result.Items);
   } else {
  // Email was not found in the table, so create a new item
  const newItemParams = {     //WORKS!!!
    TableName: 'Profile',
    Item: {
      'user': email,
      'company ': 'tesla'
    }
  };

  try {
    await docClient.put(newItemParams).promise();
    response.send(true);
  } catch (error) {
    console.error(error);
    response.status(500).send("Error creating new item!")
  }
}
 } catch (error) {
   console.error(error);
   response.status(500).send("Error!")

}

});






exports.buy = functions.https.onRequest(async (request, response) => {
    const Table = 'Profile';
    const readAllUsers = async() => {
        const params = {
            TableName: Table
    };
    try{
        const { Items = [] } = await db.scan(params).promise()
        return{Items}
    } catch(error){
        return{data : "Nothing"}
    }
}
    const result = await readAllUsers();
    console.log(result);
})

exports.sell = functions.https.onRequest(async (request, response) => {
    
})

exports.Profile = functions.https.onRequest(async (request, response) => {
    const Table = 'Profile';
    const readAllUsers = async() => {
        const params = {
            TableName: time
    };
    try{
        const { Items = [] } = await db.scan(params).promise()
        return{Items}
    } catch(error){
        return{data : "Nothing"}
    }
}
    const result = await readAllUsers();
    response.send(result);
})


exports.getIndex = functions.https.onRequest(async (request, response) => {
    const Table = 'Profile';
    const readAllUsers = async() => {
        const params = {
            TableName: time
    };
    try{
        const { Items = [] } = await db.scan(params).promise()
        return{Items}
    } catch(error){
        return{data : "Nothing"}
    }
}
    const result = await readAllUsers();
    console.log(result);

})