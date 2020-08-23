const http = require('http');
const pid = process.pid;
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const port = process.env.PORT || 8001;
require('dotenv').config(); 


http.createServer((req, res) => {

    //ANY HEAVY TASK
    for (let i = 0; i < 1e7; i++) { }

    res.end(`Server created\n`)
}).listen(port, () => {
    console.log(`Server started. PID: ${pid}  PORT: ${port}`)
})