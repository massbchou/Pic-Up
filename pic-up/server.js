// import express and morgan logger
const express = require('express');
const logger = require('morgan');
const cors = require('cors')
const path = require('path');
const multer = require('multer');
//const upload = multer({ dest: 'uploads/' });
const fs = require('fs');

// import api functions
const analyze = require('./src/analyze_data');
const helper = require('./src/helper');

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

// all below gets the file as an image file and stores it locally
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage });

let image_path = '';

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
    const imagePath = path.join(__dirname, '/uploads/' + uploadedImage.originalname);
    image_path = imagePath;

    // Use google api to get labels and stuff from image
    const labels = await analyze.analyse_image(imagePath);
    console.log(labels);

    // Prompt engineer stuff based on labels
    const chatResponse = await analyze.prompt_GPT(labels);
    console.log(chatResponse);

    const parsed = JSON.stringify(helper.parseString(chatResponse));

    // Write response to file
    fs.writeFile('src/info.json', parsed, (error) => {
        if (error) {
            console.error(error);
        }
    });
    
    res.status(200).end();
});

app.get('/read-file', async (req, res) => {

    // If image path not set yet
    if (image_path === '') {
        console.log(`No file in path: ${image_path}`);
        return;
    }
    
    // Delete file after reading
    fs.unlink(image_path, (err) => {
        if (err) {
            console.error(err);
            res.status(500).end();
            return;
        }

        console.log('File deleted');
    });

    // Read the contents of the JSON file
    fs.readFile('src/info.json', (err, data) => {
        if (err) {
            res.status(500).end();
            return;
        }
        //console.log('data:', data);
        const d = JSON.parse(data);
        res.status(200).send(d).end();
    });
    
});

// Send to homescreen if any other endpoint reached
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server on port
app.listen(port, () => {
    console.log(`Listening on pic-up port ${port}!!! ...cors enabled...`);
});