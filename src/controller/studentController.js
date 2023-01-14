const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const studentModel = require('../model/studentModel')


//create Student 
const createStudent = async (req, res) => {
    try {
        const bodyData = req.body
        if (Object.keys(bodyData).length == 0) {
            return res.status(400).send({ status: false, message: "request body can not be empty" })
        }
        const { name, email, password } = bodyData

        if (!name) {
            return res.status(400).send({ status: false, message: "name is required." })
        }
        if (!email) {
            return res.status(400).send({ status: false, message: "email is required." })
        }
        if (!password) {
            return res.status(400).send({ status: false, message: "password is required." })
        }
        bodyData.password = await bcrypt.hash(password, 10)

        let emailCheck = await studentModel.findOne({ email })
        if (emailCheck) {
            return res.status(400).send({ status: false, message: "This email is already registered." })
        }

        const createStudent = await studentModel.create(bodyData)
        const data = {
            _id: createStudent._id,
            name: createStudent.name,
            email: createStudent.email,
            password: createStudent.password
        }
        if (createStudent.role == 'admin') {
            return res.status(201).send({ status: true, message: "Admin successfully created", data: data })
        } else
            return res.status(201).send({ status: true, message: "student successfully created", data: data })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


//login Student
const login = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email) return res.status(400).send({ status: false, message: 'email is required' })
        //if (!isValidEmail(email)) return res.status(400).send({ status: false, message: "Please enter the valid email" })

        if (!password) return res.status(400).send({ status: false, message: 'password is required' })

        const studentData = await studentModel.findOne({ email: email })
        if (!studentData) return res.status(404).send({ status: false, message: "This email is not Registered." })

        let checkPassword = await bcrypt.compare(password, studentData.password)
        if (!checkPassword) {
            return res.status(401).send({ status: false, message: "Incorrect Password." })
        }

        const studentId = studentData._id
        const token = jwt.sign({ studentId: studentId.toString() }, "strongpassword", { expiresIn: "24h" })

        const data = {
            studentId: studentId,
            token: token
        }

        return res.status(200).send({ status: true, message: "student loggedin successfully.", data: data })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createStudent, login }