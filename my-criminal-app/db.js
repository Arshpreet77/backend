async function insertCriminal(db, criminal) {
    const collection = db.collection('criminals');
    const result = await collection.insertOne(criminal);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
}

// Example usage:
main().then(async (db) => {
    const newCriminal = {
        name: "John Doe",
        photo: "url_to_photo",
        age: 30,
        crime: "Theft",
        otherDetails: "More details here"
    };
    await insertCriminal(db, newCriminal);
});

async function findCriminalByName(db, name) {
    const collection = db.collection('criminals');
    const findResult = await collection.find({ name: name }).toArray();
    console.log("Found documents =>", findResult);
    return findResult;
}
