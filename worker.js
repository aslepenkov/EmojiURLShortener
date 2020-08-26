const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const yup = require('yup');
const monk = require('monk');
const getEmojis = require('./emojis.js');
const { nanoid } = require('nanoid');

require('dotenv').config();

const db = monk(process.env.MONGODB_URI);
const urls = db.get('urls');
urls.createIndex({ slug: 1 }, { unique: true });

const app = express();

app.use(helmet()); // Helmet helps you secure your Express apps by setting various HTTP headers
app.use(morgan('dev')); // HTTP request logger middleware for node.js
app.use(cors()); // for providing CORS with various options.
app.use(express.json()); //  recognize the incoming Request Object as a JSON Object.
app.use(express.static('./public'));

app.get('/:id', async (req, res) => {
  const { id: slug } = req.params;
  try {
    const urlObj = await urls.findOne({ slug });
    if (urlObj) {
      res.redirect(urlObj.url);
    }
    res.redirect(`/?error=${slug} not found`);
  } catch (error) {
    res.redirect('/?error=Link not found');
  }
});

app.get('/url/:id', (req, res) => {});

const scheme = yup.object().shape({
  slug: yup.string().trim().matches(/[\w-]/i),
  url: yup.string().trim().url().required(),
}); // Yup is a JavaScript schema builder for value parsing and validation

app.post('/url', async (req, res, next) => {
  let { slug, url } = req.body;
  try {
    await scheme.validate({
      slug,
      url,
    });

    if (!slug) {
      const id = getEmojis.getEmojis(5);
      console.log(id);
      slug = nanoid(5); // A tiny, secure, URL-friendly, unique string ID generator for JavaScript
    } else {
      const isExisting = await urls.findOne({ slug });
      if (isExisting) {
        throw new Error('Slug isn\'t unique!');
      }
    }
    slug = slug.toLowerCase();
    const secret = nanoid(10).toLowerCase();
    const newUrl = {
      url,
      slug,
      secret,
    };
    const created = await urls.insert(newUrl);
    res.json(created);
  } catch (error) {
    next(error);
  }
});
app.use((error, req, res, next) => {
  if (error.status) {
    res.status(error.status);
  } else {
    res.status(500);
  }
  res.json({
    message: error.message,
    stack: process.env.NODE_ENV === 'production' ? '☺' : error.stack,
  });
});

const { pid } = process;
const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`Server started. PID: ${pid}  PORT: ${port}`);
  console.log(`Listening at http://localhost:${port}`);
});
