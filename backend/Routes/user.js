const express = require('express')
const { userModel } = require('../Schema/userSchema')
const router = express.Router()

router.post('/login', async (req, res, next) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (!user) return res.status(400).send({ message: `User is not exist with ${req.body.email}` })
        if (user.password === req.body.password) {
            res.status(200).send({ success: true, user: user })
        } else {
            res.status(400).send({ message: "Invalid Password" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error" })
    }
})

router.post('/signup', async (req, res, next) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (user) return res.status(400).send({ message: `User with ${req.body.email} is already exist` })
        const newUser = await userModel.create(req.body)
        res.status(201).send({ success: true, User: newUser })
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Internal Server Error" })
    }
})

module.exports = router