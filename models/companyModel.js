const {Schema, model} = require('mongoose')

const Company = model('Company', new Schema({
  owner: {type: Number, ref: 'User'},
  name: {type: String, default: '', unique: true},
  location: {type: String, default: ''},
  description: {type: String, default: ''},
  advertising: [{type: Schema.Types.ObjectId, ref: 'Advertising'}],
  vacancies: [{type: Schema.Types.ObjectId, ref: 'Vacancy'}],
  total_vacancies: {type: Number, default: 0},
  total_advertising: {type: Number, default: 0},
  step: {type: Number, default: 0},
  isEditing: {type: Boolean, default: false},
  updatedAt: {type: Date, default: Date.now},
  createdAt: {type: Date, default: Date.now}
}))

module.exports = Company
