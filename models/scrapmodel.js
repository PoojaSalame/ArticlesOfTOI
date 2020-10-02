const mongoose = require('mongoose');
const conn = require('../dbUtils/connection');
var Schema = mongoose.Schema;

var linkSchema = new mongoose.Schema({
    links : {type:Array}
});

var slinks = mongoose.model('validlinks', linkSchema);
module.exports = slinks;

console.log("Schema created !");