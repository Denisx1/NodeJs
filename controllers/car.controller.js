const Cars = require("../database/Cars.model")

module.exports = {
    getAllCars: async(req,res )  => {
        const cars = await Cars.find()
        res.json(cars)
    },

    createCars:async(req,res) => {
        try{
            const createCar =  await Cars.create(req.body)
            res.status(201).json(createCar)
        }catch(e){
            res.json(e)
        }
    },

    CarId:async(req , res)=>{
        const {carIndex} = req.params
        const car = await Cars.findById(carIndex)

        if(!car){
            res.status(404).json(`Car with (${carIndex}) id  not found`)
            return
        }

        res.json(createCar)
    },

    deleteCar:async(req, res)=>{
        const {carIndex} = req.params
        const car = await Cars.deleteOne(carIndex)

        if(!car){
            res.status(404).json(`Car with (${carIndex}) id  not found`)
            return
        }
        Cars.splice(carIndex, 1)
        res.json(car)
    },

    updateCar: async (req, res)=>{
        const {carIndex} = req.params
        const car = await Cars.updateOne(carIndex)
        Object.assign(Cars[carIndex], req.body)
        
        if(!car){
            res.status(404).json(`Car with (${carIndex}) id  not found`)
            return
        }
        res.json(car)
    }    
}
