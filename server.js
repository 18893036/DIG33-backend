// dependencies
require("dotenv").config()
const bodyParser = require("body-parser")
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const port = process.env.PORT || 3000

// database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    //useFindAndModify: false
})
    .then(() => {
        console.log("db connected!")
    })
    .catch((err) => {
        console.log("db connection failed!", err)
    })

// express app setup
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('*', cors())

// routes
// homepage route
app.get('/', (req, res) => {
    res.send("This is the homepage")
})

// user route
const userRouter = require("./routes/user")
app.use('/users', userRouter)

// auth route
const authRouter = require("./routes/auth")
app.use('/auth', authRouter)

// merchandise route
const merchandiseRouter = require("./routes/merchandise")
app.use('/merchandise', merchandiseRouter)

// pairings route
const pairingsRouter = require("./routes/pairings")
app.use('/pairings', pairingsRouter)

// ciders route
const cidersRouter = require("./routes/ciders")
app.use('/ciders', cidersRouter)

// pizzas route
const pizzasRouter = require("./routes/pizzas")
app.use('/pizzas', pizzasRouter)

// orders route
const orderssRouter = require("./routes/orders")
app.use('/pizzas', orderssRouter)

// run app (listen on a port).  This actually runs the app.
app.listen(port, () => {
    console.log("App is running on port ", port)
})