const express = require("express")
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express();
const cors = require('cors')
dotenv.config({ path: './config.env' })
app.use(cors())
app.use(express.json())
const UserRouter = require('./Routes/user')


const DB = process.env.DATA_BASE
console.log(DB)
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('connection successful')
}).catch((err) => console.log("connection failed"))

app.use('/', UserRouter)



app.listen(8000, () => {
    console.log("app is listing at port 8000")
})