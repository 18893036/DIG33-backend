// PAIRINGS ROUTES
const express = require("express")
const router = express.Router()
const Pairings = require("./../models/Pairings")

// GET all pairings
router.get('/', (req, res) => {
    // get all pairings from the pairings model using the find() method
    Pairings.find()
        .then((pairings) => {
            res.json(pairings)
        })
        .catch((err) => {
            console.log("Problem getting pairings", err)
        })
})


// GET - get single pairings by an ID, the variable parameter is stored in req.params.id -------
router.get('/:id', (req, res) => {
    Pairings.findById(req.params.id)
        .then((pairings) => {
            if (!pairings) {
                res.status(404).json({
                    message: "pairings doesn't exist"
                })
            } else {
                res.json(pairings)
            }
        })
        .catch((err) => {
            console.log("error getting pairings", err)
        })
})




// POST - create new pairings ------------------------------------------------------------------
router.post('/', (req, res) => {
    // console.log("Request body =", req.body)          // log request body that was sent
    if (!req.body) {
        return res.status(400).json({
            message: "pairings content is empty"
        })
    }

    // create pairings if req above is good and data is in the body
    const newPairings = new Pairings({
        pigProduct: req.body.pigProduct,
        dishName: req.body.dishName,
        ingredients: req.body.ingredients
    })

    // save newPairings document to the database
    newPairings.save()
        .then((pairings) => {
            // send back 201 status and new pairings object
            res.status(201).json(pairings)
        })
        .catch((err) => {
            console.log("error getting pairings", err)
            res.status(500).json({
                message: "problem getting pairings",
                error: err
            })
        })
})




// PUT - update a pairings by ID ---------------------------------------------------------------
router.put('/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: "pairings content is empty"
        })
    }

    // update pairings using the Pairings model
    Pairings.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((pairings) => {
            res.json(pairings)
        })
        .catch((err) => {
            console.log("error getting pairings", err)
            res.status(500).json({
                message: "problem getting pairings",
                error: err
            })
        })
})



// DELETE - delete pairings by ID --------------------------------------------------------------
router.delete('/:id', (req, res) => {
    // validate that there is a pairings id
    if(!req.params.id){
        return res.status(400).json({
            message: "pairings id is missing!"
        })
    }

    // delete the pairings using the Pairings model
    Pairings.findOneAndDelete({_id: req.params.id})
        .then(() => {
            res.json({
                message: "pairings deleted"
            })
        })
        .catch((err) => {
            console.log("error deleting pairings", err)
            res.status(500).json({
                message: "problem deleting pairings",
                error: err
            })
        })
        
})





module.exports = router