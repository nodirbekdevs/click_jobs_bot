const Route = require('./../models/routeModel')

const getRoutes = async (select) => {
  try {
    if (select === 'no') {
      return await Route.find({}).select("title")
    } else {
      return await Route.find({})
    }
  } catch (e) {
    console.log(e)
  }
}

const getRoute = async (query) => {
  try {
    return await Route.findOne(query)
  } catch (e) {
    console.log(e)
  }
}

const makeRoute = async (data) => {
  try {
    return await Route.create(data)
  } catch (e) {
    console.log(e)
  }
}

const updateRoute = async (query, data) => {
  try {
    return await Route.findOneAndUpdate(query, data, {new: true})
  } catch (e) {
    console.log(e)
  }
}

const deleteRoute = async (query) => {
  try {
    return await Route.findOneAndDelete(query)
  } catch (e) {
    console.log(e)
  }
}

const countRoutes = async (query) => {
  try {
    return await Route.countDocuments(query)
  } catch (e) {
    console.log(e)
  }
}

module.exports = {getRoutes, getRoute, makeRoute, updateRoute, deleteRoute, countRoutes}
