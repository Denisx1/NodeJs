const userss = require("../database/userss")

module.exports = {
    getAllUsers: (req,res )  => {
        res.json(userss)
    },

    createUser:(req,res) => {
        console.log(req.body)
        userss.push(req.body)
        res.json(userss)
    },

    userId:(req , res)=>{
        const {userIndex} = req.params
        const user = userss[userIndex]

        if(!user){
            res.status(404).json(`User with (${userIndex}) id  not found`)
            return
        }

        res.json(user)
    },

    deleteUser:(req, res)=>{
        const {userIndex} = req.params
        const user = userss[userIndex]

        if(!user){
            res.status(404).json(`User with (${userIndex}) id  not found`)
            return
        }
        userss.splice(userIndex, 1)
        res.json(user)
    },

    updateUser:(req, res)=>{
        const {userIndex} = req.params
        const user = userss[userIndex]
        Object.assign(userss[userIndex], req.body)
        
        if(!user){
            res.status(404).json(`User with (${userIndex}) id  not found`)
            return
        }
        res.json(user)
    }    
}
