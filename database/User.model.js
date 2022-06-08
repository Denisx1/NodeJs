const { Schema, model } = require('mongoose');

const { userRolsEnum } = require('../constants');
const { authService } = require('../services');

const User = new Schema({
    name : { type: String, trim: true, required: true },
    email: { type: String, trim: true, lowercase: true, unique: true, required: true },
    age:   { type: Number, default: 18 },
    role: { type: String, enum:Object.values(userRolsEnum), default:userRolsEnum.USER},
    password:{type:String, required: true, default: null, select: false},
   },
    {timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// User.virtual('fullName').get(function(){
//     return this.name.toLowerCase()
// })

User.statics = {
    async saveuserWithHashPassword(userToSave){
        const hashPassword = await authService.hashPassword(userToSave.password)

        return this.create({...userToSave, password, hashPassword})
    }
}


module.exports = model('User', User);