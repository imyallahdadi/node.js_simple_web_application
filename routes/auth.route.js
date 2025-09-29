const express = require('express')
const router = express.Router()
const user = require('../models/user.model')
const resetpassword = require('../models/resetpassword.model')
const { Op } = require('sequelize')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');


function generateresettoken(){
  return new Promise((resolve, reject) => {
    crypto.randomBytes(32, (err, buffer) => {
      if (err){
        reject(err)
      }else{
        const token = buffer.toString('hex')
        resolve(token);
      }
    })
  })
}

router.get('/login', async (req,res) => {
  q = req.query.q
  if(req.cookies.token){
    res.redirect('/user/profile')
  }else{
    res.render('login', {"message": q})
  }
    
})
router.post('/login', async (req, res) => {
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

router.get('/register', async (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
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
    res.redirect('/auth/login?q=User registred successfully')
  }
})

router.get('/forget-password', async (req, res) => {
  q = req.query.q
  res.render('forget_password',{"message": q})
})

router.get('/forget-password/:token', async (req, res) => {
  res.render('reset_password', { token: req.params.token })
})


router.post('/forget-password', async (req, res) => {
  const { email } = req.body
  const User = await user.findOne({
    where:{
      email: email
    }
  })
  if(User){
    const token = await generateresettoken();
    
    await resetpassword.create({email: User.email, token: token})

    console.log(token)
    res.send({"message": "ok"})
        
  }else{
    res.redirect('/auth/forget-password?q=Email is not valid :(')
  }

})


router.post('/forget-password/:token', async (req, res) => {
  const { token } = req.params
  const { password } = req.body
  const reset_password = await resetpassword.findOne({
    where:{
      token: token
    }
  })
  if(reset_password){    
    const User = await user.findOne({
      where:{
        email: reset_password.email
      }
    })

    if(User){
      User.password = password
      await User.save()
      reset_password.destroy()

      res.redirect(`/auth/login/?q=password ${User.email} has changed successfully`)

    }else{
      res.redirect('/auth/forget-password?q=Email is not valid :(')
    }

 
  }else{
    res.redirect('/auth/forget-password?q=Token is not valid :(')
  }

})


module.exports = router


