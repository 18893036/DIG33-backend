// USER ROUTES
const express = require("express")
const router = express.Router()

// POST Sign In
router.post('/signin', (req, res) => {
    res.send("The auth >> signin route")
})


// GET 
router.get('/validate', (req, res) => {
    res.send("The auth >> validate route")
})


module.exports = router