require('dotenv').config()

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/hebron_rocket',

    ACCESS_TOKEN_SECRET: 'TOKEN_SECRET', 
    REFRESH_TOKEN_SECRET: 'REFRESH_SECRET',
    ACTION_TOKEN_SECRET: 'ACTION_TOKEN',

    SYSTEM_MAIL: process.env.SYSTEM_MAIL || '',
    SYSTEM_MAIL_PASSWORD: process.env.SYSTEM_MAIL_PASSWORD || '',

    FRONTEND_URL:'https://localhost:3000',

    S3_BUCKET: process.env.S3_BUCKET,
    S3_REGION: process.env.S3_REGION,

    S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
    S3_SECRET_KEY: process.env.S3_SECRET_KEY
}    