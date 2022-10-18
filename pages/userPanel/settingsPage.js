const {updateUser, getUser} = require('../../controllers/userController')
const keyboard = require('../../helpers/keyboard')
const kb = require('../../helpers/keyboard-buttons')

let type

const st0 = async (bot, user, lang) => {
  const word_uz = `Ma'lumotlaringiz: Ismingiz - ${user.name}. Telefon raqamingiz - ${user.number}.Tipingiz - ${user.type}. Nimani o'zgartirmoqchisiz`;
  const word_ru = `Ваша информация: Ваше имя ${user.name}. Ваш номер телефона: ${user.number} Ваш тип: ${user.type}. Что вы хотите изменить`;

  await updateUser({telegram_id: user.telegram_id}, {step: 5})

  if (lang === kb.language.uz) {
    await bot.sendMessage(user.telegram_id, word_uz, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.settings.uz,
        one_time_keyboard: true
      }
    })
  } else if (kb.language.ru) {
    await bot.sendMessage(user.telegram_id, word_ru, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.settings.ru,
        one_time_keyboard: true
      }
    })
  }
}

const st1 = async (bot, chat_id, lang) => {

  await updateUser({telegram_id: chat_id}, {step: 6})

  const word = (lang === kb.language.uz)
    ? "O'zgartirmoqchi bo'lgan ismingizni kiriting"
    : "Введите имя, которое хотите изменить"

  await bot.sendMessage(chat_id, word)
}

const st2 = async (bot, chat_id, lang, text) => {
  await updateUser({telegram_id: chat_id}, {name: text, step: 5})

  if (lang === kb.language.uz) {
    await bot.sendMessage(chat_id, "Ismingiz muvaffaqiyatli o'zgartirildi", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.settings.uz,
        one_time_keyboard: true
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(chat_id, "Ваше имя успешно изменено", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.settings.ru,
        one_time_keyboard: true
      }
    })
  }
}

const st3 = async (bot, chat_id, lang) => {
  await updateUser({telegram_id: chat_id}, {step: 6})

  const word = (lang === kb.language.uz) ? "O'zgartirmoqchi bo'lgan raqamingizni kiriting" : "Введите номер, которое хотите изменить"

  await bot.sendMessage(chat_id, word)
}

const st4 = async (bot, chat_id, lang, text) => {
  await updateUser({telegram_id: chat_id}, {number: text, step: 5})

  if (lang === kb.language.uz) {
    await bot.sendMessage(chat_id, "Raqamingiz muvaffaqiyatli o'zgartirildi", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.settings.uz,
        one_time_keyboard: true
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(chat_id, "Ваш номер успешно изменен", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.settings.ru,
        one_time_keyboard: true
      }
    })
  }
}

const st5 = async (bot, chat_id, lang) => {
  const user = await getUser({telegram_id: chat_id})

  if ((user.type === kb.user.search.uz.giveJob || user.type === kb.user.search.ru.giveJob) && user.total_companies > 1) {
    await updateUser({telegram_id: user.telegram_id}, {step: 5})
    if (lang === kb.language.uz) {
      await bot.sendMessage(chat_id, "Siz tipingizni o'zgartirolmaysiz", {
        reply_markup: {
          resize_keyboard: true,
          keyboard: keyboard.user.settings.uz
        }
      })
    } else if (lang === kb.language.ru) {
      await bot.sendMessage(chat_id, "Вы не можете изменить свой тип", {
        reply_markup: {
          resize_keyboard: true,
          keyboard: keyboard.user.settings.ru
        }
      })
    }
  } else {
    await updateUser({telegram_id: chat_id}, {step: 6})
    if (lang === kb.language.uz) {
      await bot.sendMessage(chat_id, "O'zgartirmoqchi bo'lgan tipingizni kiriting", {
        reply_markup: {
          resize_keyboard: true,
          keyboard: keyboard.user.search.uz
        }
      })
    } else if (lang === kb.language.ru) {
      await bot.sendMessage(chat_id, "Введите номер, которое хотите изменить", {
        reply_markup: {
          resize_keyboard: true,
          keyboard: keyboard.user.search.ru
        }
      })
    }
  }
}

const st6 = async (bot, chat_id, lang, text) => {
  await updateUser({telegram_id: chat_id}, {type: text, step: 5})

  if (lang === kb.language.uz) {
    await bot.sendMessage(chat_id, "Tipingiz muvaffaqiyatli o'zgartirildi", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.settings.uz
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(chat_id, "Ваш тип успешно изменен", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.settings.ru
      }
    })
  }
}

const st7 = async (bot, chat_id, lang) => {
  await updateUser({telegram_id: chat_id}, {step: 6})

  const word = (lang === kb.language.uz) ? "Qaysi tilni tanlaysiz" : "Какой язык вы выбираете"

  await bot.sendMessage(chat_id, word, {
    reply_markup: {
      resize_keyboard: true,
      keyboard: keyboard.language
    }
  })
}

const st8 = async (bot, chat_id, lang, text) => {
  await updateUser({telegram_id: chat_id}, {lang: text, step: 5})

  if (lang === kb.language.uz) {
    await bot.sendMessage(chat_id, "Tilingiz muvaffaqiyatli o'zgartirildi", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.settings.uz
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(chat_id, "Ваш язык успешно изменен", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.settings.ru
      }
    })
  }
}

const settings = async (bot, user, lang, text) => {
  try {
    if (text === kb.user.pages.uz.settings || text === kb.user.pages.ru.settings) {
      await st0(bot, user, lang)
    } else if ((user.step === 5 || user.step === 7) && (text === kb.main.uz || text === kb.main.ru)) {
      await updateUser({telegram_id: user.telegram_id}, {step: 4})
    } else if (user.step === 5) {
      if (text === kb.user.settings.uz.name || text === kb.user.settings.ru.name) {
        await st1(bot, user.telegram_id, lang)
      } else if (text === kb.user.settings.uz.number || text === kb.user.settings.ru.number) {
        await st3(bot, user.telegram_id, lang)
      } else if (text === kb.user.settings.uz.type || text === kb.user.settings.ru.type) {
        await st5(bot, user.telegram_id, lang)
      } else if (text === kb.user.settings.uz.language || text === kb.user.settings.ru.language) {
        await st7(bot, user.telegram_id, lang)
      }
      type = text
    } else if (user.step === 6) {
      if (type === kb.user.settings.uz.name || type === kb.user.settings.ru.name) {
        await st2(bot, user.telegram_id, lang, text)
      } else if (type === kb.user.settings.uz.number || type === kb.user.settings.ru.number) {
        await st4(bot, user.telegram_id, lang, text)
      } else if (type === kb.user.settings.uz.type || type === kb.user.settings.ru.type) {
        await st6(bot, user.telegram_id, lang, text)
      } else if (type === kb.user.settings.uz.language || type === kb.user.settings.ru.language) {
        await st8(bot, user.telegram_id, lang, text)
      }
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports = {settings}
