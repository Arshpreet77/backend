const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';


const client = new MongoClient(url);
const dbName = 'CriminalRecords';
const db = client.db(dbName);
const collection = db.collection('criminals');
const data = require('./data.json')

// async function insertCriminal(db, criminal) {
//     const result = await collection.insertOne(criminal);
//     console.log(`A document was inserted with the _id: ${result.insertedId}`);
// }

async function loadData() {
    try {
        const result = await collection.insertMany(data);
        console.log(result)
    }catch(error){
        console.log(error)
    }
}

// // Example usage:
// main().then(async (db) => {
//     const newCriminal = {
//         name: "John Doe",
//         photo: "url_to_photo",
//         age: 30,
//         crime: "Theft",
//         otherDetails: "More details here"
//     };
//     await insertCriminal(db, newCriminal);
// });

async function findCriminalByName(name) {
    const collection = db.collection('criminals');
    const findResult = await collection.find({ name: name }).toArray();
    console.log("Found documents =>", findResult);
    return findResult;
}

module.exports = {loadData, findCriminalByName}