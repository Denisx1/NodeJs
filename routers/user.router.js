const {Router} = require('express')

const {userController} = require('../controllers')
const { userMiddleware } = require('../midllewares')


const userRouter = Router()

userRouter.get('/', userController.getAllUsers)
userRouter.get('/:userIndex',userController.userId)
userRouter.put('/:userIndex',userController.updateUser)

userRouter.post('/',userMiddleware.newUserValidator, userMiddleware.checkGender, userMiddleware.checkAge, userMiddleware.checkIsEmailDublicate, userController.createUser)

userRouter.delete('/:userIndex',userController.deleteUser)
userRouter.use('/:userIndex',userMiddleware.getUserDynamycally('userIndex', 'params', '_id'))
userRouter.post('/:userIndex/photos',userMiddleware.checkUserAvatar, userController.uploadUserPhoto)




module.exports = userRouter