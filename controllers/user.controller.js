const User = require("../database/User.model")

module.exports = {
    getAllUsers: async(req,res )  => {
        const users =  await User.find();
        res.json(users)
    },

    createUser: async (req,res) => {
        try{
            const createdUser = await User.create(req.body)
            res.status(201).json(createdUser)
        }catch(e){
            res.json(e)
        }
    },

    userId: async (req , res)=>{
        const {userIndex} = req.params
        const user = await User.findById(userIndex)

        if(!user){
            res.status(404).json(`User with (${userIndex}) id  not found`)
            return
        }

        res.json(createUser)
    },

    deleteUser: async (req, res)=>{
        const {userIndex} = req.params
        const user = await User.findById(userIndex)

        if(!user){
            res.status(404).json(`User with (${userIndex}) id  not found`)
            return
        }
        User.splice(userIndex, 1)
        res.json(user)
    },

    updateUser:async(req, res)=>{
        const {userIndex} = req.params
        const user = await User.updateOne(userIndex)
        Object.assign(User(userIndex), req.body)
        
        if(!user){
            res.status(404).json(`User with (${userIndex}) id  not found`)
            return
        }
        res.json(user)
    }    
}