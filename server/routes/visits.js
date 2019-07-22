const express = require('express')
const StreetArt = require('../models/StreetArt')
const Visit = require('../models/Visit')
const { isLoggedIn } = require('../middlewares')
const router = express.Router()

// Route protected for logged in user
router.get('/my-visits', isLoggedIn, (req, res, next) => {
  let userId = req.user.id
  Visit.find({ _user: userId })
    .populate('_streetArt')
    .then(visits => res.json(visits))
    .catch(err => next(err))
})

router.post('/visits', isLoggedIn, (req, res, next) => {
  let userId = req.user._id
  let streetArtId = req.body.streetArtId
  Visit.create({ _user: userId, _streetArt: streetArtId })
    .then(visit => res.json(visit))
    .catch(err => next(err))
})

router.delete('/visits/:visitId', isLoggedIn, (req, res, next) => {
  let userId = req.user._id
  let visitId = req.params.visitId
  console.log(visitId, userId)
  Visit.findById(visitId).then(visit => {
    console.log(visit)
    if (visit._user.toString() === userId.toString()) {
      console.log(visit._user)
      Visit.deleteOne({ _id: visitId }).then(visit =>
        res.json({ message: 'The visit was deleted' })
      )
    } else {
      res.json({ message: 'You are not allowed to delete this visit!' })
    }
  })
})

module.exports = router
