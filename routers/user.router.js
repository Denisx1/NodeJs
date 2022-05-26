const {Router} = require('express')

const userController = require('../controllers/user.controller')
const userMidllewares = require('../midllewares/user.middleware')


const userRouter = Router()

userRouter.get('', userController.getAllUsers)

userRouter.post('',userMidllewares.checkGender, userMidllewares.checkAge, userMidllewares.checkIsEmailDublicate, userController.createUser)

userRouter.get('/:userIndex',userMidllewares.checkUser,userController.userId)

userRouter.get('/:userIndex',userController.deleteUser)

userRouter.get('/:userIndex',userController.updateUser)


module.exports = userRouter