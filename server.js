if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const path = require('path')
const methodOverride = require('method-override')
const mongoose = require('mongoose')

const Activity = require('./models/activity')

// connection
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/saqib';
mongoose.connect(dbUrl)
    .then(() => console.log('connected'))
    .catch(e => console.log('connection error ', e))

// middlewares
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(methodOverride('_method'))

// routing
app.get('/', async(req, res) => {
    try{
        const activities = await Activity.find({})
        res.render('index', {activities})
    }
    catch(e){
        res.send('something went wrong on server side while fetching records')
    }
})
app.post('/', async(req, res) => {
    try{
        const activity = new Activity(req.body)
        await activity.save()
        res.redirect('/')
    }
    catch(e){
        res.send('something went wrong on server side while saveing document')
    }
})
app.delete('/:id', async(req, res) => {
    try{
        await Activity.findByIdAndDelete(req.params.id)
        res.redirect('/')
    }
    catch(e){
        res.send('some thing went wrong while deleting')
    }
})

const port = process.env.PORT || 80
app.listen(port, () => {
    console.log('server running at ', port)
})