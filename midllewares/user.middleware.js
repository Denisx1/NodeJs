const { USer } = require('../database')
const { ApiError } = require('../errors')
const { userValidator,userUpdateVAlidators,queryValidators } = require('../validators')


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

const newUserValidator = (req, res, next)=>{
    try{
        const { error, value } = userValidator.newUserJoiSchema.validate(req.body)
        if(error){
            next( new ApiError(error.details[0].message, 400))
            return
        }

        req.body = value

        next()
    }catch(e){
        next(e)
    }
}    

const updateUserValidation = (req, res, next) =>{
    try{
        const { error, value} = userUpdateVAlidators.UpdateSheme.validate(req.body)
        
        if (error){
            next(new ApiError(error.details[0],400))
            return
        }
        req.body = Object.assign(req.body, value)

        next()
    }catch(e){
        next(e)
    }
}

const validateUserQuery = (req, res, next) =>{
    try{
        const { error } = queryValidators.querySchemaValidator.validate(req.query)

        if(error) {
            next(new ApiError(error.details[0],400))
            return
        }
        next()
    }catch(e){
        next(e)
    }
}

// сильно
const  getUserDynamycally = (
    paramName = "_id",
    where = "body",
    dataBaseField = paramName
  ) => {
    return async (req, res, next) => {
      try {
        const findObject = req[where];
  
        if (!findObject || typeof findObject !== "object") {
          next(new ApiError('000'));
          return;
        }
  
        const param = findObject[paramName];

        const userx = await USer.findOne({[dataBaseField]: param}).select('password')
  
        if (!userx) {
          next(new ApiError('not registered'));
          return;
        }
  
        req.user = userx;
        next();
      } catch (e) {
        next(e);
      }
    };
  };

module.exports = {
    getUserDynamycally,
    checkIsEmailDublicate,
    checkUser,
    checkAge,
    checkGender,
    checkIdUserPresent,
    newUserValidator,
    updateUserValidation,
    validateUserQuery,
}