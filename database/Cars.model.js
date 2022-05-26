const { Schema, model } = require('mongoose');
const carMarks = require('../constants/car.marks.enum')

const Auto = new Schema ({
    name:{type:String, trim:true, required:true,},
    model:{type:String, trim:true, required: true, default:'Land Cruiser 200'},
    number:{type:String, lowercase:true, unique:true, required:true},
    age:{type:Number, default:'2012'},
    basket:{type:String, enum:Object.values(carMarks), default:carMarks.OFFROAD}
    },
    {timestamps: true}
)

module.exports = model('Auto', Auto)