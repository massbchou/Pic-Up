// import express and morgan logger
const express = require('express');
const logger = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;;

app.use(logger('dev'));

// use extra middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', express.static(path.join(__dirname, '../client/html/landing.html')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/html/landing.html'));
});

app.listen(port, () => {
    console.log(`Listening on pic-up port ${port}!!!`);
});