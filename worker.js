const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const yup = require('yup');
const monk = require('monk');
const { nanoid } = require('nanoid');

require('dotenv').config();

const db = monk(process.env.MONGO_URI);
const urls = db.get('urls');
urls.createIndex('name');

const app = express();

app.use(helmet()); //Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
app.use(morgan('dev')); //HTTP request logger middleware for node.js
app.use(cors()); //CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
app.use(express.json()); //is a method inbuilt in express to recognize the incoming Request Object as a JSON Object.
app.use(express.static('./public'));

app.get('/:id', (req, res) => {

});

app.get('/url/:id', (req, res) => {

});

const scheme = yup.object().shape({
    slug: yup.string().trim().matches(/[\w\-]/i),
    url: yup.string().trim().url().required(),
});//Yup is a JavaScript schema builder for value parsing and validation. Define a schema, transform a value to match, validate the shape of an existing value, or both. Yup schema are extremely expressive and allow modeling complex, interdependent validations, or value transformations

app.post('/url', async (req, res, next) => {
    let { slug, url } = req.body;
    try {

        await scheme.validate({
            slug, url
        });

        if (!slug) {
            slug = nanoid(5);//A tiny, secure, URL-friendly, unique string ID generator for JavaScript
        }
        slug = slug.toLowerCase();
        res.json({
            slug, url
        });
    } catch (error) {
        next(error);
    }
});
app.use((error, req, res, next) => {
    if (error.status) {
        res.status(error.status)
    } else {
        res.status(500);
    }
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV === 'production' ? '☺' : error.stack
    });
});

const pid = process.pid;
const port = process.env.PORT || 8001;
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