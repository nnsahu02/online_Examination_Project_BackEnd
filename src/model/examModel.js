const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const examSchema = new mongoose.Schema({
    questions: {
        type: [{
            question: {
                type: ObjectId,
                ref: 'Question'
            },
            answer: {
                type: String
            }
        }],
        required: true
    },
    student: {
        type: ObjectId,
        ref: 'Student',
        required: true
    },
    result: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model("Exam", examSchema)
