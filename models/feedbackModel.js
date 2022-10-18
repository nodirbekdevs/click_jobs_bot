const {Schema, model} = require('mongoose')

const Feedback = model('Feedback', new Schema({
  author: {type: Number, ref: 'User'},
  title: {type: String, default: ''},
  description: {type: String, default: ''},
  step: {type: Number, default: 1},
  isCompleted: {type: Boolean, default: false},
  isMistake: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now}
}))

module.exports = Feedback
