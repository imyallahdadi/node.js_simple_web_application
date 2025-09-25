const express = require('express')
const router = express.Router()
const user = require('../models/user.model')
const jwt = require('jsonwebtoken')
const { where } = require('sequelize')


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
                res.render('login',{"errorMessage": "User not found :( "})
            }
            
        }catch (error) {
            res.render('login', {"errorMessage": "invalid or expired token :( "})
            console.log(error)
        }
    }else{
        res.render('login', {"errorMessage": "invalid token :( "})
    }
    
})




module.exports = router