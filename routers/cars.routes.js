const {Router} = require('express')

const carsController = require('../controllers/car.controller')


const carsRouter = Router()

carsRouter.get('', carsController.getAllCars)

carsRouter.post('',carsController.createCars)

carsRouter.get('/:carIndex',carsController.CarId)

carsRouter.get('/:carIndex',carsController.updateCar)

carsRouter.get('/:carIndex',carsController.deleteCar)


module.exports = carsRouter