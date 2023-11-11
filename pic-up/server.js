// import express and morgan logger
const express = require('express');
const logger = require('morgan');
const cors = require('cors')
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;;

app.use(logger('dev'));

// use extra middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// This is used for fetching static webpages using express
// app.use('/', express.static(path.join(__dirname, '/')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
    //res.send(path.join(__dirname, "../"));
});

app.listen(port, () => {
    console.log(`Listening on pic-up port ${port}!!!`);
});