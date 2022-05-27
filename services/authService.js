const ApiError = require('../errors/Appierror')
const bcrypt = require('bcrypt')

async function comparePassword(hashPassword, password){
    const isPasswordSanse = await bcrypt.compare(password, hashPassword)

    if (!isPasswordSanse){
        throw new ApiError('Wron password', 400)
    }
}

function hashPassword(password){
    return bcrypt.hash(password, 10)
}

module.exports = {
    comparePassword,
    hashPassword
}