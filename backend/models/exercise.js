var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
    username: {type: String, required: true},
    description: { type: String, required: true, minLength: 1},
    duration: {type: Number, required: true, min: 1},
    date: {type: Date, required: true},
}, {timestamps: true})

const Exercise = mongoose.model("Exercise", ExerciseSchema);

module.exports = Exercise;