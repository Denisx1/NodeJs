const { Router } = require('express')
const { actionTypesEnum } = require('../constants')

const { authcont } = require('../controllers')
const { authMiddleware, userMiddleware } = require('../midllewares')

const authRouter = Router()

authRouter.post(
    '/login',
    authMiddleware.isLoginDataVAlid,
    userMiddleware.getUserDynamycally('email'),
    authcont.login
)

authRouter.post(
    '/refresh',
    authMiddleware.checkRefreshToken,
    authcont.refresh
);   

authRouter.post(
    "/logout",
    authMiddleware.checkAccessToken,
    authcont.logout
);  

authRouter.post(
    '/password/forgot',
    authMiddleware.validEmail,
    userMiddleware.getUserDynamycally('email'),
    authcont.forgotPassword
) 
    
authRouter.patch(
    '/password/forgot',
    authMiddleware.checkActionToken(actionTypesEnum.FORGOT_PASSWORD, forgotPasswordJoiSchema),
    authcont.setPasswordAfterForgot
)

authRouter.patch(
    './password/change',
    authMiddleware.checkAccessToken,
    userMiddleware.getUserDynamycally('_id', 'authUser'),
    authMiddleware.validPassword,
    authcont.changePassword   
)


module.exports = authRouter