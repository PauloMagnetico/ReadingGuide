const mongoose = require('mongoose');
const { aviGrades, feedbackStatus } = require('./enums'); 
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    calculatedAviGrade: {
        type: String,
        enum: aviGrades,
        required: true
    },
    feedbackAviGrade: {
        type: String,
        enum: aviGrades,
        required: true
    },
    status: {
        type: String,
        enum: feedbackStatus,
        required: true
    }
});

module.exports = mongoose.model("Feedback", feedbackSchema);
