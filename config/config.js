module.exports = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/hebron_rocket',

    ACCESS_TOKEN_SECRET: 'TOKEN_SECRET', 
    REFRESH_TOKEN_SECRET: 'REFRESH_SECRET',

    SYSTEM_MAIL: process.env.SYSTEM_MAIL || '',
    SYSTEM_MAIL_PASSWORD: process.env.SYSTEM_MAIL_PASSWORD || '',

    FRONTEND_URL:'https://googlr.com'
}    