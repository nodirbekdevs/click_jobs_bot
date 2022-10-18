const {adminMainPage} = require('./mainPage')
const {adminVacancy} = require('./vacancyPage')
const {adminSettings} = require('./settingsPage')
const {adminAdvertising} = require('./advertisingPage')
const {adminUsers} = require('./userPage')
const {adminFeedback} = require('./feedbackPage')

const adminPanel = async (bot, message, admin) => {
  let text = message.photo ? message.photo[0].file_id : message.text
  const chat_id = message.chat.id, name = admin.name


  await adminMainPage(bot, chat_id, name, text)
  await adminSettings(bot, admin, text)
  await adminVacancy(bot, chat_id, text)
  await adminAdvertising(bot, chat_id, text)
  await adminUsers(bot, chat_id, text)
  await adminFeedback(bot, chat_id, text)
}

module.exports = {adminPanel}
