const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
  try {
    if (req.file) {
      res.status(200).json({
        message: 'File uploaded successfully!',
        file: req.file
      });
    } else {
      res.status(400).json({ message: 'No file uploaded.' });
    }
  } catch (err) {
    res.status(500).json({
      message: 'Error uploading file.',
      error: err
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
