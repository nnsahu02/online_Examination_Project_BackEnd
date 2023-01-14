const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const studentModel = require('../model/studentModel')
const questionModel = require('../model/questionModel')
const { uploadFile } = require('./awsController')


//adminLogin
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        if (!email) return res.status(400).send({ status: false, message: 'email is required' })
        //if (!isValidEmail(email)) return res.status(400).send({ status: false, message: "Please enter the valid email" })

        if (!password) return res.status(400).send({ status: false, message: 'password is required' })

        const adminData = await studentModel.findOne({ email: email })
        if (!adminData) return res.status(404).send({ status: false, message: "This email is not Registered." })

        if (adminData.role != 'admin') {
            return res.status(400).send({ status: false, message: "This page is only accessed by Admin." })
        }

        let checkPassword = await bcrypt.compare(password, adminData.password)
        if (!checkPassword) {
            return res.status(401).send({ status: false, message: "Incorrect Password." })
        }

        const adminId = adminData._id
        const token = jwt.sign({ adminId: adminId.toString() }, "strongpassword", { expiresIn: "24h" })

        const data = {
            adminId: adminId,
            token: token
        }

        return res.status(200).send({ status: true, message: "Admin loggedin successfully.", data: data })
    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


//createQuestion
const createQuestion = async (req, res) => {
    try {
        const bodyData = req.body
        const image = req.files

        if (Object.keys(bodyData).length == 0) {
            return res.status(400).send({ status: false, message: "request body can not be empty" })
        }
        const { Question, CorrectAnswer, Subject, Level } = bodyData

        if (!Question) {
            return res.status(400).send({ status: false, message: "Question is required." })
        }
        if (image && image.length > 0) {
            let uploadImage = await uploadFile(image[0]);
            bodyData.Attachment = uploadImage;
        } else {
            return res.status(400).send({ status: false, message: "Upload Question Image" });
        }
        if (!CorrectAnswer) {
            return res.status(400).send({ status: false, message: "CorrectAnswer is required." })
        }
        if (!Subject) {
            return res.status(400).send({ status: false, message: "Subject is required." })
        }
        if (!Level) {
            return res.status(400).send({ status: false, message: "Level is required." })
        }

        const data = await questionModel.create(bodyData)
        return res.status(201).send({ status: true, message: "Question created successfully", data: data })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}


module.exports = { adminLogin, createQuestion }