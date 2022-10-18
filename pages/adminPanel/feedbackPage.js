const {countFeedback} = require('./../../controllers/feedbackController')
const kb = require('./../../helpers/keyboard-buttons')
const keyboard = require('./../../helpers/keyboard')

const afs0 = async (bot, chat_id) => {
  await bot.sendMessage(chat_id, "Fikrlar bo'limida nima qilamiz", {
    reply_markup: {
      resize_keyboard: true,
      keyboard: keyboard.admin.feedback
    }
  })
}

const afs1 = async (bot, chat_id) => {
  const nof = await countFeedback({})
  const nocf = await countFeedback({isCompleted: true, isMistake: false})
  const noncf = await countFeedback({isCompleted: false, isMistake: true})

  const word = `
    Umumiy fikrlar soni - ${nof}
    Tugallanlan fikrlar soni - ${nocf}
    Tugallanmagan va xato fikrlar soni - ${noncf}
  `

  await bot.sendMessage(chat_id, word)
}

const adminFeedback = async (bot, chat_id, text) => {
  try {
      if (text === kb.admin.pages.feedback) {
        await afs0(bot, chat_id)
      }
      if (text === kb.admin.feedback.number) {
        await afs1(bot, chat_id)
      }

  } catch (e) {
    console.log(e)
  }
}

module.exports = {adminFeedback}
