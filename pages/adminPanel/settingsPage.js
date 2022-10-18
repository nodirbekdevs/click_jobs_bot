const {updateAdmin} = require('../../controllers/adminController')
const keyboard = require('./../../helpers/keyboard')
const kb = require('./../../helpers/keyboard-buttons')

let type

const st0 = async (bot, admin) => {
  const word = `Ma'lumotlaringiz: \n \n Ismingiz - ${admin.name}.\n
  Telefon raqamingiz - ${admin.number}. \n
  Username - ${admin.username}. \n
  Nimani o'zgartirmoqchisiz`;

  await updateAdmin({telegram_id: admin.telegram_id}, {step: 1})

  await bot.sendMessage(admin.telegram_id, word, {
    reply_markup: {
      resize_keyboard: true,
      keyboard: keyboard.admin.settings
    }
  })

}

const st1 = async (bot, chat_id) => {
  await updateAdmin({telegram_id: chat_id}, {step: 2})
  await bot.sendMessage(chat_id, "O'zgartirmoqchi bo'lgan ismingizni kiriting")
}

const st2 = async (bot, chat_id, text) => {
  await updateAdmin({telegram_id: chat_id}, {name: text, step: 1})
  await bot.sendMessage(chat_id, "Ismingiz muvaffaqiyatli o'zgartirildi", {
    reply_markup: {
      resize_keyboard: true,
      keyboard: keyboard.admin.settings
    }
  })
}

const st3 = async (bot, chat_id) => {
  await updateAdmin({telegram_id: chat_id}, {step: 2})
  await bot.sendMessage(chat_id, "O'zgartirmoqchi bo'lgan raqamingizni kiriting")
}

const st4 = async (bot, chat_id, text) => {
  await updateAdmin({telegram_id: chat_id}, {number: text, step: 1})
  await bot.sendMessage(chat_id, "Raqamingiz muvaffaqiyatli o'zgartirildi", {
    reply_markup: {
      resize_keyboard: true,
      keyboard: keyboard.admin.settings
    }
  })
}

const st5 = async (bot, chat_id) => {
  await updateAdmin({telegram_id: chat_id}, {step: 2})
  await bot.sendMessage(chat_id, "O'zgartirmoqchi bo'lgan username ni kiriting")
}

const st6 = async (bot, chat_id, text) => {
  await updateAdmin({telegram_id: chat_id}, {username: text, step: 1})
  await bot.sendMessage(chat_id, "Username muvaffaqiyatli o'zgartirildi", {
    reply_markup: {
      resize_keyboard: true,
      keyboard: keyboard.admin.settings
    }
  })
}

const adminSettings = async (bot, admin, text) => {
  try {
    if (text === kb.admin.pages.settings) {
      await st0(bot, admin)
    } else if (admin.step === 1 && text === kb.main.uz) {
      await updateAdmin({telegram_id: admin.telegram_id}, {step: 0})
    } else if (admin.step === 1) {
      if (text === kb.admin.settings.name) {
        await st1(bot, admin.telegram_id)
      } else if (text === kb.admin.settings.number) {
        await st3(bot, admin.telegram_id)
      } else if (text === kb.admin.settings.username) {
        await st5(bot, admin.telegram_id)
      }
      type = text
    } else if (admin.step === 2) {
      if (type === kb.admin.settings.name) {
        await st2(bot, admin.telegram_id, text)
      } else if (type === kb.admin.settings.number) {
        await st4(bot, admin.telegram_id, text)
      } else if (type === kb.admin.settings.username) {
        await st6(bot, admin.telegram_id, text)
      }
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports = {adminSettings}
