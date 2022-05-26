const express = require('express')
const {engine} = require('express-handlebars')
const{PORT} = require('./config/config')
const mongoose = require('mongoose')

const userRouter = require('./routers/user.router')
const reportRouter = require('./routers/report.router')
const carsRouter = require('./routers/cars.routes')

const app = express()


app.engine('.hbs', engine({defaultLayout: false}))
app.set('view engine', '.hbs')
app.set('views', './static')


app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/users', userRouter)
app.use('/reports', reportRouter)
app.use('/cars', carsRouter)

  
mongoose.connect("mongodb://localhost:27017/hebron_rocket").then(()=>{
    console.log('Welcome Database')
});


app.get('/page', (req, res)=>{
   res.render('welcome')
})

app.listen(PORT,()=>{
    console.log(`App listen ${PORT}`)
})