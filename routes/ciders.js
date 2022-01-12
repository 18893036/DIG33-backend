// ciders ROUTES
const express = require("express")
const router = express.Router()
const Ciders = require("./../models/Ciders")

// GET all ciders
router.get('/', (req, res) => {
    // get all ciders from the ciders model using the find() method
    Ciders.find()
        .then((ciders) => {
            res.json(ciders)
        })
        .catch((err) => {
            console.log("Problem getting ciders", err)
        })
})


// GET - get single ciders by an ID, the variable parameter is stored in req.params.id -------
router.get('/:id', (req, res) => {
    Ciders.findById(req.params.id)
        .then((ciders) => {
            if (!ciders) {
                res.status(404).json({
                    message: "ciders doesn't exist"
                })
            } else {
                res.json(ciders)
            }
        })
        .catch((err) => {
            console.log("error getting ciders", err)
        })
})




// POST - create new ciders ------------------------------------------------------------------
router.post('/', (req, res) => {
    // console.log("Request body =", req.body)          // log request body that was sent
    if (!req.body) {
        return res.status(400).json({
            message: "ciders content is empty"
        })
    }

    // create ciders if req above is good and data is in the body
    const newCiders = new Ciders({
        ciderTitle: req.body.ciderTitle,
        ciderType: req.body.ciderType,
        ciderSlogan: req.body.ciderSlogan,
        image: req.body.image
    })

    // save newCiders document to the database
    newCiders.save()
        .then((ciders) => {
            // send back 201 status and new ciders object
            res.status(201).json(ciders)
        })
        .catch((err) => {
            console.log("error getting ciders", err)
            res.status(500).json({
                message: "problem getting ciders",
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
    Ciders.findByIdAndUpdate(req.params.id, req.body, { new: true })
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