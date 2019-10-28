const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const publicdirpath = path.join(__dirname, '../public')
app.use(express.static(publicdirpath))
app.set('views', path.join(__dirname, '../templates/views')); // Added after online research
app.set('view engine', 'hbs')

hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.get('', (req, res) => {
    res.render('index', {
        name: 'Ankur',
        place: 'New Delhi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Ankur',
        place: 'New Delhi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        name: 'Ankur'
    })
})

// For getting Temp/Forcast
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
        error: 'You must provide the address in Url'
        })
    }
    console.log(req.query.address)
    const addressenter = req.query.address 
    geocode(addressenter, (error, request = 0) => {
        if(error){
            return res.send({error})
        }
        console.log(request.latitude, request.longitude, request.place_name )
        forecast(request.latitude, request.longitude, (error, data) => {
            if(error){
                return console.log('Error', error)
            }
            console.log('Data', data)
            res.send({
                data: data
            })
        })  
    })  

   
})

// for Products
app.get('/products', (req, res) => {
    if(!req.query.name){
        return res.send({
        error: 'You must provide the search term'
        })
    }
    console.log(req.query.name)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404page' , {
        title: 'Help - Article not found'})
})

app.get('*', (req, res) => {
    res.render('404page', {
        title: '404 page, not found'})
})

app.listen(3000, () => {
    console.log('Server is up at port 3000')
})