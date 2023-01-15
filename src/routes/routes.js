const express = require('express')
const router = express.Router();

const { createStudent, login } = require('../controller/studentController')
const { adminLogin, createQuestion, getQuestions, updateQuestion, deleteQuestion } = require('../controller/adminController')
const { startExam, submitExam } = require('../controller/examManagement')

router.post('/student', createStudent)

router.post('/student/login', login)

router.post('/admin/login', adminLogin)

router.post('/admin/question', createQuestion)

router.get('/admin/questions', getQuestions)

router.put('/admin/:questionId/update/question', updateQuestion)

router.delete('/admin/:questionId/update/question', deleteQuestion)

router.get('/:studentId/startExam', startExam)

router.post('/submitExam', submitExam)


module.exports = router