const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Types;
const Posts = new Schema({
    title: String,
    description: String,
    author: {type: ObjectId, ref:'Users'},
},{versionKey:false, timestamps:true});
module.exports = mongoose.model('Posts',Posts);
