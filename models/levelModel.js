const {Schema, model} = require('mongoose')

const Level = model('Level', new Schema({
  title: {type: String, default: ''},
  description: {type: String, default: ''},
  total_developers: {type: Number, default: 0},
  createdAt: {type: Date, default: Date.now}
}))

module.exports = Level
