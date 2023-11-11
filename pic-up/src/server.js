// import express and morgan logger
const express = require('express');
const logger = require('morgan');

const app = express();
const port = 3000;

app.use(logger('dev'));

// use extra middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
    console.log('Listening on port 300');
});