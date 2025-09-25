const express = require('express')
const router = express.Router()
const user = require('../models/user.model')
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')

router.get('/login', async (req,res) => {
    res.render('login')
})
router.post('/login',async (req, res) => {
  const secret = 'your_secret_key'
  const {email, password} = req.body

  const User = await user.findOne({
    where:{
      email: email
    }
  })
  
  if(User){
    if(User.password == password){
      const payload = {
        "id": User.id,
        "email": User.email
      }
      const token = jwt.sign(payload, secret, { expiresIn: "5h" });
      res.cookie('token', token, {
        maxAge: 5 * 60 * 60 * 1000,
        path: "/"

      })
      res.redirect('/user/profile')

    } else{
      res.render('login', {"errorMessage": "Invalid password"})
    }
  } else{
    res.render('login', {"errorMessage": "User not found :( "})
  }
})

router.get('/register',async (req, res) => {
  res.render('register')
})

router.post('/register',async (req, res) => {
  const {username, email, firstName, lastName, password} = req.body

  const User = await user.findOne({
    where:{
      [Op.or]: [
        {email: email},
        {username: username}
      ]
    }
  })
  if(User){
    res.render('register',{"errorMessage":"User already exists :( "})
  }else{
    const User = await user.create({ firstName: firstName, lastName: lastName, email: email, password: password, username: username });
    res.render('login',{"errorMessage": "User registred successfully"})
  }
})


module.exports = router


