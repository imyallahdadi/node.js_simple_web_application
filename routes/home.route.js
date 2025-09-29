const express = require('express')
const router = express.Router()
const user = require('../models/user.model')




router.get('/', async (req, res) => {
    const users = await user.findAll({})
    console.log(users)
    res.render('home', { users })
})


module.exports = router