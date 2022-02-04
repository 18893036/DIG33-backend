// CONTACTS ROUTES
const express = require("express")
const router = express.Router()
const Contacts = require("./../models/Contacts")

// GET all contacts
router.get('/', (req, res) => {
    // get all contacts from the contacts model using the find() method
    Contacts.find()
        .then((contacts) => {
            res.json(contacts)
        })
        .catch((err) => {
            console.log("Problem getting contacts", err)
        })
})


// GET - get single contacts by an ID, the variable parameter is stored in req.params.id -------
router.get('/:id', (req, res) => {
    Contacts.findById(req.params.id)
        .then((contacts) => {
            if (!contacts) {
                res.status(404).json({
                    message: "contacts doesn't exist"
                })
            } else {
                res.json(contacts)
            }
        })
        .catch((err) => {
            console.log("error getting contacts", err)
        })
})




// POST - create new contacts ------------------------------------------------------------------
router.post('/', (req, res) => {
    // console.log("Request body =", req.body)          // log request body that was sent
    if (!req.body) {
        return res.status(400).json({
            message: "contacts content is empty"
        })
    }

    // create contacts if req above is good and data is in the body
    const newContacts = new Contacts({
        eventTitle: req.body.eventTitle,
        eventLocation: req.body.eventTitle,
        image: req.body.image
    })

    // save newContacts document to the database
    newContacts.save()
        .then((contacts) => {
            // send back 201 status and new contacts object
            res.status(201).json(contacts)
        })
        .catch((err) => {
            console.log("error getting contacts", err)
            res.status(500).json({
                message: "problem getting contacts",
                error: err
            })
        })
})




// PUT - update a contacts by ID ---------------------------------------------------------------
router.put('/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: "contacts content is empty"
        })
    }

    // update contacts using the contacts model
    Contacts.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((contacts) => {
            res.json(contacts)
        })
        .catch((err) => {
            console.log("error getting contacts", err)
            res.status(500).json({
                message: "problem getting contacts",
                error: err
            })
        })
})



// DELETE - delete contacts by ID --------------------------------------------------------------
router.delete('/:id', (req, res) => {
    // validate that there is a contacts id
    if(!req.params.id){
        return res.status(400).json({
            message: "contacts id is missing!"
        })
    }

    // delete the contacts using the contacts model
    Contacts.findOneAndDelete({_id: req.params.id})
        .then(() => {
            res.json({
                message: "contacts deleted"
            })
        })
        .catch((err) => {
            console.log("error deleting contacts", err)
            res.status(500).json({
                message: "problem deleting contacts",
                error: err
            })
        })
        
})


module.exports = router