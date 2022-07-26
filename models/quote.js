import mongoose from 'mongoose'

const Schema = mongoose.Schema

const quoteSchema = new Schema({
  quote: {type: String, required: true},
  author: {type: String, required: true},
  photo: {type: String},
  owner: {type: mongoose.Schema.Types.ObjectId, ref: "Profile"},
}, {
  timestamps: true
})

const Quote = mongoose.model('Quote', quoteSchema)

export {
  Quote
}