var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true, trim: true, minlength: 3},
    password: {type: String, required: true},
    email: {type: String, required: true, unique: true}
    }, 
    { timestamps: true });

const User = mongoose.model("User", UserSchema);

module.exports = User;