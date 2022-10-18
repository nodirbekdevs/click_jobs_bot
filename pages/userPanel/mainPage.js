const kb = require('../../helpers/keyboard-buttons')
const keyboard = require('../../helpers/keyboard')

const mainPage = async (bot, chat_id, name, lang) => {
  if (lang === kb.language.uz) {
    await bot.sendMessage(chat_id, `${name} nima qilamiz`, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.pages.uz
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(chat_id, `${name} что мы будем делать`, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.pages.ru
      }
    })
  }
}

const main = async (bot, user, lang, message) => {
  const text = message.text

  try {
    if (user && user.isCompleted && text === kb.start) {
      await mainPage(bot, user.telegram_id, user.name, lang)
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports = {main, mainPage}
