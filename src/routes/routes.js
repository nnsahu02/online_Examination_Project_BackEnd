const express = require('express')
const router = express.Router();

const { createStudent, login } = require('../controller/studentController')
const { adminLogin, createQuestion } = require('../controller/adminController')

router.post('/student', createStudent)

router.post('/student/login', login)

router.post('/admin/login', adminLogin)

router.post('/admin/question', createQuestion)



module.exports = router