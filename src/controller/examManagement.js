const examModel = require('../model/examModel')
const studentModel = require('../model/studentModel')
const questionModel = require('../model/questionModel')

//Start Exam
const startExam = async (req, res) => {
    try {
        const studentId = req.params.studentId
        const studentData = await studentModel.findById({ _id: studentId, isDeleted: false })
        if (!studentData) {
            return res.status(404).send({ status: false, message: "No student found." })
        }

        const questions = await questionModel.aggregate([{ $sample: { size: 10 } }])
        //console.log(questions)
        let newArr = []
        let CorrectAnswer = []
        for (let i = 0; i < questions.length; i++) {
            let data = {
                questionId: questions[i]._id,
                question: questions[i].Question,
            }
            newArr.push(data)
            let ansData = {
                question: questions[i].Question,
                answer: questions[i].CorrectAnswer,
                questionId: questions[i]._id,
            }

            CorrectAnswer.push(ansData)
        }
        const data = {
            questions: newArr,
            student: studentData._id,
            CorrectAnswer: CorrectAnswer
        }
        const createExam = await examModel.create(data)
        const qn = {
            Questions: createExam.questions
        }
        return res.status(200).send({ data: qn })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


//submitExam 
const submitExam = async (req, res) => {
    try {
        const studentId = req.params.studentId
        const examId = req.params.examId

        const bodyData = req.body
        console.log(bodyData)

        let result = 0;
        bodyData.forEach(async answer => {
            const question = await questionModel.findById(answer.questionId);
            if (question.CorrectAnswer === answer.answer) {
                result++;
            }
        });

        console.log(result)


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { startExam, submitExam }