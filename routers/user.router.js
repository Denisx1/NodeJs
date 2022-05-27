const {Router} = require('express')

const userController = require('../controllers/user.controller')
const userMidllewares = require('../midllewares/user.middleware')


const userRouter = Router()

userRouter.get('/', userController.getAllUsers)
userRouter.post('/',userMidllewares.checkGender, userMidllewares.checkAge, userMidllewares.checkIsEmailDublicate, userController.createUser)

userRouter.get('/:userIndex',userController.userId)
userRouter.delete('/:userIndex',userController.deleteUser)
userRouter.put('/:userIndex',userController.updateUser)
userRouter.all('/:userIndex',userMidllewares.checkIdUserPresent)




module.exports = userRouter