const { MongoClient } = require('mongodb');

// Connection URL and Database Name
const url = 'mongodb://localhost:27017';
const dbName = 'CriminalRecords';
const client = new MongoClient(url);

let db;

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected successfully to server");
        db = client.db(dbName);
    } catch (err) {
        console.error("Database connection error:", err);
        throw err;
    }
}

function getDb() {
    if (!db) {
        throw new Error("Database not connected. Call connectToDatabase first.");
    }
    return db;
}

module.exports = { connectToDatabase, getDb };
