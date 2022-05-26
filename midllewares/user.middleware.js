const USer = require('../database/User.model')

const checkIsEmailDublicate = async(req, res, next)=>{
    try{
        const{ email = '' } = req.body

        if(!email){
            throw new Error('Email is required', 400)
        }

        const isUserPresent = await USer.findOne({ email: email.toLowerCase().trim() })

        if (isUserPresent){
            throw new Error('User with this email already present', 409)  
        }

        next()    
    }catch(e){
        next(e)
    }
}

const checkUser = async(req,res,next)=>{
    try{
        const {userIndex} = req.params
        const userIsPresent = await USer.findById(userIndex)
        if(!userIsPresent){
            next(new Error(`User with ${userIndex} is absent`))
            return
        }
        next()
    }catch(e){
        next(e)
    }
}

const checkAge = async(req, res, next)=>{
    try{
        const {age} = req.body
        if(age<18){
            next(new Error('YOU ARE NOT AN ADULT'))
            return
        }
        next()
    }catch(e){
        next(e)
    }
}

const checkGender = async (req, res, next)=>{
    try{
        const { gender = 'another'} = req.body
        const Genders = ['famale', 'male', 'another']

        if(!Genders.includes(gender)){
            res.status(404).json({
                message: `No gender ${gender}`
            })
            return
        }
        next()
    }catch(e){
        res.status(400).json({
            message: e.message
        })
    }
}

module.exports = {
    checkIsEmailDublicate,
    checkUser,
    checkAge,
    checkGender
}