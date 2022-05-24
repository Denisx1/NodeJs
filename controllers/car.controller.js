const cars = require("../database/cars")

module.exports = {
    getAllCars: (req,res )  => {
        res.json(cars)
    },

    createCars:(req,res) => {
        console.log(req.body)
        cars.push(req.body)
        res.json(cars)
    },

    CarId:(req , res)=>{
        const {carIndex} = req.params
        const car = cars[carIndex]

        if(!car){
            res.status(404).json(`Car with (${carIndex}) id  not found`)
            return
        }

        res.json(car)
    },

    deleteCar:(req, res)=>{
        const {carIndex} = req.params
        const car = cars[carIndex]

        if(!car){
            res.status(404).json(`Car with (${carIndex}) id  not found`)
            return
        }
        cars.splice(carIndex, 1)
        res.json(car)
    },

    updateCar:(req, res)=>{
        const {carIndex} = req.params
        const car = cars[carIndex]
        Object.assign(cars[carIndex], req.body)
        
        if(!car){
            res.status(404).json(`Car with (${carIndex}) id  not found`)
            return
        }
        res.json(car)
    }    
}
