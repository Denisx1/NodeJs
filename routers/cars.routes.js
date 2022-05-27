const {Router} = require('express')

const {carsController} = require('../controllers')
const {carsMiddleware} = require('../midllewares')


const carsRouter = Router()

carsRouter.get('/',carsMiddleware.newCarValidator, carsController.getAllCars)
carsRouter.post('/',carsMiddleware.newCarValidator, carsMiddleware.checkAgeThisCar, carsMiddleware.checkDublickateNumber, carsController.createCar)
carsRouter.put('/:carIndex',carsMiddleware.carIsOnTheList, carsController.updateCar)

carsRouter.get('/:carIndex',carsController.carId)
carsRouter.delete('/:carIndex',carsController.deleteCar)



module.exports = carsRouter