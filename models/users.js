const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {type:String, required: true, unique:true},
    name: String,
    image: String,
    password: String
},{versionKey:false,timestamps:true});
UserSchema.set('collection','users');
// UserSchema.method.toJSON = () =>{
//     const userdata = this.toObject();
//     delete userdata.password;
//     return userdata;
// }
module.exports = mongoose.model('Users',UserSchema);
