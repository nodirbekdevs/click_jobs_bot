const {Schema, model} = require('mongoose')

const Advertising = model('Advertising', new Schema({
  author: {type: Schema.Types.ObjectId, ref: 'Admin', required: true},
  image: {type: String, default: ''},
  title: {type: String, default: ''},
  description: {type: String, default: ''},
  company: {type: String, default: ''},
  step: {type: Number, default: 0},
  isCompleted: {type: Boolean, default: false},
  isMistake: {type: Boolean, default: false},
  isApproved: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now}
}))

module.exports = Advertising
