const {Schema, model} = require('mongoose')

const Admin = model('Admin', new Schema({
  telegram_id: {type: Number, unique: true, required: true},
  name: {type: String, default: ''},
  username: {type: String, default: ''},
  number: {type: String, default: ''},
  advertising: [{type: Schema.Types.ObjectId, ref: 'Advertising'}],
  total_advertising: {type: Number, default: 0},
  step: {type: Number, default: 0},
  createdAt: {type: Date, default: Date.now}
}))

module.exports = Admin
