const Advertising = require('./../models/advertisingModel')
const Company = require('./../models/companyModel')
const {getAdmin} = require('./adminController')
const {getCompany} = require('./companyController')

const getAllAdvertising = async (query) => {
  try {
    return await Advertising.find(query).sort({createdAt: -1})
  } catch (e) {
    console.log(e)
  }
}

const getOneAdvertising = async (query) => {
  try {
    return await Advertising.findOne(query)
  } catch (e) {
    console.log(e)
  }
}

const makeAdvertising = async (telegram_id) => {
  try {
    const admin = await getAdmin({telegram_id})
    const advertising = await Advertising.create({author: admin._id})
    admin.advertising.push(advertising._id)
    admin.total_advertising += 1
    await admin.save()
    return advertising
  } catch (e) {
    console.log(e)
  }
}

const updateAdvertising = async (query, data, text) => {
  try {
    let advertising
    if (text === 'company') {
      const company = await getCompany({name: data.company})
      if (!company) await Company.create({name: data.company})
      advertising = await Advertising.findOneAndUpdate(query, data)
    } else {
      advertising = await Advertising.findOneAndUpdate(query, data)
    }
    return advertising
  } catch (e) {
    console.log(e)
  }
}

const deleteAdvertising = async (query) => {
  try {
    const advertising = await getOneAdvertising(query)
    const admin = await getAdmin({telegram_id: advertising.author})
    const company = await getCompany({name: advertising.company})
    if (admin) {
      admin.total_advertising -= 1
      const index = admin.advertising.indexOf(advertising._id)
      if (index > -1) admin.advertising.splice(index)
      await admin.save()
    }
    if (company) {
      company.total_advertising -= 1
      const index = company.advertising.indexOf(advertising._id)
      if (index > -1) company.advertising.splice(index)
      await company.save()
    }
    return await Advertising.findOneAndDelete(query)
  } catch (e) {
    console.log(e)
  }
}

const countAdvertising = async (query) => {
  try {
    return await Advertising.countDocuments(query)
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  getAllAdvertising,
  getOneAdvertising,
  makeAdvertising,
  updateAdvertising,
  deleteAdvertising,
  countAdvertising
}
