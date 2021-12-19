const express = require('express')
const router = express.Router()
const Utils = require('./../utils')
const User = require('./../models/User')
const path = require('path')



// PUT - copy Favourite Exercises to Program --------------------------------------
router.put('/copyFav/', Utils.authenticateToken, (req, res) => {  
  // validate check
  if(!req.body.clientId){
    return res.status(400).json({
      message: "No client specified"
    })
  }
  
  // add exerciseId to favouriteExercises field (array - push)
  User.updateOne({
    _id: req.user._id
  }, {
    $$set: {
      "req.body.clientId.favouriteExercises": "req.body.clientId.program"
    }
  })
    .then((user) => {            
      res.json({
        message: "Client added to favourites"
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem adding that client"
      })
    })
})


// PUT - add client --------------------------------------
router.put('/addClient/', Utils.authenticateToken, (req, res) => {  
  // validate check
  if(!req.body.clientId){
    return res.status(400).json({
      message: "No client specified"
    })
  }
  // add exerciseId to favouriteExercises field (array - push)
  User.updateOne({
    _id: req.user._id
  }, {
    $push: {
      client: req.body.clientId
    }
  })
    .then((user) => {            
      res.json({
        message: "Client added to favourites"
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem adding that client"
      })
    })
})


// PUT - add favouriteExercise --------------------------------------
router.put('/addFavExercise/', Utils.authenticateToken, (req, res) => {  
  // validate check
  if(!req.body.exerciseId){
    return res.status(400).json({
      message: "No exercise specified"
    })
  }
  // add exerciseId to favouriteExercises field (array - push)
  User.updateOne({
    _id: req.user._id
  }, {
    $push: {
      favouriteExercises: req.body.exerciseId
    }
  })
    .then((user) => {            
      res.json({
        message: "Client added to favourites"
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem adding favourite exercise"
      })
    })
})




// PUT - add program --------------------------------------
router.put('/addProgram/', Utils.authenticateToken, (req, res) => {  
  // validate check
  if(!req.body.favExercises){
    return res.status(400).json({
      message: "No exercise specified"
    })
  }

  // add exerciseId to favouriteExercises field (array - push)
  User.updateOne({
    _id: req.user._id
  }, {
    $push: {
      program: req.body.favExercises
    }
  })
    .then((user) => {            
      res.json({
        message: "Program added to favourites"
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem adding program"
      })
    })
})






// ------------- DELETE FAVOURITE EXERCISES---------------------------------
router.delete('/deleteFavExercise/', Utils.authenticateToken, (req, res) => {  
  // validate check
  if(!req.body.exerciseId){
    return res.status(400).json({
      message: "No exercise specified"
    })
  }

 // db.items1.update( { _id: 1 },{ $unset: {"purqty": ""}})

  // delete the user using the User model
  User.update({
    _id: req.user._id
  }, {
    $unset: {
      favouriteExercises: req.body.exerciseId
    }
  })
    .then((user) => {            
      res.json({
        message: "Exercise removed from favourites"
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem removing favourite exercise"
      })
    })
})




// ------------- Delete (REMOVE) ACTIVE CLIENT ---------------------------------
router.delete('/removeActiveClient/', Utils.authenticateToken, (req, res) => {  
  // validate check
  if(!req.body.clientId){
    return res.status(400).json({
      message: "No client specified"
    })
  }

 // db.items1.update( { _id: 1 },{ $unset: {"purqty": ""}})

  // delete the user using the User model
  User.updateOne({
    _id: req.user._id
  }, {
    $unset: {
      client: req.body.client
    }
  })
    .then((user) => {            
      res.json({
        message: "Active client was removed"
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem removing active client"
      })
    })
})




// ------------- DELETE CLIENT PROGRAM ---------------------------------
router.delete('/deleteProgram/', Utils.authenticateToken, (req, res) => {  
  // validate check
  if(!req.body.exerciseId){
    return res.status(400).json({
      message: "No exercise specified"
    })
  }

 // db.items1.update( { _id: 1 },{ $unset: {"purqty": ""}})

  // delete the user using the User model
  User.update({
    _id: req.user._id
  }, {
    $unset: {
      program: req.body.exerciseId
    }
  })
    .then((user) => {            
      res.json({
        message: "Exercise removed from favourites"
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem removing favourite exercise"
      })
    })
})



// ------------- DELETE CLIENT PROGRAM ---------------------------------
router.delete('/deleteClientProgram/', Utils.authenticateToken, (req, res) => {  
  // validate check
  if(!req.body.currentUser){
    return res.status(400).json({
      message: "No client specified"
    })
  }

 // db.items1.update( { _id: 1 },{ $unset: {"purqty": ""}})

  // delete the user using the User model
  User.updateOne({
    _id: req.body.currentUser.client
  }, {
    $unset: {
      program: ""
    }
  })
    .then((user) => {            
      res.json({
        message: "Exercise removed from favourites"
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem removing favourite exercise"
      })
    })
})




// PUT - add favouriteHaircut --------------------------------------
router.put('/addClientProgram/', Utils.authenticateToken, (req, res) => {  
  // validate check
  if(!req.body.currentUser){
    return res.status(400).json({
      message: "No user specified"
    })
  }
  // add haircutId to favouriteHaircuts field (array - push)
  User.findOneAndUpdate({
    _id: req.body.currentUser.client
  }, {
    $push: {
      favouriteExercises: req.body.currentUser.favouriteExercises,
      program: req.body.currentUser.favouriteExercises
    }
  })
    .then((user) => {            
      res.json({
        message: "Haircut added to favourites"
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem adding favourite haircut"
      })
    })
})





// PUT - add favouriteHaircut --------------------------------------
router.put('/addFavHaircut/', Utils.authenticateToken, (req, res) => {  
  // validate check
  if(!req.body.haircutId){
    return res.status(400).json({
      message: "No haircut specified"
    })
  }
  // add haircutId to favouriteHaircuts field (array - push)
  User.updateOne({
    _id: req.user._id
  }, {
    $push: {
      favouriteHaircuts: req.body.haircutId
    }
  })
    .then((user) => {            
      res.json({
        message: "Haircut added to favourites"
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem adding favourite haircut"
      })
    })
})




// GET- get all users ---------------------------
router.get('/', Utils.authenticateToken, (req, res) => {
  User.find().populate('user', '_id firstName lastName')
    .then(users => {
      if(users == null){
        return res.status(404).json({
          message: "No users found"
        })
      }
      res.json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem getting users"
      })
    })  
})





// GET - get single user -------------------------------------------------------
router.get('/:id', Utils.authenticateToken, (req, res) => {
  if(req.user._id != req.params.id){
    return res.status(401).json({
      message: "Not authorised"
    })
  }

//  User.findById(req.params.id).populate('favouriteHaircuts')
  User.findById(req.params.id).populate('favouriteExercises')
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Couldn't get user",
        error: err
      })
    })
})


// PUT - update user ---------------------------------------------
router.put('/:id', Utils.authenticateToken, (req, res) => {
  // validate request
  if(!req.body) return res.status(400).send("Task content can't be empty")
  
  let avatarFilename = null

  // if avatar image exists, upload!
  if(req.files && req.files.avatar){
    // upload avater image then update user
    let uploadPath = path.join(__dirname, '..', 'public', 'images')
    Utils.uploadFile(req.files.avatar, uploadPath, (uniqueFilename) => {
      avatarFilename = uniqueFilename
      // update user with all fields including avatar
      updateUser({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        avatar: avatarFilename,
        bio: req.body.bio,
        accessLevel: req.body.accessLevel        
      })
    })
  }else{
    // update user without avatar
    updateUser(req.body)
  }
  
  // update User
  function updateUser(update){    
    User.findByIdAndUpdate(req.params.id, update, {new: true})
    .then(user => res.json(user))
    .catch(err => {
      res.status(500).json({
        message: 'Problem updating user',
        error: err
      })
    }) 
  }
})

// POST - create new user --------------------------------------
router.post('/', (req, res) => {
  // validate request
  if(Object.keys(req.body).length === 0){   
    return res.status(400).send({message: "User content can not be empty"})
  }

  // check account with email doen't already exist
  User.findOne({email: req.body.email})
  .then(user => {
    if( user != null ){
      return res.status(400).json({
        message: "email already in use, use different email address"
      })
    }
  // create new user       
  let newUser = new User(req.body)
  newUser.save()
    .then(user => {        
      // success!  
      // return 201 status with user object
      return res.status(201).json(user)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).send({
        message: "Problem creating account",
        error: err
      })
    })
  })
})

module.exports = router