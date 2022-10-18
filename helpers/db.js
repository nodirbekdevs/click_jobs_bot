const {connect} = require('mongoose')
const config = require('./config')

const db = connect(config.mongo_url, config.mongo_options)
  .then(() => {console.log('To MongoDb has connected ...')})
  .catch((err) => {console.log(`To MongoDb has not connected and problem has kept ${err}`)})

module.exports = db
