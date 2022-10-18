const kb = require('../../helpers/keyboard-buttons')
const keyboard = require('../../helpers/keyboard')
const {getUser} = require('../../controllers/userController')
const {getVacancies, getVacancy, makeVacancy, updateVacancy, countVacancies} = require('../../controllers/vacansyController')
const {getRoute, makeRoute} = require('../../controllers/routeController')
const {getLevels} = require('../../controllers/levelController')
const {getCompany, makeCompany} = require('../../controllers/companyController')

let type, vacancy_id, new_vacancy

const vs0 = async (bot, chat_id, lang) => {
  if (lang === kb.language.uz) {
    await bot.sendMessage(chat_id, "Vakansiyalar bo'limida nima qilamiz", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.vacancies.uz
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(chat_id, "Что мы делаем в разделе вакансии", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.vacancies.ru
      }
    })
  }
}

const vs1 = async (bot, chat_id, lang) => {
  let text
  const
    vacancies = await getVacancies({author: chat_id}),
    count = await countVacancies({author: chat_id}),
    author = await getUser({telegram_id: chat_id}),
    completed = await countVacancies({author: chat_id, isCompleted: true}),
    mistake = await countVacancies({author: chat_id, isMistake: true}),
    approved = await countVacancies({author: chat_id, isApproved: true})

  if (count > 0) {
    vacancies.map(async vacancy => {
      const word = (vacancy.type === kb.user.search.uz.giveJob || vacancy.type === kb.user.search.ru.giveJob) ? `
      avtor: ${author.name},
      type: ${vacancy.type},
      title: ${vacancy.title},
      route: ${vacancy.route},
      level: ${vacancy.level},
      work_type: ${vacancy.work_type}
      company: ${vacancy.company}
      location: ${vacancy.location}
      currency: ${vacancy.currency}
      salary: ${vacancy.salary}
      telephone_number: ${vacancy.telephone_number}
      email: ${vacancy.email}
      username: ${vacancy.username}
      url: ${vacancy.url}
      work_time: ${vacancy.work_time}
      tasks: ${vacancy.tasks}
      requirements: ${vacancy.requirements}
      offers: ${vacancy.offers}
    ` : `
      avtor: ${author.name},
      type: ${vacancy.type},
      title: ${vacancy.title},
      route: ${vacancy.route},
      level: ${vacancy.level},
      work_type: ${vacancy.work_type}
      currency: ${vacancy.currency}
      salary: ${vacancy.salary}
      telephone_number: ${vacancy.telephone_number}
      email: ${vacancy.email}
      username: ${vacancy.username}
      url: ${vacancy.url}
      work_time: ${vacancy.work_time}
      requirements: ${vacancy.requirements}
    `

      await bot.sendMessage(chat_id, word)
    })

    text = (lang === kb.language.uz)
      ? `${author.name} siz umumiy ${count} vakansiya bergansiz.
        ${completed} tugallangan vakansiyalaringiz soni
        ${mistake} xato vakansiyalaringiz soni
        ${approved} tasdiqlangan vakansiyalaringiz soni`
      : `${author.name} Вы предоставили всего ${count} вакансии.
        ${completed} количество закрытых вакансий
        ${mistake} количество ошибочных вакансий
        ${approved} количество одобренный вакансий`

  } else if (count === 0) {
    text = (lang === kb.language.uz) ? "Hozircha siz vakansiya bermagansiz" : "Пока вы не дали вакансию"
  }

  await bot.sendMessage(chat_id, text)
}

const vs3 = async (bot, chat_id, lang) => {
  if (lang === kb.language.uz) {
    await bot.sendMessage(chat_id, "Vakansiya sarlavhasini kiriting", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.uz
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(chat_id, "Введите название вакансии", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.ru
      }
    })
  }
}

const vs4 = async (bot, chat_id, lang) => {
  const word = (lang === kb.language.uz) ? "Lavozimni kiriting " : "Введите позицию"

  await bot.sendMessage(chat_id, word)
}

const vs5 = async (bot, chat_id, lang) => {
  if (lang === kb.language.uz) {
    await bot.sendMessage(chat_id, "Yo’nalishni kiritish", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.uz
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(chat_id, " Введите тип", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.ru
      }
    })
  }
}

const vs6 = async (bot, chat_id, lang, text) => {
  let buttons = [], word

  word = (lang === kb.language.uz) ? "Darajanni tanlang" : "Выберите уровень"

  const levels = await getLevels("no")

  levels.map(l => {
    buttons.push([{text: l.title}])
  })

  await bot.sendMessage(chat_id, word, {
    reply_markup: {
      resize_keyboard: true,
      keyboard: buttons
    }
  })
}

const vs7 = async (bot, chat_id, lang) => {

  if (lang === kb.language.uz) {
    await bot.sendMessage(chat_id, "Ish muhitini tanlang", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.work.uz,
        one_time_keyboard: true
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(chat_id, " Выберите рабочую пространству", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.work.ru,
        one_time_keyboard: true
      }
    })
  }
}

const vs8 = async (bot, chat_id, lang) => {
  if (lang === kb.language.uz) {
    await bot.sendMessage(chat_id, "Offis qayerda joylashganini kiriting", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.uz
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(chat_id, "Укажите, где находится офис", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.ru
      }
    })
  }
}

const vs9 = async (bot, chat_id, lang) => {
  if (lang === kb.language.uz) {
    await bot.sendMessage(chat_id, "Firma nomini kiriting", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.uz
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(chat_id, "Введите название компании", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.ru
      }
    })
  }
}

const vs10 = async (bot, chat_id, lang) => {
  if (lang === kb.language.uz) {
    await bot.sendMessage(chat_id, "Ish maoshi valyutasini kiriting", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.currency.uz
      }
    })
    await bot.sendMessage(chat_id, "Suhbat asosida (Eslatib o'tamiz maoshni aniq kiritish ko'proq ishchilarni jalb qiladi)")
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(chat_id, "Введите валюту зарплаты", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.currency.ru
      }
    })
    await bot.sendMessage(chat_id, "На основе интервью (Напомним, что точный ввод заработной платы привлекает больше работников)")
  }
}

const vs11 = async (bot, chat_id, lang) => {
  if (lang === kb.language.uz) {
    await bot.sendMessage(chat_id, "Maoshni kiriting", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.uz
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(chat_id, "Напишите заработную плату", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.ru
      }
    })
  }
}

const vs12 = async (bot, chat_id, lang) => {
  if (lang === kb.language.uz) {
    await bot.sendMessage(chat_id, "📞 Aloqa turini tanlang", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.connection_type.uz
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(chat_id, " 📞 Выберите тип соединения", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.connection_type.ru
      }
    })
  }
}

const vs13 = async (bot, chat_id, username, lang, text) => {
  let word
  if (text === kb.user.connection_type.uz.number || text === kb.user.connection_type.ru.number) {
    word = (lang === kb.language.uz) ? "Telefon raqamingizni kiriting" : "Введите свой номер телефона"
  } else if (text === kb.user.connection_type.uz.email || text === kb.user.connection_type.ru.email) {
    word = (lang === kb.language.uz) ? "Emailingizni kiriting" : "Введите свой email"
  } else if (text === kb.user.connection_type.uz.username || text === kb.user.connection_type.ru.username) {
    word = (lang === kb.language.uz)
      ? `Username - ${username ? `${username} shu username ni kiriting` : "kiriting"} `
      : `Username - ${username ? `${username} введите это имя пользователя` : "введите"} `
  } else if (text === kb.user.connection_type.uz.url || text === kb.user.connection_type.ru.url) {
    word = (lang === kb.language.uz) ? "Linkni kiriting" : "Введите ссылку"
  }
  type = text

  if (lang === kb.language.uz) {
    await bot.sendMessage(chat_id, word, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.uz
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(chat_id, word, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.ru
      }
    })
  }
}

const vs14 = async (bot, chat_id, lang) => {

  if (lang === kb.language.uz) {
    await bot.sendMessage(chat_id, "📞 Yana boshqa aloqa turi qo'shasizmi ?", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.allow.uz
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(chat_id, "📞 Хотите добавить еще один тип подключения? ?", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.allow.ru
      }
    })
  }
}

const vs15 = async (bot, chat_id, lang) => {
  if (lang === kb.language.uz) {
    await bot.sendMessage(chat_id, "🕐 Ish vaqtini kiriting. Masalan: 09:00-18:00 ", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.uz
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(chat_id, "🕐 Введите рабочее время. Например: 09:00-18:00", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.ru
      }
    })
  }
}

const vs16 = async (bot, chat_id, lang) => {
  if (lang === kb.language.uz) {
    await bot.sendMessage(chat_id, "📝  Xodim vazifalarini kiriting", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.uz
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(chat_id, " 📝 Введите обязанности сотрудников", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.ru
      }
    })
  }
}

const vs17 = async (bot, chat_id, lang) => {
  if (lang === kb.language.uz) {
    await bot.sendMessage(chat_id, "⚙️ Qanday texnologiyalar bilan ishlagansiz? Masalan:\n" +
      "  Adobe CC, CorelDraw, SketchApp...", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.uz
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(chat_id, "⚙️ С какими технологиями вы работали.? Например:\n  Adobe CC, CorelDraw, SketchApp...", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.ru
      }
    })
  }
}

const vs18 = async (bot, chat_id, lang) => {
  if (lang === kb.language.uz) {
    await bot.sendMessage(chat_id, "Xodimga nimalar taklif etiladi? Masalan:\n" +
      "  bepul tushlik, issiq kofe,\n" +
      "  firma hisobidan malaka oshirish kurslari...", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.uz
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(chat_id, "Что предлагается сотруднику? Например:\n" +
      "  бесплатный обед, горячий кофе,\n" +
      "  Обучение за счет компании...", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.ru
      }
    })
  }
}

const vs20 = async (bot, chat_id, lang) => {
  if (lang === kb.language.uz) {
    await bot.sendMessage(chat_id, "🎉 Tabriklaymiz! Sizning vakansiyangiz tayyor.\n" +
      "  Kanal adminlari tasdirqlagandan so’ng  vakansiyangizni\n" +
      "e’lon qilamiz.", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.vacancies.uz
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(chat_id, " 🎉 Поздравляем! Ваша вакансия готова.\n" +
      "  После того, как ваша вакансия будет\n" +
      "одобрена админами канала\n" +
      "Мы разместим.", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.vacancies.ru
      }
    })
  }
}

const vs19 = async (bot, vacancy, name, lang, text) => {
  const word = {
    uz: `
      Avtor: ${name},
      Sarlavha: ${vacancy.title},
      Yo'nalish: ${vacancy.route},
      Daraja: ${vacancy.level},
      Ish turi: ${vacancy.work_type}
      Kompaniya: ${vacancy.company}
      Manzil: ${vacancy.location}
      Valyuta: ${vacancy.currency}
      Maosh: ${vacancy.salary}
      Telefon raqam: ${vacancy.telephone_number}
      Email: ${vacancy.email}
      Username: ${vacancy.username}
      Link: ${vacancy.url}
      Ish vaqti: ${vacancy.work_time}
      Vazifalar: ${vacancy.tasks}
      Bilimlar: ${vacancy.requirements}
      Takliflar: ${text}
    `,
    ru: `
      Владелец: ${name},
      Титул: ${vacancy.title},
      Направление: ${vacancy.route},
      Степень: ${vacancy.level},
      Тип работы: ${vacancy.work_type}
      Компания: ${vacancy.company}
      Адрес: ${vacancy.location}
      Валюта: ${vacancy.currency}
      Зарплата: ${vacancy.salary}
      Телефонный номер: ${vacancy.telephone_number}
      Email: ${vacancy.email}
      Username: ${vacancy.username}
      Link: ${vacancy.url}
      Телефонный номер: ${vacancy.work_time}
      Задачи: ${vacancy.tasks}
      Требования: ${vacancy.requirements}
      Предложения: ${vacancy.offers}
    `
  }

  if (lang === kb.language.uz) {
    await bot.sendMessage(vacancy.author, word.uz, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.confirmation.uz,
        one_time_keyboard: true
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(vacancy.author, word.ru, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.confirmation.ru,
        one_time_keyboard: true
      }
    })
  }
}

const vacancy = async (bot, chat_id, username, name, lang, text) => {
  const exist_vacancy = await getVacancy({
    _id: vacancy_id,
    author: chat_id,
    isCompleted: false,
    isApproved: false,
    isMistake: false
  })
    ? await getVacancy({_id: vacancy_id, author: chat_id, isCompleted: false, isApproved: false, isMistake: false})
    : (await getVacancies({author: chat_id, isCompleted: false, isApproved: false, isMistake: false}))[0]

  try {

    if (text === kb.user.pages.uz.vacancies || text === kb.user.pages.ru.vacancies) {
      await vs0(bot, chat_id, lang)
    }
    if (text === kb.user.vacancies.uz.my_vacancies || text === kb.user.vacancies.ru.my_vacancies) {
      await vs1(bot, chat_id, lang)
    }
    if (exist_vacancy) {
      if ((exist_vacancy.step >= 0) && (text === kb.user.back.uz || text === kb.user.back.ru)) {
        await updateVacancy({_id: exist_vacancy._id}, {step: 12, attempt: 11, isMistake: true})
        await vs0(bot, chat_id, lang)
      }
    }

    // switch (text) {
    //   case "Vakansiya joylash":
    //     new_vacancy = await makeVacancy(chat_id)
    //     if (new_vacancy) {
    //       vacancy_id = new_vacancy._id
    //       await vs3(bot, chat_id, lang)
    //     }
    //     new_vacancy = null
    //     break
    //   case 'Добавить вакансию':
    //     new_vacancy = await makeVacancy(chat_id)
    //
    //     if (new_vacancy) {
    //       vacancy_id = new_vacancy._id
    //       await vs3(bot, chat_id, lang)
    //     }
    //     break
    // }

    if (text === "Vakansiya joylash" || text === 'Добавить вакансию') {
      new_vacancy = await makeVacancy(chat_id)

      if (new_vacancy) {
        vacancy_id = new_vacancy._id
        await vs3(bot, chat_id, lang)
      }
      delete new_vacancy
    }

    const vacancy = await getVacancy({
      _id: vacancy_id,
      author: chat_id,
      isCompleted: false,
      isApproved: false,
      isMistake: false
    })
      ? await getVacancy({_id: vacancy_id, author: chat_id, isCompleted: false, isApproved: false, isMistake: false})
      : (await getVacancies({author: chat_id, isCompleted: false, isApproved: false, isMistake: false}))[0]

    if (exist_vacancy && vacancy) {
      if (vacancy.isMistake === false) {

        if (vacancy.step === 0) {
          await updateVacancy({_id: vacancy._id}, {title: text, step: 1})
          await vs4(bot, chat_id, lang)
        }

        // if (vacancy.attempt === 0 && (text === kb.user.other.uz || text === kb.user.other.ru)) {
        //   await updateVacancy({_id: vacancy._id}, {attempt: 1})
        //   await vs5(bot, chat_id, lang)
        // }
        //
        // if (vacancy.attempt === 1) {
        //   await updateVacancy({_id: vacancy._id}, {route: text, step: 2, attempt: 2})
        //   const route = await getRoute({name: text})
        //   if (!route) await makeRoute({title: text})
        //   await vs6(bot, chat_id, lang)
        // }

        if (vacancy.step === 1 && vacancy.attempt === 0 && !(text === kb.user.other.uz || text === kb.user.other.ru)) {
          await updateVacancy({_id: vacancy._id}, {route: text, step: 2, attempt: 3})
          const route = await getRoute({name: text})
          if (!route) await makeRoute({title: text})
          await vs6(bot, chat_id, lang)
        }

        if (vacancy.step === 2) {
          await updateVacancy({_id: vacancy._id}, {level: text, step: 3})
          await vs7(bot, chat_id, lang, text)
        }

        if (vacancy.type === kb.user.search.uz.getJob || vacancy.type === kb.user.search.uz.getJob) {

          if (vacancy.step === 3 && (text === kb.user.work.uz.office || text === kb.user.work.ru.office)) {
            await updateVacancy({_id: vacancy._id}, {work_type: text, attempt: 4})
            await vs8(bot, chat_id, lang)
          }
          if (vacancy.step === 3 && (text === kb.user.work.uz.home || text === kb.user.work.ru.home)) {
            await updateVacancy({_id: vacancy._id}, {work_type: text, step: 4})
            await vs10(bot, chat_id, lang)
          }
          if (vacancy.step === 3 && vacancy.attempt === 4) {
            await updateVacancy({_id: vacancy._id}, {location: text, step: 4})
            await vs10(bot, chat_id, lang)
          }

          if (vacancy.step === 4 && (
            text === kb.user.currency.uzs ||
            text === kb.user.currency.usd ||
            text === kb.user.currency.euro ||
            text === kb.user.currency.rub
          )) {
            await updateVacancy({_id: vacancy._id}, {currency: text, attempt: 5})
            await vs11(bot, chat_id, lang)
          }
          if (vacancy.step === 4 && vacancy.attempt === 5) {
            await updateVacancy({_id: vacancy._id}, {salary: text, step: 5})
            await vs12(bot, chat_id, lang)
          }
          if (vacancy.step === 4 && (text === kb.user.conversation.uz || text === kb.user.conversation.ru)) {
            await updateVacancy({_id: vacancy._id}, {currency: text, step: 5, attempt: 5})
            await vs12(bot, chat_id, lang)
          }
          if (vacancy.step === 5 && vacancy.attempt === 5) {
            await updateVacancy({_id: vacancy._id}, {attempt: 6})
            await vs13(bot, chat_id, username, lang, text)
          }
          if (vacancy.step === 5 && vacancy.attempt === 6) {
            let filter

            if (type === kb.user.connection_type.uz.number || type === kb.user.connection_type.ru.number) {
              filter = {telephone_number: text, attempt: 7}
            } else if (type === kb.user.connection_type.uz.email || type === kb.user.connection_type.ru.email) {
              filter = {email: text, attempt: 7}
            } else if (type === kb.user.connection_type.uz.username || type === kb.user.connection_type.ru.username) {
              filter = {username: username, attempt: 7}
            } else if (type === kb.user.connection_type.uz.url || type === kb.user.connection_type.ru.url) {
              filter = {url: text, attempt: 7}
            }
            await updateVacancy({_id: vacancy._id}, filter)
            await vs14(bot, chat_id, lang)
          }
          if (vacancy.step === 5 && vacancy.attempt === 7) {
            if (text === kb.user.allow.uz.yes || text === kb.user.allow.ru.yes) {
              await updateVacancy({_id: vacancy._id}, {currency: text, step: 5, attempt: 5})
              await vs12(bot, chat_id, lang)
            } else if (text === kb.user.allow.uz.no || text === kb.user.allow.ru.no) {
              await updateVacancy({_id: vacancy._id}, {step: 6})
              await vs15(bot, chat_id, lang)
            }
          }
          if (vacancy.step === 6) {
            await updateVacancy({_id: vacancy._id}, {work_time: text, step: 7})
            await vs17(bot, chat_id, lang)
          }
          if (vacancy.step === 7) {
            await updateVacancy({_id: vacancy._id}, {requirements: text, step: 8, isCompleted: true})
            await vs19(bot, chat_id, lang)
          }
        }

        if (vacancy.type === kb.user.search.uz.giveJob || vacancy.type === kb.user.search.ru.giveJob) {
          if (vacancy.step === 3 && (text === kb.user.work.uz.home || text === kb.user.work.ru.home)) {
            await updateVacancy({_id: vacancy._id}, {work_type: text, step: 4})
            await vs9(bot, chat_id, lang, text)
          } else if (vacancy.step === 3 && (text === kb.user.work.uz.office || text === kb.user.work.ru.office)) {
            await updateVacancy({_id: vacancy._id}, {work_type: text, attempt: 4})
            await vs8(bot, chat_id, lang)
          }

          if (vacancy.step === 3 && vacancy.attempt === 4) {
            await updateVacancy({_id: vacancy._id}, {location: text, step: 4})
            await vs9(bot, chat_id, lang)
          }

          if (vacancy.step === 4) {
            await updateVacancy({_id: vacancy._id}, {company: text, step: 5})
            const company = await getCompany({name: text})
            if (!company) await makeCompany(vacancy.author, {name: text})
            await vs10(bot, chat_id, lang)
          }


          if (vacancy.step === 5 && (
            text === kb.user.currency.uzs ||
            text === kb.user.currency.usd ||
            text === kb.user.currency.euro ||
            text === kb.user.currency.rub
          )) {
            await updateVacancy({_id: vacancy._id}, {currency: text, attempt: 5})
            await vs11(bot, chat_id, lang)
          }
          if (vacancy.step === 5 && vacancy.attempt === 5) {
            await updateVacancy({_id: vacancy._id}, {salary: text, step: 6})
            await vs12(bot, chat_id, lang)
          }
          if (vacancy.step === 5 && (text === kb.user.conversation.uz || text === kb.user.conversation.ru)) {
            await updateVacancy({_id: vacancy._id}, {currency: text, step: 6, attempt: 5})
            await vs12(bot, chat_id, lang)
          }
          if (vacancy.step === 6 && vacancy.attempt === 5) {
            await updateVacancy({_id: vacancy._id}, {attempt: 6})
            await vs13(bot, chat_id, username, lang, text)
          }
          if (vacancy.step === 6 && vacancy.attempt === 6) {
            let filter

            if (type === kb.user.connection_type.uz.number || type === kb.user.connection_type.ru.number) {
              filter = {telephone_number: text, attempt: 7}
            } else if (type === kb.user.connection_type.uz.email || type === kb.user.connection_type.ru.email) {
              filter = {email: text, attempt: 7}
            } else if (type === kb.user.connection_type.uz.username || type === kb.user.connection_type.ru.username) {
              filter = {username: username, attempt: 7}
            } else if (type === kb.user.connection_type.uz.url || type === kb.user.connection_type.ru.url) {
              filter = {url: text, attempt: 7}
            }
            await updateVacancy({_id: vacancy._id}, filter)
            await vs14(bot, chat_id, lang)
          }
          if (vacancy.step === 6 && vacancy.attempt === 7) {
            if (text === kb.user.allow.uz.yes || text === kb.user.allow.ru.yes) {
              await updateVacancy({_id: vacancy._id}, {currency: text, attempt: 5})
              await vs12(bot, chat_id, lang)
            } else if (text === kb.user.allow.uz.no || text === kb.user.allow.ru.no) {
              await updateVacancy({_id: vacancy._id}, {step: 7})
              await vs15(bot, chat_id, lang)
            }
          }
          if (vacancy.step === 7) {
            await updateVacancy({_id: vacancy._id}, {work_time: text, step: 8})
            await vs16(bot, chat_id, lang)
          }
          if (vacancy.step === 8) {
            await updateVacancy({_id: vacancy._id}, {tasks: text, step: 9})
            await vs17(bot, chat_id, lang)
          }
          if (vacancy.step === 9) {
            await updateVacancy({_id: vacancy._id}, {requirements: text, step: 10})
            await vs18(bot, chat_id, lang)
          }
          if (vacancy.step === 10) {
            await updateVacancy({_id: vacancy._id}, {offers: text, step: 11})
            await vs19(bot, vacancy, name, lang, text)
          }
          if (vacancy.step === 11) {
            if (text === kb.user.confirmation.uz || text === kb.user.confirmation.ru) {
              await updateVacancy({_id: vacancy._id}, {step: 12, isCompleted: true})
              await vs20(bot, chat_id, lang)
            } else if (text === kb.user.not_to_confirm.uz || text === kb.user.not_to_confirm.ru) {
              await updateVacancy({_id: vacancy._id}, {step: 12, isMistake: true})
              const word = (lang === kb.language.uz) ? 'Boshidan vakansiya bering' : 'Дайте вакансию с самого начала'
              await bot.sendMessage(chat_id, word)
              await vs0(bot, chat_id, lang)
            }
          }
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports = {vacancy}
