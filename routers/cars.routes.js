const {Router} = require('express')

const carsController = require('../controllers/car.controller')
const carsMiddlewares = require('../midllewares/cars.middlewares')


const carsRouter = Router()

carsRouter.get('', carsController.getAllCars)

carsRouter.post('',carsMiddlewares.carIsOnTheList, carsMiddlewares.checkAgeThisCar, carsMiddlewares.checkDublickateNumber, carsController.createCars)

carsRouter.get('/:carIndex',carsController.CarId)

carsRouter.get('/:carIndex',carsController.updateCar)

carsRouter.get('/:carIndex',carsController.deleteCar)


module.exports = carsRouter