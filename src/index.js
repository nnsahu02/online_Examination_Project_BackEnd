const express = require("express")
const mongoose = require('mongoose')
const multer = require('multer')
const router = require('./routes/routes')

const app = express();

app.use(express.json());
app.use(multer().any())

mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://nnsahu2022:Sahurk012@mycluster.ne522qz.mongodb.net/onlineExamProject", {
    useNewUrlParser: true
})
    .then(() => console.log("mongoDB is connected."))
    .catch(err => console.log(err))

app.use('/', router)

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`Express app is running on PORT ${PORT}`)
})