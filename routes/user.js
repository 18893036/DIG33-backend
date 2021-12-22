// USER ROUTES
const express = require("express")
const router = express.Router()
const User = require("./../models/User")

// GET all users
router.get('/', (req, res) => {
    // get all users from the User model using the find() method
    User.find()
        .then((users) => {
            res.json(users)
        })
        .catch((err) => {
            console.log("Problem getting users", err)
        })
})


// GET - get single user by an ID, the variable parameter is stored in req.params.id -------
router.get('/:id', (req, res) => {
    User.findById(req.params.id)
        .then((user) => {
            if (!user) {
                res.status(404).json({
                    message: "user doesn't exist"
                })
            } else {
                res.json(user)
            }
        })
        .catch((err) => {
            console.log("error getting user", err)
        })
})




// POST - create new user ------------------------------------------------------------------
router.post('/', (req, res) => {
    // console.log("Request body =", req.body)          // log request body that was sent
    if (!req.body) {
        return res.status(400).json({
            message: "user content is empty"
        })
    }

    // create user if req above is good and data is in the body
    const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName
    })

    // save newUser document to the database
    newUser.save()
        .then((user) => {
            // send back 201 status and new user object
            res.status(201).json(user)
        })
        .catch((err) => {
            console.log("error getting user", err)
            res.status(500).json({
                message: "problem getting user",
                error: err
            })
        })
})




// PUT - update a user by ID ---------------------------------------------------------------
router.put('/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: "user content is empty"
        })
    }

    // update user using the User model
    User.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((user) => {
            res.json(user)
        })
        .catch((err) => {
            console.log("error getting user", err)
            res.status(500).json({
                message: "problem getting user",
                error: err
            })
        })
})



// DELETE - delete user by ID --------------------------------------------------------------
router.delete('/:id', (req, res) => {
    // validate that there is a user id
    if(!req.params.id){
        return res.status(400).json({
            message: "User id is missing!"
        })
    }

    // delete the user using the User model
    User.findOneAndDelete({_id: req.params.id})
        .then(() => {
            res.json({
                message: "User deleted"
            })
        })
        .catch((err) => {
            console.log("error deleting user", err)
            res.status(500).json({
                message: "problem deleting user",
                error: err
            })
        })
        
})





module.exports = router