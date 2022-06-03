const { ApiError } = require('../errors')
const { authService } = require('../services')
const { authValidator } = require('../validators')
const { actionToken, OAuth } = require('../database')
const { tokenTypeEnum } = require('../constants')




async function checkAccessToken(req, res, next) {
  try {
    const acces_token = req.get("Authorization");

    

    if (!acces_token) {
      next(new ApiError('no access token', 404));
      return;
    }

    authService.validateToken(acces_token);

    const tokenData = await OAuth.findOne({ acces_token }).populate("user_id");

    if (!tokenData || !tokenData.user_id) {
      next(new ApiError('You are not registered', 401));
      return;
    }

    req.authUser = tokenData.user_id;

    next();
  } catch (e) {
    next(e);
  }
}

  function checkRefreshToken(req, res, next) {
    try {
      const token = req.get(" ");
  
      authService.validateToken(token, "refresh");
  
      next();
    } catch (e) {
      next(e);
    }
  }
  
function checkActionToken(actionType) {
  return async function (req, res, next) {
    try {
      const { token } = req.body
      
      authService.validateToken(token, actionType)

      const tokenData = await actionToken.findOne({
        token,
        actionType
      })
      .populate("user_id");
      

      if (!tokenData || !tokenData.user_id) {
        return next(
          new ApiError('Token not valod', 401)
        );
      }

      req.user = tokenData.user_id;

      next();
    } catch (e) {
      next(e);
    }
  };
}

function isLoginDataVAlid(req, res, next){
    try{
        const { value, error } = authValidator.loginSchema.validate(req.body)

        if(error){
            next(new ApiError('111'))
            return
        }
        req.body = value 
       
        next()
    }catch(e){
        next(e)
    }
}

const validPassword = async (req, res, next)=>{
  try{
    const { user, body: { password } } = req
    const { error } = authValidator.changePasswordJoiSchema.validate(req.body)

    if(error){
      next(new ApiError('111'))
        return
    }

    await authService.comparePasswords(user.password, password)
    
    next()
  }catch(e){
    next(e)
  }
}

const validEmail = (req, res, next)=>{
  try{
    const { error, value } = authValidator.emailJoiSchema.validate(req.body)

    if (error){
      next(new ApiError('email is not valid'))
        return
    }
    req.body = value

    next()
  }catch(e){
    next(e)
  }
}
 
module.exports = {
    checkAccessToken,
    checkRefreshToken,
    isLoginDataVAlid,
    checkActionToken,
    validPassword,
    validEmail
}