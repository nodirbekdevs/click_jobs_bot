const kb = require('../../helpers/keyboard-buttons')

const bw0 = async (bot, chat_id, lang) => {
  const word = (lang === kb.language.uz) ? 'Tez kunda' : 'Скоро'
  await bot.sendMessage(chat_id, word)
}

const work = async (bot, chat_id, lang, text) => {

  try {
    if (text === kb.user.pages.uz.bots_work || text === kb.user.pages.ru.bots_work) await bw0(bot, chat_id, lang)
  } catch (e) {
    console.log(e)
  }
}

module.exports = {work}
