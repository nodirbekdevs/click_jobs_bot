const Vacancy = require('./../models/vacansyModel')
const {getUser} = require('./userController')

const getVacancies = async (query) => {
  try {
    return await Vacancy.find(query).sort({createdAt: -1})
  } catch (e) {
    console.log(e)
  }
}

const getVacancy = async (query) => {
  try {
    return await Vacancy.findOne(query)
  } catch (e) {
    console.log(e)
  }
}

const makeVacancy = async (user_id) => {
  try {
    const user = await getUser({telegram_id: user_id})
    const vacancy = await Vacancy.create({author: user_id, type: user.type})
    user.vacancies.push(vacancy._id)
    user.total_vacancies += 1
    await user.save()

    return vacancy
  } catch (e) {
    console.log(e)
  }
}

const updateVacancy = async (query, data) => {
  try {
    return await Vacancy.findOneAndUpdate(query, data, {new: true})
  } catch (e) {
    console.log(e)
  }
}

const updateManyVacancies = async (query, data) => {
  try {
    const res = await Vacancy.updateMany(query, data)
    return res
  } catch (e) {
    console.log(e)
  }
}

const deleteVacancy = async (query) => {
  try {
    const vacancy = await getVacancy(query)
    const user = await getUser({telegram_id: vacancy.author})
    const index = user.vacancies.indexOf(vacancy._id)
    if (index > -1) user.vacancies.splice(index)
    user.total_vacancies -= 1
    await user.save()
    return await Vacancy.findOneAndDelete(query)
  } catch (e) {
    console.log(e)
  }
}

const countVacancies = async (query) => {
  try {
    return await Vacancy.countDocuments(query)
  } catch (e) {
    console.log(e)
  }
}

module.exports = {getVacancies, getVacancy, makeVacancy, updateVacancy, updateManyVacancies, deleteVacancy, countVacancies}
