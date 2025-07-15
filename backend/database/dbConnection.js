require("dotenv").config();
const {MongoClient} = require("mongodb");
const uri = process.env.URI;
const client =new MongoClient(uri);

let isConnected = false;
async function connectDB() {
    if(isConnected==false){
        try{
            await client.connect();
            isConnected = true;
            console.log("️✅ Connected to MongoDB!");            
        }catch (error){
            console.error("❌ MongoDB connection failed:",err);
            throw err;            
        }
    }
}

function getClient(){
    if(isConnected == false){
        throw new Error("❌ MongoClient is not connected. Call connectDB() first.")
    }
    return client;
}

module.exports = {connectDB,getClient}