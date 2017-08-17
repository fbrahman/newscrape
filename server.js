// Dependencies
// =============================================================
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const request = require('request');
const cheerio = require('cheerio');
const mongoose = require('mongoose');

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
// =============================================================
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// Set Handlebars as the default templating engine.
// =============================================================
let hbs = exphbs.create({
    defaultLayout: 'main',
})
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Static directory
// =============================================================
app.use(express.static('public'));

// Routes
// =============================================================
let htmlRoute = require('./routes/html-route.js');

app.use('/', htmlRoute);

// Requiring our models for syncing
// =============================================================
const article = require('./models/Articles');
let newsdb = 'mongodb://localhost/newsdb';
let scraper = require('./db/articleScaper');

mongoose.connect(newsdb, {
    useMongoClient:true
});

scraper.articleScraper().then((articles)=>{
    article.create(articles).then((err, results)=>{
        if (err){console.log(err)}
        console.log(results);
    })
});

// Starting our Express app
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});
