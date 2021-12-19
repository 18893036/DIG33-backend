const express = require('express')
const router = express.Router()
const Utils = require('./../utils')
const Exercise = require('./../models/Exercise')
const path = require('path')

// GET- get all exercises ---------------------------
router.get('/', Utils.authenticateToken, (req, res) => {
  Exercise.find().populate('user', '_id firstName lastName')
    .then(exercises => {
      if(exercises == null){
        return res.status(404).json({
          message: "No exercises found"
        })
      }
      res.json(exercises)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem getting exercises"
      })
    })  
})



// GET- get certain exercises ---------------------------
router.get('/getCertainExercises', Utils.authenticateToken, (req, res) => {
  Exercise.find().populate('user', '_id firstName lastName')
    .then(exercises => {
      if(exercises == null){
        return res.status(404).json({
          message: "No exercises found"
        })
      }
      res.json(exercises)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        message: "Problem getting exercises"
      })
    })  
})


// POST - create new exercise --------------------------------------
router.post('/', (req, res) => {
  // validate 
  if(Object.keys(req.body).length === 0){   
    return res.status(400).send({message: "exercises content can't be empty"})
  }
  // validate - check if image file exist
  if(!req.files || !req.files.image){
    return res.status(400).send({message: "Image can't be empty"})
  }

  console.log('req.body = ', req.body)

  // image file must exist, upload, then create new exercise
  let uploadPath = path.join(__dirname, '..', 'public', 'images')
  Utils.uploadFile(req.files.image, uploadPath, (uniqueFilename) => {    
    // create new exercise
    let newExercise = new Exercise({
      name: req.body.name,
      description: req.body.description,
      image: uniqueFilename
    })
  
    newExercise.save()
    .then(exercise => {        
      // success!  
      // return 201 status with exercise object
      return res.status(201).json(exercise)
    })
    .catch(err => {
      console.log(err)
      return res.status(500).send({
        message: "Problem creating exercise",
        error: err
      })
    })
  })
})


// export
module.exports = router