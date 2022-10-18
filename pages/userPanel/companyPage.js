const Company = require('./../../models/companyModel')
const Vacancy = require('./../../models/vacansyModel')
const {getCompanies, getOwnerOneCompany, getCompany, updateCompany, countCompanies} = require('../../controllers/companyController')
const {getVacancies, updateManyVacancies} = require('../../controllers/vacansyController')
const {getUser} = require('../../controllers/userController')
const kb = require('../../helpers/keyboard-buttons')
const keyboard = require('../../helpers/keyboard')

let type

const cs0 = async (bot, chat_id, lang) => {
  if (lang === kb.language.uz) {
    await bot.sendMessage(chat_id, "Kompaniyalar bo'limida nima qilamiz", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.company.uz
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(chat_id, "Что мы делаем в разделе компании", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.company.ru
      }
    })
  }
}

const cs1 = async (bot, chat_id, lang) => {
  let text
  const
    companies = await getCompanies({owner: chat_id}),
    count = await countCompanies({owner: chat_id}),
    author = await getUser({telegram_id: chat_id})

  if (count > 0) {
    companies.map(async company => {
      const word = `
        owner: ${author.name}\n
        name: ${company.name}
        location: ${company.location}
        description: ${company.description}
      `

      if (lang === kb.language.uz) {
        await bot.sendMessage(chat_id, word, {
          reply_markup: {
            inline_keyboard: [
              [{
                text: kb.user.change.uz,
                callback_data: JSON.stringify({
                  text: kb.user.change.uz,
                  _id: company._id
                })
              }]
            ]
          }
        })
      } else if (lang === kb.language.ru) {
        await bot.sendMessage(chat_id, word, {
          reply_markup: {
            inline_keyboard: [
              [{
                text: kb.user.change.ru,
                callback_data: JSON.stringify({
                  text: kb.user.change.ru,
                  _id: company._id
                })
              }]
            ]
          }
        })
      }

    })

    text = (lang === kb.language.uz)
      ? `${author.name} Hozir sizda ${count} kompaniya bor`
      : `${author.name} у вас всего ${count} компании`

  } else if (count === 0) {
    text = (lang === kb.language.uz) ? "Hozircha sizning kompaniyangiz yo'q" : "У вас еще нет компании"
  }

  await bot.sendMessage(chat_id, text)
}

const cs2 = async (bot, chat_id, data) => {
  const {text, _id} = JSON.parse(data), company = await getCompany({_id})

  if (company) {
    company.step = 1
    company.isEditing = true
    company.updatedAt = Date.now()
    if (text === kb.user.change.uz) {
      await bot.sendMessage(chat_id, "Nimani o'zgartiramiz", {
        reply_markup: {
          resize_keyboard: true,
          keyboard: keyboard.user.company_settings.uz
        }
      })
    } else if (text === kb.user.change.ru) {
      await bot.sendMessage(chat_id, "Что мы будем менять", {
        reply_markup: {
          resize_keyboard: true,
          keyboard: keyboard.user.company_settings.ru
        }
      })
    }
    await company.save()
  }
}

const cs3 = async (bot, company, lang) => {
  await updateCompany({_id: company._id}, {step: 2})

  if (lang === kb.language.uz) {
    await bot.sendMessage(company.owner, "O'zgartirmoqchi bo'lgan nomni kiriting", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.uz
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(company.owner, "Введите название, которое хотите изменить", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.ru
      }
    })
  }
}

const cs4 = async (bot, company, lang, text) => {
  await updateManyVacancies({company: company.name}, {company: text})

  await updateCompany({_id: company._id}, {name: text, step: 1})

  if (lang === kb.language.uz) {
    await bot.sendMessage(company.owner, "Kompaniya nomi muvaffaqiyatli o'zgartirildi", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.company_settings.uz,
        one_time_keyboard: true
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(company.owner, "Название компании успешно изменен", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.company_settings.ru,
        one_time_keyboard: true
      }
    })
  }
}

const cs5 = async (bot, company, lang) => {
  await updateCompany({_id: company._id}, {step: 2})

  if (lang === kb.language.uz) {
    await bot.sendMessage(company.owner, "O'zgartirmoqchi bo'lgan manzilni kiriting", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.uz
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(company.owner, "Введите адрес, которое хотите изменить", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.ru
      }
    })
  }

}

const cs6 = async (bot, company, lang, text) => {
  await updateCompany({_id: company._id}, {location: text, step: 1})

  if (lang === kb.language.uz) {
    await bot.sendMessage(company.owner, "Kompaniya manzili muvaffaqiyatli o'zgartirildi", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.company_settings.uz,
        one_time_keyboard: true
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(company.owner, "Адрес компании успешно изменен", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.company_settings.ru,
        one_time_keyboard: true
      }
    })
  }
}

const cs7 = async (bot, company, lang) => {
  await updateCompany({_id: company._id}, {step: 2})

  if (lang === kb.language.uz) {
    await bot.sendMessage(company.owner, "O'zgartirmoqchi bo'lgan tavsifni kiriting", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.uz
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(company.owner, "Введите описание, которое хотите изменить", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.ru
      }
    })
  }
}

const cs8 = async (bot, company, lang, text) => {
  await updateCompany({_id: company._id}, {description: text, step: 1})

  if (lang === kb.language.uz) {
    await bot.sendMessage(company.owner, "Kompaniya tavsifni muvaffaqiyatli o'zgartirildi", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.company_settings.uz,
        one_time_keyboard: true
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(company.owner, "Описание компании успешно изменен", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.company_settings.ru,
        one_time_keyboard: true
      }
    })
  }
}


const company = async (bot, chat_id, lang, text) => {
  const company = (await Company.find({owner: chat_id, isEditing: true}).sort({updatedAt: -1}))[0]

  try {
    if (text === kb.user.pages.uz.company || text === kb.user.pages.ru.company) {
      await cs0(bot, chat_id, lang)
    } else if (text === kb.user.company.uz.my_companies || text === kb.user.company.ru.my_companies) {
      await cs1(bot, chat_id, lang)
    } else if (company) {
      if ((company.step === 1 || company.step === 2) && (text === kb.user.back.uz || text === kb.user.back.ru)) {
        await updateCompany({_id: company._id}, {step: 0, isEditing: false})
        await cs0(bot, chat_id, lang)
      }
    }

    const e_company = (await Company.find({owner: chat_id, isEditing: true}).sort({updatedAt: -1}))[0]

    if (e_company) {
      if (e_company.step === 1) {
        if (text === kb.user.company_settings.uz.name || text === kb.user.company_settings.ru.name) {
          await cs3(bot, e_company, lang)
        } else if (text === kb.user.company_settings.uz.location || text === kb.user.company_settings.ru.location) {
          await cs5(bot, e_company, lang)
        } else if (text === kb.user.company_settings.uz.description || text === kb.user.company_settings.ru.description) {
          await cs7(bot, e_company, lang)
        }
        type = text
      } else if (e_company.step === 2) {
        if (type === kb.user.company_settings.uz.name || type === kb.user.settings.ru.name) {
          await cs4(bot, e_company, lang, text)
        } else if (type === kb.user.company_settings.uz.location || type === kb.user.company_settings.ru.location) {
          await cs6(bot, e_company, lang, text)
        } else if (type === kb.user.company_settings.uz.description || type === kb.user.company_settings.ru.description) {
          await cs8(bot, e_company, lang, text)
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports = {company, cs2}
