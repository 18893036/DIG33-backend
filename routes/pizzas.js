// Pizzas ROUTES
const express = require("express")
const router = express.Router()
const Pizzas = require("./../models/Pizzas")

// GET all pizzas
router.get('/', (req, res) => {
    // get all pizzas from the pizzas model using the find() method
    Pizzas.find()
        .then((pizzas) => {
            res.json(pizzas)
        })
        .catch((err) => {
            console.log("Problem getting pizzas", err)
        })
})


// GET - get single pizzas by an ID, the variable parameter is stored in req.params.id -------
router.get('/:id', (req, res) => {
    Pizzas.findById(req.params.id)
        .then((pizzas) => {
            if (!pizzas) {
                res.status(404).json({
                    message: "pizzas doesn't exist"
                })
            } else {
                res.json(pizzas)
            }
        })
        .catch((err) => {
            console.log("error getting pizzas", err)
        })
})




// POST - create new pizzas ------------------------------------------------------------------
router.post('/', (req, res) => {
    // console.log("Request body =", req.body)          // log request body that was sent
    if (!req.body) {
        return res.status(400).json({
            message: "pizzas content is empty"
        })
    }

    // create Pizzas if req above is good and data is in the body
    const newPizzas = new Pizzas({
        name : pizza.name,
        image :pizza.image,
//        varients : ['small','medium','large'],
        description : pizza.description,
        category : pizza.category,
//        prices : [pizza.prices]
    })

    // save newPizzas document to the database
    newPizzas.save()
        .then((pizzas) => {
            // send back 201 status and new pizzas object
            res.status(201).json(pizzas)
        })
        .catch((err) => {
            console.log("error getting pizzas", err)
            res.status(500).json({
                message: "problem getting pizzas",
                error: err
            })
        })
})




// PUT - update a pizzas by ID ---------------------------------------------------------------
router.put('/:id', (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            message: "pizzas content is empty"
        })
    }

    // update pizzas using the pizzas model
    Pizzas.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((pizzas) => {
            res.json(pizzas)
        })
        .catch((err) => {
            console.log("error getting pizzas", err)
            res.status(500).json({
                message: "problem getting pizzas",
                error: err
            })
        })
})



// DELETE - delete pizzas by ID --------------------------------------------------------------
router.delete('/:id', (req, res) => {
    // validate that there is a pizzas id
    if(!req.params.id){
        return res.status(400).json({
            message: "pizzas id is missing!"
        })
    }

    // delete the pizzas using the pizzas model
    Pizzas.findOneAndDelete({_id: req.params.id})
        .then(() => {
            res.json({
                message: "pizzas deleted"
            })
        })
        .catch((err) => {
            console.log("error deleting pizzas", err)
            res.status(500).json({
                message: "problem deleting pizzas",
                error: err
            })
        })
        
})








///////////////////////////////////////////////////////////////////////////////////////////////////

router.get("/getallpizzas", async(req, res) => {
  
    try {
        const pizzas = await Pizza.find({})
        res.send(pizzas)
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});

router.post("/addpizza", async(req, res) => {

    const pizza = req.body.pizza

   try {
    const newpizza = new Pizza({
        name : pizza.name,
        image :pizza.image,
        varients : ['small','medium','large'],
        description : pizza.description,
        category : pizza.category,
        prices : [pizza.prices]
    })
    await newpizza.save()
    res.send('New Pizza Added Successfully')
   } catch (error) {
       return res.status(400).json({ message: error });
   }
  
});

router.post("/getpizzabyid", async(req, res) => {

 const pizzaid = req.body.pizzaid

 try {
     const pizza = await Pizza.findOne({_id : pizzaid})
     res.send(pizza)
 } catch (error) {
     return res.status(400).json({ message: error });
 }
  
});

router.post("/editpizza", async(req, res) => {

    const editedpizza = req.body.editedpizza

    try {
        const pizza = await Pizza.findOne({_id : editedpizza._id})
        
        pizza.name= editedpizza.name,
        pizza.description= editedpizza.description,
        pizza.image= editedpizza.image,
        pizza.category=editedpizza.category,
        pizza.prices = [editedpizza.prices]

        await pizza.save()

        res.send('Pizza Details Edited successfully')

    } catch (error) {
        return res.status(400).json({ message: error });
    }
  
});

router.post("/deletepizza", async(req, res) => {

    const pizzaid = req.body.pizzaid

  try {
    await Pizza.findOneAndDelete({_id : pizzaid})
    res.send('Pizza Deleted successfully')
  } catch (error) {
      return res.status(400).json({ message: error });
  }
  
});





module.exports = router