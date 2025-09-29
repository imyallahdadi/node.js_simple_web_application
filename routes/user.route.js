const express = require('express')
const router = express.Router()
const user = require('../models/user.model')
const jwt = require('jsonwebtoken')
//const { where } = require('sequelize')


router.get('/profile', async (req, res) => {

    const { token } = req.cookies
    const secret = 'your_secret_key'

    if(token){
        try{
            const decoded = jwt.verify(token,secret)
            const User = await user.findOne({
                where:{
                    id: decoded.id,
                    email: decoded.email
                }
            })
            if(User){
                res.render('profile', {user: User})
            }else {
                res.redirect('/auth/login?q=user not found :(')
            }
            
        }catch (error) {
            res.redirect('/auth/login?q=invalid or expired token :(')
            console.log(error)
        }
    }else{
        res.redirect('/auth/login?q=invalid token :(')
    }
    
})




module.exports = router