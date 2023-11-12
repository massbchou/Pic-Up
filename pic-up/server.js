// import express and morgan logger
const express = require('express');
const logger = require('morgan');
const cors = require('cors')
const path = require('path');
const multer = require('multer');
//const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

// import api functions
//const { openaiAPI } = require('./src/chatbot');
const analyze = require('./src/analyze_data');

const app = express();
const port = process.env.PORT || 5000;

app.use(logger('dev'));

// use extra middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// This is used for fetching static webpages using express
app.use('/', express.static('static'));
app.use(express.static(path.join(__dirname, 'build')));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

// Send to homescreen if any other endpoint reached
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Endpoint for sending image to google api
app.post('/identify-image', upload.single('image'), async (req, res) => {
    // request should contain the image in the data
    console.log(req.file);
    console.log('got something! (hopefully an image)');
    if (!req.file) {
        res.status(400).send("bad, very very bad");
        console.log('not a valid file');
        res.end();
        return;
    }
    const uploadedImage = req.file;
    res.status(200).send("good job");

    // Use google api to get labels and stuff from image
    const labels = await analyze.analyse_image(path.join(__dirname, '/uploads/' + uploadedImage.originalname));
    console.log(labels);

    // Prompt engineer stuff based on labels
    //const chatResponse = await openaiAPI('prompt based on labels and stuff', ...)
    res.end();
});

// Start server on port
app.listen(port, () => {
    console.log(`Listening on pic-up port ${port}!!! ...cors enabled...`);
});