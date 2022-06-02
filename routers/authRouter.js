const {Router} = require('express')

const {authcont} = require('../controllers')
const { authMiddleware, userMiddleware } = require('../midllewares')

const authRouter = Router()

authRouter.post(
    '/login',
    authMiddleware.isLoginDataVAlid,
    userMiddleware.getUserDynamycally('email'),
    authcont.login)

authRouter.post(
    '/refresh',
    authMiddleware.checkRefreshToken,
    authcont.refresh);   

authRouter.post(
    "/logout",
    authMiddleware.checkAccessToken,
    authcont.logout);  

module.exports = authRouter