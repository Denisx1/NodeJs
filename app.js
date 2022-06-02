const express = require('express')
const {engine} = require('express-handlebars')
const{ PORT, MONGO_URL, } = require('./config/config')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const{ userRouter, carsRouter, reportRouter, authRouter } = require('./routers')
const ApiError = require('./errors/Appierror')

const app = express()


app.engine('.hbs', engine({defaultLayout: false}))
app.set('view engine', '.hbs')
app.set('views', './static')


app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/users', userRouter)
app.use('/reports', reportRouter)
app.use('/cars', carsRouter)
app.use('/auth', authRouter)
app.use('*',_notFoundHandler)
app.use(_mainErrorHendler)

function _notFoundHandler(req, res, next){
    next(new ApiError('not found', 404))
}

function _mainErrorHendler(err, req, res, next){
    res.status(err.status || 500).json({
        message: err.message || 'Server Error ',
        status:err.status,
        data:[]
    })
}
  
mongoose.connect(MONGO_URL).then(()=>{
    console.log('Welcome Database')
});


app.get('/page', (req, res)=>{
   res.render('welcome')
})

app.listen(PORT,()=>{
    console.log(`App listen ${PORT}`)
})