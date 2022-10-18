const {Schema, model} = require('mongoose')
const kb = require('./../helpers/keyboard-buttons')

const User = model('User', new Schema({
  telegram_id: {type: Number, unique: true, required: true},
  type: {type: String, default: kb.user.search.uz.giveJob},
  name: {type: String, default: ''},
  number: {type: String, default: ''},
  vacancies: [{type: Schema.Types.ObjectId, ref: 'Vacancy'}],
  feedback: [{type: Schema.Types.ObjectId, ref: 'Feedback'}],
  companies: [{type: Schema.Types.ObjectId, ref: 'Company'}],
  total_vacancies: {type: Number, default: 0},
  total_feedback: {type: Number, default: 0},
  total_companies: {type: Number, default: 0},
  step: {type: Number, default: 0},
  lang: {type: String, default: ''},
  isAllowed: {type: Boolean, default: true},
  isCompleted: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now}
}))

module.exports = User
