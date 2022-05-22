const express = require('express')
const {engine} = require('express-handlebars')
const cars = require('./database/cars')
const users = require('./database/users')

const app = express()

app.engine('.hbs', engine({defaultLayout: false}))
app.set('view engine', '.hbs')
app.set('views', './static')

app.get('/cars' , (req , res)=>{
   res.render('carx', {model:'Toyota'})
   res.status(404)
   
})

app.get('/cars/:carIndex' , (req , res)=>{
   console.log(req.params)

   const {carIndex} = req.params
   res.json(cars[carIndex])

})

app.get('/users' , (req , res)=>{
   // res.status(404).json(users)
   res.render('userx')
})

app.get('/users/:userIndex' , (req , res)=>{
   console.log(req.params)
   const {userIndex} = req.params
   res.json(users[userIndex])

})

app.get('/page', (req , res)=>{

   res.render('welcome')

})

app.listen(5000,()=>{
    console.log('app listen 5000')
})