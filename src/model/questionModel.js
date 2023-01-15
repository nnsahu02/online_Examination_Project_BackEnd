const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    Question: {
        type: String,
        required: true,
        trim: true
    },
    Options: {
        type: [String],
        default: ['a', 'b', 'c', 'd']
    },
    Attachment: {
        type: String,
        require: true,
        trim: true
    },
    CorrectAnswer: {
        type: String,
        enum: ['a', 'b', 'c', 'd'],
        required: true
    },
    Subject: {
        type: String,
        enum: ['Physics', 'chemstry', 'Math', 'IT'],
        required: true
    },
    Level: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
}, { timestamps: true })

module.exports = mongoose.model("Question", questionSchema)