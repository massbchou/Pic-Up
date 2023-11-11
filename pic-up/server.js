// import express and morgan logger
const express = require('express');
const logger = require('morgan');
const cors = require('cors')
const path = require('path');

// import api functions
import { openaiAPI } from './src/chatbot';
import { analyse_image } from './src/analyze_data';

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
app.get('/identify-image', async (req, res) => {
    console.log('got something! (an image)');
});

// Start server on port
app.listen(port, () => {
    console.log(`Listening on pic-up port ${port}!!! ...cors enabled...`);
});