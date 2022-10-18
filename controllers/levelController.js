const Level = require('./../models/levelModel')

const getLevels = async (select) => {
  try {
    if (select === 'no') {
      return await Level.find({}).select("title")
    } else {
      return await Level.find({})
    }
  } catch (e) {
    console.log(e)
  }
}

const getLevel = async (query) => {
  try {
    return await Level.findOne(query)
  } catch (e) {
    console.log(e)
  }
}

const makeLevel = async (data) => {
  try {
    return await Level.create(data)
  } catch (e) {
    console.log(e)
  }
}

const updateLevel = async (query, data) => {
  try {
    return Level.findOneAndUpdate(query, data, {new: true})
  } catch (e) {
    console.log(e)
  }
}

const deleteLevel = async (query) => {
  try {
    return await Level.findOneAndDelete(query)
  } catch (e) {
    console.log(e)
  }
}

const countLevels = async (query) => {
  try {
    return await Level.countDocuments(query)
  } catch (e) {
    console.log(e)
  }
}

module.exports = {getLevels, getLevel, makeLevel, updateLevel, deleteLevel, countLevels}
