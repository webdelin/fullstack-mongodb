const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email})

    if(candidate){
        //Password validate
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if(passwordResult){
            // token generate
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60 * 60})

            res.status(200).json({
                token: `Bearer ${token}`
            })

        } else {
            res.status(401).json({
                // Pass no correct
                message: 'Password not correct'
            })
        }
    } else {
        res.status(404).json({
            // Email not found
            message: 'User not found'
        })
    }
}

module.exports.register = async function (req, res) {
    // email password
    const candidate = await User.findOne({email: req.body.email})

    if(candidate){
        //User exist?
        res.status(409).json({
            message: 'User Email Exist'
        })
    } else {
        //Create User
        const salt = bcrypt.genSaltSync(12)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })

        try {
            await user.save()
            res.status(201).json(user)
        } catch(e) {
            // Error validate
            errorHandler(res, e)
        }
    }
}
