const Feedback = require('./../models/feedbackModel')
const {getUser} = require('./userController')

const getAllFeedback = async (query) => {
  try {
    return await Feedback.find(query).sort({createdAt: -1})
  } catch (e) {
    console.log(e)
  }
}

const getOneFeedback = async (query) => {
  try {
    return await Feedback.findOne(query)
  } catch (e) {
    console.log(e)
  }
}

const makeFeedback = async (telegram_id) => {
  try {
    let feedback
    const user = await getUser({telegram_id})
    feedback = await Feedback.create({author: telegram_id})
    user.feedback.push(feedback._id)
    user.total_feedback += 1
    await user.save()
    return feedback
  } catch (e) {
    console.log(e)
  }
}

const updateFeedback = async (query, data) => {
  try {
    return await Feedback.findOneAndUpdate(query, data)
  } catch (e) {
    console.log(e)
  }
}

const deleteFeedback = async (query) => {
  try {
    const feedback = await getOneFeedback(query)
    const user = await getUser({telegram_id: feedback.author})
    user.total_feedback -= 1
    const index = user.feedback.indexOf(feedback._id)
    if (index > -1) user.feedback.splice(index)
    await user.save()
    return await Feedback.findOneAndDelete(query)
  } catch (e) {
    console.log(e)
  }
}

const countFeedback = async (query) => {
  try {
    return await Feedback.countDocuments(query)
  } catch (e) {
    console.log(e)
  }
}

module.exports = {getAllFeedback, getOneFeedback, makeFeedback, updateFeedback, deleteFeedback, countFeedback}
