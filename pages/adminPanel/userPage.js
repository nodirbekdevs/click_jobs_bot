const {countUsers} = require('./../../controllers/userController')
const kb = require('./../../helpers/keyboard-buttons')
const keyboard = require('./../../helpers/keyboard')

const aus0 = async (bot, chat_id) => {
  await bot.sendMessage(chat_id, "Foydalanuvchilar bo'limi nima qilamiz", {
    reply_markup: {
      resize_keyboard: true,
      keyboard: keyboard.admin.users
    }
  })
}

const aus1 = async (bot, chat_id) => {
  const nou = await countUsers({})
  const nocu = await countUsers({isCompleted: true})
  const noau = await countUsers({isCompleted: true, isAllowed: true})
  const nonau = await countUsers({isCompleted: true, isAllowed: false})

  const word = `
    Umumiy foydalanuvchilar soni - ${nou}
    Registratsiyadan o'tgan foydalanuvchilar soni - ${nocu}
    Ruxsat etilgan foydalanuvchilar soni - ${noau}
    Ruxsat etilmagan foydalanuvchilar soni - ${nonau}
  `

  await bot.sendMessage(chat_id, word)
}

const adminUsers = async (bot, chat_id, text) => {
  try {

      if (text === kb.admin.pages.users) {
        await aus0(bot, chat_id)
      }
      if (text === kb.admin.users.number) {
        await aus1(bot, chat_id)
      }

  } catch (e) {
    console.log(e)
  }
}

module.exports = {adminUsers}
