// import express and morgan logger
const express = require('express');
const logger = require('morgan');
const cors = require('cors')
const path = require('path');

// import api functions
//import { openaiAPI } from './src/chatbot';
//import { analyse_image } from './src/analyze_data';

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

// Send to homescreen if any other endpoint reached
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Endpoint for sending image to google api
app.post('/identify-image', async (req, res) => {
    // request should contain the image in the data
    console.log(req.body);
    console.log('got something! (hopefully an image)');
    console.log(JSON.stringify(req.body) === JSON.stringify({}))
    if (req.body === null || req.body === "" || JSON.stringify(req.body) === JSON.stringify({})) {
        res.status(400).send("bad, very very bad");
        console.log('not a valid file');
        res.end();
        return;
    }
    //const imageURL = req.body;
    res.status(200).send("good job");
    //const [labels, logos] = await analyse_image(imageURL)
    //console(labels);
    //const chatResponse = await openaiAPI('prompt based on labels and stuff', ...)
    res.end();
});

// Start server on port
app.listen(port, () => {
    console.log(`Listening on pic-up port ${port}!!! ...cors enabled...`);
});