const { MongoClient } = require('mongodb');

// Connection URL and Database Name
const url = 'mongodb://localhost:27017';
const dbName = 'CriminalRecords';

async function main() {
    const client = new MongoClient(url);
    try {
        await client.connect();
        console.log("Connected successfully to server");
        const db = client.db(dbName);

        // Additional code to interact with the database goes here
    } finally {
        await client.close();
    }
}

main().catch(console.error);
