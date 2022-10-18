const {getUser, updateUser} = require('../../controllers/userController')
const kb = require('../../helpers/keyboard-buttons')
const keyboard = require('../../helpers/keyboard')

// const rs1 = async (bot, chat_id, text) => {
//   await updateUser({telegram_id: chat_id}, {lang: text, step: 1})
//
//   // const word = (user.lang === kb.language.uz) ? "Profil turini tanlang!\n" +
//   //   "Siz ish qidirayotgan bo'lsangiz, «👔 Ish qidiruvchi» tugmasini bosing!\n" +
//   //   "Agar siz ishchi qiritayotgan bo'lsangiz «💼 Ish beruvchi» tugmasini bosing!"
//   //   : "Выберите тип профиля!\n" +
//   //   "Если вы ищете работу, нажмите на кнопку «👔 Соискатель»!\n" +
//   //   "Если вы нанимаете сотрудника, нажмите кнопку «💼 Работодатель»!"
//
//   if (text === kb.language.uz) {
//     await bot.sendMessage(chat_id, word, {
//       reply_markup: {
//         resize_keyboard: true,
//         keyboard: keyboard.user.search.uz,
//         one_time_keyboard: true
//       }
//     })
//   } else if (text === kb.language.ru) {
//     await bot.sendMessage(chat_id, word, {
//       reply_markup: {
//         resize_keyboard: true,
//         keyboard: keyboard.user.search.ru,
//         one_time_keyboard: true
//       }
//     })
//   }
// }

const rs1 = async (bot, chat_id, text) => {

  await updateUser({telegram_id: chat_id}, {lang: text, step: 1})

  if (text === kb.language.uz) {
    await bot.sendMessage(chat_id, 'Keling tanishamiz')
    await bot.sendMessage(chat_id, 'Ismingiz?')
  } else if (text === kb.language.ru) {
    await bot.sendMessage(chat_id, 'Давайте познакомимся')
    await bot.sendMessage(chat_id, 'Как вас зовут?')
  }
}

const rs2 = async (bot, chat_id, lang, text) => {
  const message = (lang === kb.language.uz) ? 'Telefon raqamingizni ulashing' : 'Поделитесь своим контактом'
  const send = (lang === kb.language.uz) ? 'Yuborish' : 'Отправить'
  const mes = (lang === kb.language.uz) ? `Contactingizni jo'natish uchun ${send} ni bosing` : `Нажмите ${send} тобы отправить ваш контакт`
  await updateUser({telegram_id: chat_id}, {name: text, step: 2})
  await bot.sendMessage(chat_id, message)
  await bot.sendMessage(chat_id, mes, {
    parse_mode: "Markdown",
    reply_markup: {
      resize_keyboard: true,
      keyboard: [[{text: send, request_contact: true}]],
      one_time_keyboard: true
    }
  })
}

const rs3 = async (bot, chat_id, lang, text) => {
  await updateUser({telegram_id: chat_id}, {step: 3, number: text, isCompleted: true})

  if (lang === kb.language.uz) {
    await bot.sendMessage(chat_id, 'Registratsiya muvaffaqqiyatli tamomlandi', {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.main.uz
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(chat_id, 'Регистрация успешно завершена', {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.main.ru
      }
    })
  }

  // if (lang === kb.language.uz) {
  //   await bot.sendMessage(id, 'Foydalanish shartlariga rozimisiz', {
  //     reply_markup: {
  //       resize_keyboard: true,
  //       keyboard: keyboard.allow_uz
  //     }
  //   })
  // } else if (lang === kb.language.ru) {
  //   await bot.sendMessage(id, 'Вы соглашаетесь с условиями использования', {
  //     reply_markup: {
  //       resize_keyboard: true,
  //       keyboard: keyboard.allow_ru
  //     }
  //   })
  // }
}

const rs5 = async (bot, chat_id, lang, text) => {

  if (text === kb.user.allow.uz.yes || text === kb.user.allow.ru.yes) {
    await updateUser({telegram_id: chat_id}, {step: 5, isAllowed: true})
  } else if (text === kb.user.allow.uz.no || text === kb.user.allow.ru.no) {
    await updateUser({telegram_id: chat_id}, {step: 5})
  }

  const e_user = await getUser({telegram_id: chat_id})

  if (lang === kb.language.uz) {
    await bot.sendMessage(chat_id, `Ismingiz - ${e_user.name}, Raqamingiz: ${e_user.number}. To'g'rimi?`, {
      reply_markup: {
        resize_keyboard: true,
        inline_keyboard: [
          [
            {text: kb.user.condition.uz.true, callback_data: kb.user.condition.uz.true},
            {text: kb.user.condition.uz.false, callback_data: kb.user.condition.uz.false}
          ]
        ]
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(chat_id, `Ваше имя - ${e_user.name} и номер - ${e_user.number}. Правильно?`, {
      reply_markup: {
        resize_keyboard: true,
        inline_keyboard: [
          [
            {text: kb.user.condition.ru.true, callback_data: kb.user.condition.ru.true},
            {text: kb.user.condition.ru.false, callback_data: kb.user.condition.ru.false}
          ]
        ]
      }
    })
  }
}

const rs6 = async (bot, chat_id, lang, text) => {

  if (text === kb.user.condition.uz.true || text === kb.user.condition.ru.true) {
    await updateUser({telegram_id: chat_id}, {step: 6, isCompleted: true})

    if (lang === kb.language.uz) {
      await bot.sendMessage(chat_id, 'Registratsiya muvaffaqqiyatli tamomlandi', {
        reply_markup: {
          resize_keyboard: true,
          keyboard: keyboard.main.uz
        }
      })
    } else if (lang === kb.language.ru) {
      await bot.sendMessage(chat_id, 'Регистрация успешно завершена', {
        reply_markup: {
          resize_keyboard: true,
          keyboard: keyboard.main.ru
        }
      })
    }
  } else if (text === kb.user.condition.uz.false || text === kb.user.condition.ru.false) {
    await rs1(bot, chat_id)
  }
}

const register = async (bot, user, chat_id, lang, text) => {
  try {
    if (user.step === 0) {
      await rs1(bot, chat_id, text)
    } else if (user.step === 1) {
      await rs2(bot, chat_id, lang, text)
    } else if (user.step === 2) {
      await rs3(bot, chat_id, lang, text)
    }
    // else if (user.step === 3) {
    //   await rs4(bot, chat_id, lang, text)
    // }
    // else if (user.step === '4') {
    //   await rs5(bot, id, lang, text)
    // }
  } catch (e) {
    console.log(e)
  }
}

module.exports = {register}
