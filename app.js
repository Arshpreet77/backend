const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { connectToDatabase, getDb } = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/criminals/load-data', async (req, res) => {
    try {
        const db = getDb();
        const data = req.body;
        await db.collection('criminals').insertMany(data);
        res.json({ "message": "Data Load Success!" });
    } catch (error) {
        res.status(500).json({ "message": "Data Load Failed!", "error": error.message });
    }
});

app.get('/criminals', async (req, res) => {
    try {
        const db = getDb();
        const criminals = await db.collection('criminals').find({}).toArray();
        res.json(criminals);
    } catch (error) {
        res.status(500).json({ "message": "Error fetching criminals", "error": error.message });
    }
});

app.get('/criminals/category/:category', async (req, res) => {
    try {
        const category = req.params.category.toUpperCase();
        const db = getDb();
        const criminals = await db.collection('criminals').find({ category }).toArray();
        res.json(criminals);
    } catch (error) {
        res.status(500).json({ "message": "Error fetching criminals", "error": error.message });
    }
});

app.get('/criminals/search', async (req, res) => {
    console.log("Search endpoint hit");
    try {
        const { caseNumber, officerUnit } = req.query;
        console.log("Query params:", { caseNumber, officerUnit });

        const db = getDb();
        const criminalCase = await db.collection('criminals').findOne({ caseNumber: caseNumber.toString(), officerUnit: officerUnit.toString() });

        if (criminalCase) {
            console.log("Case found:", criminalCase);
            res.json(criminalCase);
        } else {
            console.log("Case not found");
            res.json({ "message": "Case not found" });
        }
    } catch (error) {
        console.error('Error fetching case:', error);
        res.status(500).json({ "message": "Error fetching case", "error": error.message });
    }
});

app.post('/criminals/create', async (req, res) => {
    try {
        const db = getDb();
        const newCase = req.body;
        console.log("New case data received:", newCase); // Log the received data
        const result = await db.collection('criminals').insertOne(newCase);
        console.log("Insert result:", result); // Log the insert result
        res.json({ "message": "Case created successfully!" });
    } catch (error) {
        console.error('Error creating case:', error);
        res.status(500).json({ "message": "Error creating case", "error": error.message });
    }
});

// Endpoint for adding evidence
app.post('/evidence', upload.single('file'), async (req, res) => {
    try {
        const db = getDb();
        const newEvidence = {
            caseNumber: req.body.caseNumber,
            filePath: req.file.path,
            fileName: req.file.originalname,
        };

        await db.collection('evidence').insertOne(newEvidence);
        res.status(201).json(newEvidence);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const port = 3001;

connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}).catch(err => {
    console.error('Failed to connect to database. Server not started.', err);
});
