import { Quote } from "../models/quote.js";
import { v2 as cloudinary } from 'cloudinary'

function create(req, res) {
  req.body.owner = req.user.profile
  Quote.create(req.body)
    .then(quote => {
      Quote.findById(quote._id)
        .populate('owner')
        .then(populatedQuote => {
          res.json(populatedQuote)
        })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ err: err.errmsg })
    })
}

function index(req, res) {
  Quote.find({})
    .populate('owner')
    .then(quotes => {
      res.json(quotes)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ err: err.errmsg })
    })
}

function deleteOne(req, res) {
  Quote.findById(req.params.id)
    .then(quote => {
      if (quote.owner._id.equals(req.user.profile)) {
        Quote.findByIdAndDelete(quote._id)
          .then(deletedQuote => {
            res.json(deletedQuote)
          })
      } else {
        res.status(401).json({ err: "Not authorized" })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ err: err.errmsg })
    })
}

function update(req ,res) {
  Quote.findById(req.params.id)
  .then(quote => {
    if (quote.owner._id.equals(req.user.profile)) {
      Quote.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .populate('owner')
      .then(updatedQuote => {
        res.json(updatedQuote)
      })
    } else {
      res.status(401).json({err: 'Not Authorized'})
    }
  })
  .catch(err => {
    console.log(err) 
    res.status(500).json({err: err.errmsg})
  })
}

// wooo weee

function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Quote.findById(req.params.id)
    .then(quote => {
      cloudinary.uploader.upload(imageFile, { tags: `${quote.name}` })
        .then(image => {
          quote.photo = image.url
          quote.save()
            .then(quote => {
              res.status(201).json(quote.photo)
            })
        })
        .catch(err => {
          console.log(err)
          res.status(500).json(err)
        })
    })
}

export {
  create,
  index,
  deleteOne as delete,
  update,
  addPhoto
}