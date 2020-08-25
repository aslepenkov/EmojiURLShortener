const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const port = process.env.PORT || 8001;
const pid = process.pid;

require('dotenv').config();

const app = express();


app.use(helmet()); //Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
app.use(morgan('dev')); //HTTP request logger middleware for node.js
app.use(cors()); //CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
app.use(express.json()); //is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.


app.get('/:id', (req, res) => {
    res.json({
        message: 'MSG'
    })
});

app.listen(port, () => {

    console.log(`Server started. PID: ${pid}  PORT: ${port}`)
});
// http.createServer((req, res) => {

//     //ANY HEAVY TASK
//     for (let i = 0; i < 1e7; i++) { }

//     res.end(`Server created\n`)
// }).listen(port, () => {
//     console.log(`Server started. PID: ${pid}  PORT: ${port}`)
// })