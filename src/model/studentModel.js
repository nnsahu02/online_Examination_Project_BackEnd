const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'student'
    },
    exams: {
        type: [ObjectId],
        ref: 'Exam'
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema)

