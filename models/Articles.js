const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ArticleSchema = new Schema({
    title: { 
        type:String,
        unique:true, 
        required:true
    },
    pubDate: Date, 
    url: {
        type:String, 
        unique:true, 
        required:true
    },
    img: String,
    blurb: String, 
    category: String
})

module.exports = mongoose.model('Article', ArticleSchema);