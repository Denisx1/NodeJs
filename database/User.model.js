const { Schema, model } = require('mongoose');

const userRolsEnum = require('../constants/user.rols.enum')
const userGenderEnum = require('../constants/user.gender.enum')

const User = new Schema({
    name : { type: String, trim: true, required: true },
    email: { type: String, trim: true, lowercase: true, unique: true, required: true },
    age:   { type: Number, default: 18 },
    role: { type: String, enum:Object.values(userRolsEnum), default:userRolsEnum.USER},
    gender: {type: String, trim: true, lowercase: true, enum: Object.values(userGenderEnum), default: userGenderEnum.ANOTHER}
   },
    {timestamps: true}
);

module.exports = model('User', User);