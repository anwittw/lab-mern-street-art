const express = require('express')
const StreetArt = require('../models/StreetArt')

const uploadCloud = require('../configs/cloudinary')

const router = express.Router()

router.get('/', (req, res, next) => {
  StreetArt.find()
    .then(streetarts => {
      res.json(streetarts)
    })
    .catch(err => next(err))
})

router.get('/:streetArtId', (req, res, next) => {
  let streetArtId = req.params.streetArtId
  StreetArt.findById(streetArtId)
    .then(streetart => {
      res.json(streetart)
    })
    .catch(err => next(err))
})

router.post('/', uploadCloud.single('picture'), (req, res, next) => {
  let lat = req.body.lat
  let lng = req.body.lng
  let pic = req.file.url
  StreetArt.create({ location: { coordinates: [lat, lng] }, pictureUrl: pic })
    .then(streetart => {
      res.json(streetart)
    })
    .catch(err => next(err))
})

module.exports = router
