const dataService = require('./service/dataService')
const jwt = require('jsonwebtoken')
const cors = require('cors')

//import express
const express = require("express")
const { Food } = require('./service/db')

//create app using express
const app = express()

//convert json to javascript
app.use(express.json())

// connection string to front end integration
app.use(cors({ origin: 'http://localhost:4200' }))

const jwtMiddleware = (req, res, next) => {
    try {


        const token = req.headers["access-token"]
        // verify token
        const data = jwt.verify(token, "supersecretkey123")
        console.log(data);

        next()
    }
    catch {
        res.status(422).json({
            statusCode: 422,
            status: false,
            message: "please login"
        })
    }
}

app.post('/register', (req, res) => {
    // res.send('post method')
    dataService.registers(req.body.fname, req.body.lname, req.body.phone , req.body.email,req.body.password).then(result => {
        // convert js to json and send to clint
        res.status(result.statusCode).json(result)
    })
})
app.post('/login', (req, res) => {
    dataService.Login(req.body.email, req.body.password).then(result => {
        res.status(result.statusCode).json(result)
    })
})

app.get('/allFood', (req, res) => {
    dataService.viewAllFood().then(result => {
        res.status(result.statusCode).json(result)
    })
})

app.get('/singleFood/:id', (req, res) => {
    dataService.viewAllFood(req.params.id).then(result => {
        res.status(result.statusCode).json(result)
    })
})



app.listen(3000, () => { console.log("server start at 3000"); })