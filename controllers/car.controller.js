const Cars = require("../database/Cars.model")


module.exports = {
    getAllCars: async(req,res, next)  => {
        try{
            const {limit = 20, page = 1} = req.query
            const skip = (page-1)*limit

            const cars =  await Cars.find().limit(limit).skip(skip);
            const count = await Cars.count({})
            
            res.json({
                page,
                parPage: limit,
                data: cars,
                count
            })
        }catch(e){
            next(e)
        }
    },

    createCar: async (req,res, next) => {
        try{
            const createdCar = await Cars.create(req.body)
            res.json(createdCar)
        }catch(e){
            next(e)
        }
    },

    carId: async (req , res, next)=>{
        try{
            const {carIndex} = req.params
            const car = await Cars.findById(carIndex)

        res.json(car)
    }catch(e){
        next(e)
    }
},

    deleteCar: async (req, res, next)=>{
        try{
            const {carIndex} = req.params
            const carDelete = await Cars.deleteOne({_id: carIndex})
            res.json(carDelete)
        }catch(e){
            next(e)
        }
    },

    updateCar:async(req, res, next)=>{
        try{
            const {carIndex} = req.params
            const carUpdate = await User.updateOne(
            { _id: carIndex },
            { $set: req.body })

            res.json(carUpdate)
        }catch(e){
            next(e)
        }
    } 
}      