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

const Table = 'Profiles';


exports.testbuy = functions.https.onRequest(async (request, response) => {
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

    console.log(readAllUsers)
})
