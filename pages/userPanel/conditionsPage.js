const kb = require('../../helpers/keyboard-buttons')

const c0 = async (bot, chat_id, lang) => {
  const word = (lang === kb.language.uz) ? 'Tez kunda' : 'Скоро'
  await bot.sendMessage(chat_id, word)
}

const conditions = async (bot, chat_id, lang, text) => {
  try {
    if (text === kb.user.pages.uz.conditions || text === kb.user.pages.ru.conditions) await c0(bot, chat_id, lang)
  } catch (e) {
    console.log(e)
  }
}

module.exports = {conditions}
