// THIS FILE CONNECTS THEE DATABASE

const { MongoClient } = require('mongodb');

// Connection URL and Database Name
const url = 'mongodb://localhost:27017';
const dbName = 'CriminalRecords';
const client = new MongoClient(url);

async function main() {
    try {
        await client.connect(); // db sever start
        console.log("Connected successfully to server");
    } finally {
        await client.close();
    }
}

main()
  .then(console.log)
  .catch(console.error);
