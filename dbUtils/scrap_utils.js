const mongoose = require('mongoose');
const smodel = require('../models/scrapmodel');

const collection = {};

//*****************ADD LINKS ******************/
collection.addLinks = function(data){
    console.log(" data :",data);
    return smodel.create({'links' : data});
}

//****************GET ALL LINKS*********************/
collection.getAll = function(){
    console.log("Get all links : ");
    return new Promise((resolve, reject) =>{
        smodel.find({}).exec((err, result) =>{
            if(err){
                return reject(err);
            }
            console.log("result : ", result);
            resolve(result);
        })
    })
}

module.exports = collection;