const USer = require('../database/User.model')
const ApiError = require('../errors/Appierror')

const checkIsEmailDublicate = async(req, res, next)=>{
    try{
        const{ email = '' } = req.body

        if(!email){
            throw new Error('Email is required', 400)
        }

        const isUserPresent = await USer.findOne({ email: email.toLowerCase().trim() })

        if (isUserPresent){
            throw new ApiError('User with this email it`s ok')  
        }

        next()    
    }catch(e){
        next(e)
    }
}

const checkUser = async(req,res,next)=>{
    try{
        const {userIndex} = req.body
        const userIsPresent = await USer.findById(userIndex)
        if(!userIsPresent){
            next(new ApiError(`User with ${userIndex} is absent`, 409))
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
            next(new ApiError ('YOU ARE NOT AN ADULT'))
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
            next(new ApiError(`No gender ${gender}`))
            return
        }
        next()
    }catch(e){
        next(e)
    }
}

const checkIdUserPresent = async(req, res, next)=>{
    try{
        const { userIndex } = req.params

        const userById = await USer.findById(userIndex)

        if(!userById){
            next(new ApiError('User not found', 404))
            return
        }
        next
    }catch(e){
        next(e)
    }
}

module.exports = {
    checkIsEmailDublicate,
    checkUser,
    checkAge,
    checkGender,
    checkIdUserPresent
}