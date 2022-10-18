const TelegramBot = require('node-telegram-bot-api')
const config = require('./helpers/config')
const db = require('./helpers/db')
const {getAdmin} = require('./controllers/adminController')
const {getUser} = require('./controllers/userController')
const {userPanel} = require('./pages/userPanel/userPanel')
const {adminPanel} = require('./pages/adminPanel/adminPanel')
const {avs4} = require('./pages/adminPanel/vacancyPage')
const {cs2} = require('./pages/userPanel/companyPage')

const bot = new TelegramBot(config.TOKEN, {db, polling: true})

bot.setMyCommands(
  [
    {command: '/start', description: 'Start the bot'}
  ]
)

bot.on('message', async message => {
  const admin = await getAdmin({telegram_id: message.from.id})

  try {
    if (admin) {
      await adminPanel(bot, message, admin)
    } else {
      await userPanel(bot, message)
    }
  } catch (e) {
    console.log(e + '')
  }
})

bot.on('callback_query', async query => {
  const telegram_id = query.from.id, data = query.data

  const user = await getUser({telegram_id})
  const admin = await getAdmin({telegram_id})

  if (admin) {
    await avs4(bot, telegram_id, data)
  }
  if (user) {
    await cs2(bot, telegram_id, data)
  }
  // if (user) {
  //   if (user.step === '5') {
  //     await rs6(bot, user.telegram_id, user.lang, data)
  //   }
  // }

})
