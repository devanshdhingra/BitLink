const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    url: String,
    shorten: String
});

const url = mongoose.model('url', urlSchema);
module.exports = url;