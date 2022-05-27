const {Router} = require('express')

const carsController = require('../controllers/car.controller')
const carsMiddlewares = require('../midllewares/cars.middlewares')


const carsRouter = Router()

carsRouter.get('', carsController.getAllCars)
carsRouter.post('',carsMiddlewares.carIsOnTheList, carsMiddlewares.checkAgeThisCar, carsMiddlewares.checkDublickateNumber, carsController.createCar)

carsRouter.get('/:carIndex',carsController.carId)
carsRouter.delete('/:carIndex',carsController.deleteCar)
carsRouter.put('/:carIndex',carsController.updateCar)



module.exports = carsRouter