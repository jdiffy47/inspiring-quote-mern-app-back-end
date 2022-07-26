import { Quote } from "../models/quote.js";

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

export {
  create,
  index,
  deleteOne as delete
}