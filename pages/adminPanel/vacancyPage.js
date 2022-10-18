const {getVacancies, getVacancy, countVacancies} = require('./../../controllers/vacansyController')
const {getUser} = require('./../../controllers/userController')
const {updateRoute} = require('./../../controllers/routeController')
const {updateLevel} = require('./../../controllers/levelController')
const {getCompany} = require('./../../controllers/companyController')
const kb = require('./../../helpers/keyboard-buttons')
const keyboard = require('./../../helpers/keyboard')

const avs0 = async (bot, chat_id) => {
  await bot.sendMessage(chat_id, "Vacancies bo'limi nima qilamiz", {
    reply_markup: {
      resize_keyboard: true,
      keyboard: keyboard.admin.vacancies
    }
  })
}

const avs1 = async (bot, chat_id) => {
  const nov = await countVacancies({})
  const noc = await countVacancies({isCompleted: true, isMistake: false})
  const noa = await countVacancies({isApproved: true, isCompleted: true, isMistake: false})
  const nona = await countVacancies({isApproved: false, isCompleted: true, isMistake: true})
  const nom = await countVacancies({isCompleted: false, isMistake: true, isApproved: false})

  const word = `
    Umumiy vakansiyalar soni - ${nov}
    Tugallangan vakansiyalar soni - ${noc}
    Tasdiqlangan vakansiyalar soni - ${noa}
    Tasdiqlanmagan vakansiyalar soni - ${nona}
    Xato vakansiyalar soni - ${nom}
  `

  await bot.sendMessage(chat_id, word)
}

const avs2 = async (bot, chat_id) => {
  const query = {isApproved: false, isCompleted: true, isMistake: false}
  const vacancies = await getVacancies(query), allVacancies = await countVacancies(query)

  if (allVacancies > 0) {
    vacancies.map(async vacancy => {
      const author = await getUser({telegram_id: vacancy.author})
      const word = (vacancy.type === kb.user.search.uz.getJob || vacancy.type === kb.user.search.ru.getJob)
        ? `
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
    ` : `
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
    `

      await bot.sendMessage(chat_id, word, {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: kb.admin.confirmation,
                callback_data: JSON.stringify({
                  text: kb.admin.confirmation,
                  _id: vacancy._id
                })
              },
              {
                text: kb.admin.not_to_confirm,
                callback_data: JSON.stringify({
                  text: kb.admin.not_to_confirm,
                  _id: vacancy._id
                })
              }
            ]
          ]
        }
      })
    })
    await bot.sendMessage(chat_id, `${allVacancies} ta tasdiqlanishi kerak bo'lgan vakansiyani tasdiqlash kerak`)
  } else if (allVacancies === 0) {
    await bot.sendMessage(chat_id, "Hozircha tasdiqlanishi kerak bo'lgan vakansiyalar yo'q")
  }
}

const avs3 = async (bot, chat_id) => {
  const vacancies = await countVacancies({isApproved: false, isCompleted: false, isMistake: true})

  await bot.sendMessage(chat_id, `Xato vakansiyalar soni - ${vacancies}`)
}

const avs4 = async (bot, chat_id, data) => {
  const {text, _id} = JSON.parse(data), vacancy = await getVacancy({_id})

  if (vacancy) {
    if (text === kb.admin.confirmation) {
      vacancy.isApproved = true
      await updateRoute({title: vacancy.route}, { $inc: { total_developers: +1 } })
      await updateLevel({title: vacancy.level}, { $inc: { total_developers: +1 } })
      const company = await getCompany({name: vacancy.company})
      if (company) {
        company.vacancies.push(vacancy._id)
        company.total_vacancies += 1
        await company.save()
      }
    } else if (text === kb.admin.not_to_confirm) {
      vacancy.isMistake = true
    }
    await vacancy.save()
  }

  const word = (vacancy.isApproved) ? `Bu ${_id} dagi vakansiya tasdiqlandi` : `Bu ${_id} dagi vakansiya tasdiqlanmadi`

  await bot.sendMessage(chat_id, word)
}

const adminVacancy = async (bot, chat_id, text) => {
  try {
      if (text === kb.admin.pages.vacancies) {
        await avs0(bot, chat_id)
      }
      if (text === kb.admin.vacancies.number) {
        await avs1(bot, chat_id)
      }
      if (text === kb.admin.vacancies.confirmation) {
        await avs2(bot, chat_id)
      }
      if (text === kb.admin.vacancies.errorVacancies) {
        await avs3(bot, chat_id)
      }
  } catch (e) {
    console.log(e)
  }
}

module.exports = {adminVacancy, avs4}
