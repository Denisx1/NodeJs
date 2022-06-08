const { authService,emailService } = require('../services')
const  { OAuth, actionToken }  = require('../database/');
const { emailAction, actionTypesEnum } = require('../constants');
const { FRONTEND_URL, SYSTEM_MAIL } = require('../config/config')
const { USer } = require('../database');






module.exports = {
    login: async (req, res, next) => {
      try {
        const {user, body: { password } } = req;

        // await emailService.sendMail(SYSTEM_MAIL, emailAction.WELCOME) 

        await authService.comparePasswords(user.password, password);
        
        const tokenPair = authService.generateTokenPair({userId: user._id});
  
        await OAuth.create({user_id: user._id, ...tokenPair});
   
        res.json({
          ...tokenPair,
          user
        });
        
      } catch (e) {
        next(e);
      }
    },

    refresh: async (req, res, next) => {
      try {
        const {authUser} = req;
        const tokenPair = authService.generateTokenPair({userId: authUser._id});
  
        await OAuth.create({user_id: authUser._id, ...tokenPair});
  
        res.json({
          ...tokenPair,
          authUser
        });
      } catch (e) {
        next(e);
      }
    },

    logout: async (req, res, next) => {
      try {
        const authUser = req.authUser

        await OAuth.deleteMany({ user_id: req.authUser._id });
  
        res.json("ok");
      } catch (e) {
        next(e);
      }
    },

    forgotPassword: async (req, res, next) => {
      try {

        const { user: {_id, name} } = req
        const token = authService.generateActionToken({userId: user._id})
        
        await actionToken.create({
          token,
          user_id:_id,
          actionType: actionTypesEnum.FORGOT_PASSWORD
        })

        const forgotPasswordUrl = `${FRONTEND_URL}/password/forgot?token = ${token}`

        await emailService.sendMail(SYSTEM_MAIL, emailActionEnum.FORGOT_PASSWORD, {
          forgotPasswordUrl,
          userName:name
        })

        res.json('OK')

      } catch (e) {
        next(e);
      }
    },
   
    setPasswordAfterForgot: async (req, res, next) =>{
      try{
        
        const { user:{_id}, body } = req
        const newPassword = await authService.hashPassword(body.password)

        await USer.updateOne({_id:_id}, {
          password: newPassword
        })

        await OAuth.deleteMany({
          user_id: _id
        })

        await actionToken.deleteOne({
          token: body.token
        })

        res.json('ok')
        next()
      }catch(e){
        next(e)
      }
    },

    changePassword: async (req, res, next)=>{
      try{
        const { user: {_id} } = req

        const newPassword = await authService.hashPassword(body.password)

        await USer.updateOne({
          user_id: _id,
          passworg: newPassword
        })
      }catch(e){}
    }
}    