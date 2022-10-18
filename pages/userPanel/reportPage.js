const kb = require('../../helpers/keyboard-buttons')

const r0 = async (bot, chat_id, lang) => {

  const word = (lang === kb.language.uz) ? 'Tez kunda' : 'Скоро'
  await bot.sendMessage(chat_id, word)
}

const reports = async (bot, chat_id, lang, text) => {
  try {
    if (text === kb.user.pages.uz.report || text === kb.user.pages.ru.report) await r0(bot, chat_id, lang)
  } catch (e) {
    console.log(e)
  }
}

module.exports = {reports}
