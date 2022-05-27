const {CArs} = require('../database')
const {AppiError} = require('../errors')
const { CURRENT_YEAR } = require('../constants')
const { carValidator, carUpdateValidator} = require('../validators')

const checkDublickateNumber = async(req,res,next)=>{

    try{
        const { number =  '' } = req.body

        if(!number){
            throw(new AppiError(`Number is required`, 400))
        }
        next()
    }catch(e){
        next(e)
    }
}

const carIsOnTheList = async (req, res, next)=>{
    try{ 
        const {carIndex} = req.params
        const presentCar = await CArs.findById(carIndex)

        if(presentCar){
            next(new AppiError(`Car with ${carIndex} is absent`),404)
            return
        }
        next()
    }catch(e){
        next(e)
    }
}

const checkAgeThisCar = async (req,res,next)=>{
    try{
        const {age} = req.body
        if(age<=(CURRENT_YEAR-50) || age>CURRENT_YEAR){
            next(new AppiError(`You car is old and non-repairable because it old`))
        }
        next()
    }catch(e){
        next(e)
    }
}

const newCarValidator = (req, res, next)=>{
    try{
        const {error, value} = carValidator.userCarSubSchema.validate(req.body)

        if(error){
            next(new AppiError(error.details[0].message, 400))
            return
        }
        req.body = value

        next()
    }catch(e){
        next(e)
    }
}

const updateCar = (req, res, next)=>{
    try{
        const {error, value} = carUpdateValidator.carUpdateShemeValidator.validate(req.body)

        if(error) {
            next(new AppiError(error.details[0].message, 400))
            return
        }
        req.body = Object.assign(req.body, value)
        next()
    }catch(e){
        next(e)
    }
}


module.exports = {
    checkDublickateNumber,
    carIsOnTheList,
    checkAgeThisCar,
    newCarValidator,
    updateCar
}