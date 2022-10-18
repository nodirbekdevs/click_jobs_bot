const Company = require('./../models/companyModel')
const {getUser} = require('./userController')

const getCompanies = async (query) => {
  try {
    return await Company.find(query)
  } catch (e) {
    console.log(e)
  }
}

const getOwnerOneCompany = async (query) => {
  try {
    return await Company.findOne(query).sort({updatedAt: -1}).limit(1)
  } catch (e) {
    console.log(e)
  }
}

const getCompany = async (query) => {
  try {
    return await Company.findOne(query)
  } catch (e) {
    console.log(e)
  }
}

const makeCompany = async (user_id, data, text) => {
  try {
    const user = await getUser({telegram_id: user_id})
    const company = await Company.create({...data, owner: user_id})
    user.companies.push(company._id)
    user.total_companies += 1
    await user.save()
    return company
  } catch (e) {
    console.log(e)
  }
}

const updateCompany = async (query, data) => {
  try {
    return await Company.findOneAndUpdate(query, {...data, updatedAt: Date.now()})
  } catch (e) {
    console.log(e)
  }
}

const deleteCompany = async (query) => {
  try {
    const company = await getCompany(query)
    const user = await getUser({telegram_id: company.owner})
    const index = user.companies.indexOf(company._id)
    if (index > -1) user.company.splice(index)
    user.total_companies -= 1
    await user.save()
    return await Company.findOneAndDelete(query)
  } catch (e) {
    console.log(e)
  }
}

const countCompanies = async (query) => {
  try {
    return await Company.countDocuments(query)
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  getCompanies,
  getOwnerOneCompany,
  getCompany,
  makeCompany,
  updateCompany,
  deleteCompany,
  countCompanies
}
