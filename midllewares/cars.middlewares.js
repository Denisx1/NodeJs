const CArs = require('../database/Cars.model')

const checkDublickateNumber = async(req,res,next)=>{

    try{
        const {number =  ''} = req.body

        if(!number){
            throw(new Error(`Number ${number} is absent`, 409))
            return
        }

        const carPresent = await CArs.findOne({number: number.toLowerCase().trim()})

        if(carPresent){
            throw(new Error(`Number is absent`, 409))
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
            next(new Error(`Car with ${carIndex} is absent`),404)
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
        if(age<=1970){
            next(new Error(`You car is old and non-repairable because it old`))
        }
        next()
    }catch(e){
        next(e)
    }
}

module.exports = {
    checkDublickateNumber,
    carIsOnTheList,
    checkAgeThisCar,

}