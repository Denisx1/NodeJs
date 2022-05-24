const {Router} = require('express')

const userController = require('../controllers/user.controller')


const userRouter = Router()

userRouter.get('', userController.getAllUsers)

userRouter.post('',userController.createUser)

userRouter.get('/:userIndex',userController.userId)

userRouter.get('/:userIndex',userController.deleteUser)

userRouter.get('/:userIndex',userController.updateUser)


module.exports = userRouter