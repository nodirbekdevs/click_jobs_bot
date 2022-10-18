const {Schema, model} = require('mongoose')

const Vacancy = model('Vacancy', new Schema({
  author: {type: Number, ref: 'User', required: true},
  type: {type: String, default: ''},
  title: {type: String, default: ''},
  route: {type: String, default: ''},
  level: {type: String, default: ''},
  work_type: {type: String, default: ''},
  company: {type: String, default: ''},
  location: {type: String, default: ''},
  currency: {type: String, default: ''},
  salary: {type: String, default: ''},
  telephone_number: {type: String, default: ''},
  email: {type: String, default: ''},
  username: {type: String, default: ''},
  url: {type: String, default: ''},
  work_time: {type: String, default: ''},
  tasks: {type: String, default: ''},
  requirements: {type: String, default: ''},
  offers: {type: String, default: ''},
  step: {type: Number, default: 0},
  attempt: {type: Number, default: 0},
  isCompleted: {type: Boolean, default: false},
  isApproved: {type: Boolean, default: false},
  isMistake: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now}
}))

module.exports = Vacancy
