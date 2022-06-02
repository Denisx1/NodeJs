const { authService,emailService } = require('../services')
const  OAuth  = require('../database/OAuthModel');
const { emailAction } = require('../constants');

module.exports = {
    login: async (req, res, next) => {
      try {
        const {user, body: {password}} = req;

        await emailService.sendMail('automatix33@gmail.com', emailAction.WELCOME) 

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
}    