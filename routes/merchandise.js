// MERCHANDISE ROUTES
const express = require("express")
const router = express.Router()
const Merchandise = require("./../models/Merchandise")

// GET all merchandise
router.get('/', (req, res) => {
    // get all merchandise from the Merchandise model using the find() method
    Merchandise.find()
        .then((merchandise) => {
            res.json(merchandise)
        })
        .catch((err) => {
            console.log("Problem getting merchandise", err)
        })
})


// GET - get single merchandise by an ID, the variable parameter is stored in req.params.id -------
router.get('/:id', (req, res) => {
    Merchandise.findById(req.params.id)
        .then((merchandise) => {
            if (!merchandise) {
                res.status(404).json({
                    message: "merchandise doesn't exist"
                })
            } else {
                res.json(merchandise)
            }
        })
        .catch((err) => {
            console.log("error getting merchandise", err)
        })
})




// POST - create new merchandise ------------------------------------------------------------------
router.post('/', (req, res) => {
    // console.log("Request body =", req.body)          // log request body that was sent
    if (!req.body) {
        return res.status(400).json({
            message: "merchandise content is empty"
        })
    }

    // create merchandise if req above is good and data is in the body
    const newMerchandise = new Merchandise({
        itemType: req.body.itemType,
        itemName: req.body.itemName,
        itemSize: req.body.itemSize,
        itemCost: req.body.itemCost
    })

    // save newMerchandise document to the database
    newMerchandise.save()
        .then((merchandise) => {
            // send back 201 status and new merchandise object
            res.status(201).json(merchandise)
        })
        .catch((err) => {
            console.log("error getting merchandise", err)
            res.status(500).json({
                message: "problem getting merchandise",
                error: err
            })
        })
})




// PUT - update a merchandise by ID ---------------------------------------------------------------
router.put('/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: "merchandise content is empty"
        })
    }

    // update merchandise using the Merchandise model
    Merchandise.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((merchandise) => {
            res.json(merchandise)
        })
        .catch((err) => {
            console.log("error getting merchandise", err)
            res.status(500).json({
                message: "problem getting merchandise",
                error: err
            })
        })
})



// DELETE - delete merchandise by ID --------------------------------------------------------------
router.delete('/:id', (req, res) => {
    // validate that there is a merchandise id
    if(!req.params.id){
        return res.status(400).json({
            message: "merchandise id is missing!"
        })
    }

    // delete the merchandise using the Merchandise model
    Merchandise.findOneAndDelete({_id: req.params.id})
        .then(() => {
            res.json({
                message: "merchandise deleted"
            })
        })
        .catch((err) => {
            console.log("error deleting merchandise", err)
            res.status(500).json({
                message: "problem deleting merchandise",
                error: err
            })
        })
        
})



router.post("/activatemerchandise", async (req, res) => {
    const merchid = req.body.merchid;
    try {
      const merch = await Merch.findOne({ _id: merchid });
      merch.isDelivered = true;
      await merch.save();
      res.send("Merch Delivered Successfully");
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  });

  router.post("/deactivatemerchandise", async (req, res) => {
    const merchid = req.body.merchid;
    try {
      const merch = await Merch.findOne({ _id: merchid });
      merch.isDelivered = true;
      await merch.save();
      res.send("Merch Delivered Successfully");
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  });



module.exports = router