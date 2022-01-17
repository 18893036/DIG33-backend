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



// another GET all users
router.get("/getallusers", async(req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        return res.status(400).json({ message: error });
    }
  
});





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
router.post('/register', (req, res) => {
    // console.log("Request body =", req.body)          // log request body that was sent
    if (!req.body) {
        return res.status(400).json({
            message: "user content is empty"
        })
    }

    // create user if req above is good and data is in the body
    const {name , email , password} = req.body
    const newUser = new User({name , email , password})

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

/* router.post("/register", async(req, res) => { */
  





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
router.post("/deleteuser", async(req, res) => {
  
    const userid = req.body.userid

    try {
        await User.findOneAndDelete({_id : userid})
        res.send('User Deleted Successfully')
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});






// -------------------------------------------------------------------------------------
router.post("/login", async(req, res) => {

    const {email , password} = req.body

    try {
        
        const user = await User.find({email , password})

        if(user.length > 0)
        {
            const currentUser = {
                name : user[0].name , 
                email : user[0].email, 
                isAdmin : user[0].isAdmin, 
                _id : user[0]._id
            }
            res.send(currentUser);
        }
        else{
            return res.status(400).json({ message: 'User Login Failed' });
        }

    } catch (error) {
           return res.status(400).json({ message: 'Something went weong' });
    }
  
});


module.exports = router





/////////////////////////////////////////////////////////////////








