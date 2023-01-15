const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const examSchema = new mongoose.Schema({
    student: {
        type: ObjectId,
        ref: 'Student',
        required: true
    },
    questions: {
        type: [],
        required: true
    },
    CorrectAnswer: {
        type: [],
        required: true
    },
    studentAnswer: {
        type: [],
        default: []
    },
    examCount: {
        type: Number,
        default: 0
    },
    result: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Exam", examSchema)
