import { Quote } from "../models/quote";

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

export {
  create
}