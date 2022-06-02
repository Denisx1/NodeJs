const User = require("../database/User.model")
const ApiError = require('../errors/Appierror')
const { authService } = require('../services')


module.exports = {
    getAllUsers: async(req,res, next)  => {
        try{
            const {limit = 20, page = 1} = req.query
            const skip = (page-1)*limit

            const users =  await User.find().limit(limit).skip(skip);
            const count = await User.count({})
            
            res.json({
                page,
                parPage: limit,
                data: users,
                count
            })
        }catch(e){
            next(e)
        }
    },

    createUser: async (req,res, next) => {
        try{
            const hashPassword = await authService.hashPassword(req.body.password)

            const createdUser = await User.create({...req.body, password: hashPassword})
    
            res.json(createdUser)
        }catch(e){
            next(e)
        }
    },

    userId: async (req , res, next)=>{
        try{
            const {userIndex} = req.params
            const user = await User.findById(userIndex)

        if(!user){
            next(new ApiError(`User with (${userIndex}) id  not found`, 404))
            return
        }

        res.json(user)
    }catch(e){
        next(e)
    }
},

    deleteUser: async (req, res, next)=>{
        try{
            const {userIndex} = req.params
            const userDelete = await User.deleteOne({_id: userIndex})
            res.json(userDelete)
        }catch(e){
            next(e)
        }
    },

    updateUser:async(req, res, next)=>{
        try{
            const {userIndex} = req.params
            const userUpdate = await User.updateOne(
            { _id: userIndex },
            { $set: req.body })

            res.json(userUpdate)
        }catch(e){
            next(e)
        }
    }    
}