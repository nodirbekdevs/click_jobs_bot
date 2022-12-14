const kb = require('./../../helpers/keyboard-buttons')
const keyboard = require('./../../helpers/keyboard')

const amp = async (bot, chat_id, name) => {
  await bot.sendMessage(chat_id, `${name} nima qilamiz`, {
    reply_markup: {
      resize_keyboard: true,
      keyboard: keyboard.admin.pages
    }
  })
}

const adminMainPage = async (bot, chat_id, name, text) => {
    if (text === kb.start || text === kb.main.uz) {
      await amp(bot, chat_id, name)
    }
}

module.exports = {adminMainPage}
