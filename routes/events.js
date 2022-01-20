// EVENTS ROUTES
const express = require("express")
const router = express.Router()
const Events = require("./../models/Events")

// GET all events
router.get('/', (req, res) => {
    // get all events from the events model using the find() method
    Events.find()
        .then((events) => {
            res.json(events)
        })
        .catch((err) => {
            console.log("Problem getting events", err)
        })
})


// GET - get single events by an ID, the variable parameter is stored in req.params.id -------
router.get('/:id', (req, res) => {
    Events.findById(req.params.id)
        .then((events) => {
            if (!events) {
                res.status(404).json({
                    message: "events doesn't exist"
                })
            } else {
                res.json(events)
            }
        })
        .catch((err) => {
            console.log("error getting events", err)
        })
})




// POST - create new events ------------------------------------------------------------------
router.post('/', (req, res) => {
    // console.log("Request body =", req.body)          // log request body that was sent
    if (!req.body) {
        return res.status(400).json({
            message: "events content is empty"
        })
    }

    // create events if req above is good and data is in the body
    const newEvents = new Events({
        eventTitle: req.body.eventTitle,
        eventLocation: req.body.eventTitle,
        image: req.body.image
    })

    // save newEvents document to the database
    newEvents.save()
        .then((events) => {
            // send back 201 status and new events object
            res.status(201).json(events)
        })
        .catch((err) => {
            console.log("error getting events", err)
            res.status(500).json({
                message: "problem getting events",
                error: err
            })
        })
})




// PUT - update a events by ID ---------------------------------------------------------------
router.put('/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: "events content is empty"
        })
    }

    // update events using the events model
    Events.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((events) => {
            res.json(events)
        })
        .catch((err) => {
            console.log("error getting events", err)
            res.status(500).json({
                message: "problem getting events",
                error: err
            })
        })
})



// DELETE - delete events by ID --------------------------------------------------------------
router.delete('/:id', (req, res) => {
    // validate that there is a events id
    if(!req.params.id){
        return res.status(400).json({
            message: "events id is missing!"
        })
    }

    // delete the events using the events model
    Events.findOneAndDelete({_id: req.params.id})
        .then(() => {
            res.json({
                message: "events deleted"
            })
        })
        .catch((err) => {
            console.log("error deleting events", err)
            res.status(500).json({
                message: "problem deleting events",
                error: err
            })
        })
        
})


module.exports = router