const {getCompany} = require('./../../controllers/companyController')
const {getAdmin} = require('./../../controllers/adminController')
const {getAllAdvertising, getOneAdvertising, makeAdvertising, updateAdvertising, countAdvertising} = require('./../../controllers/advertisingController')
const kb = require('./../../helpers/keyboard-buttons')
const keyboard = require('./../../helpers/keyboard')

let advertising_id

const aas0 = async (bot, chat_id) => {
  await bot.sendMessage(chat_id, "Rekmala bo'limida nima qilamiz", {
    reply_markup: {
      resize_keyboard: true,
      keyboard: keyboard.admin.advertising
    }
  })
}

const aas1 = async (bot, chat_id) => {
  const noa = await countAdvertising({})
  const noca = await countAdvertising({isCompleted: true, isMistake: false})
  const nonca = await countAdvertising({isCompleted: false, isMistake: true})

  const word = `
    Umumiy reklamalar soni - ${noa}
    Tugallangan reklamalar soni - ${noca}
    Xato reklamalar soni - ${nonca}
  `

  await bot.sendMessage(chat_id, word)
}

const aas2 = async (bot, chat_id) => {
  const advertising = await getAllAdvertising({isCompleted: true, isMistake: false, isApproved: false}),
    count = await countAdvertising({isCompleted: true, isMistake: false, isApproved: false}),
    author = await getAdmin({telegram_id: chat_id})

  advertising.map(async item => {
    const word = `
      author: ${author.name},
      title: ${item.title},
      description: ${item.description},
      company: ${item.company}
    `
    await bot.sendPhoto(chat_id, item.image, {caption: word})
  })

  await bot.sendMessage(chat_id, `Barcha reklamalar - ${count}`)
}

const aas3 = async (bot, chat_id, _id, text) => {
  await updateAdvertising({_id}, {image: text, step: 1})
  await bot.sendMessage(chat_id, "Reklamaning sarlavhasini kiriting", {
    reply_markup: {
      resize_keyboard: true,
      keyboard: keyboard.user.back.uz
    }
  })
}

const aas4 = async (bot, chat_id, _id, text) => {
  await updateAdvertising({_id}, {title: text, step: 2})

  await bot.sendMessage(chat_id, "Reklama tavsifini yozing", {
    reply_markup: {
      resize_keyboard: true,
      keyboard: keyboard.user.back.uz
    }
  })
}

const aas5 = async (bot, chat_id, _id, text) => {
  await updateAdvertising({_id}, {description: text, step: 3})

  await bot.sendMessage(chat_id, "Companyni kiriting", {
    reply_markup: {
      resize_keyboard: true,
      keyboard: keyboard.user.back.uz
    }
  })
}

const aas6 = async (bot, chat_id, advertising, text) => {
  await updateAdvertising({_id: advertising._id}, {company: text, step: 4}, 'company')

  const company = await getCompany({name: text})

  const word = `
            title: ${advertising.title},
            description: ${advertising.description},
            company: ${company.name},

            "Tugatilganini tasdiqlaysizmi ?"
          `

  await bot.sendPhoto(chat_id, advertising.image, {
    caption: word,
    reply_markup: {
      resize_keyboard: true,
      keyboard: keyboard.admin.confirmation_advertising
    }
  })
}

const aas7 = async (bot, chat_id, advertising, text) => {
  let word
  if (text === kb.admin.confirmation_advertising) {
    const company = await getCompany({name: advertising.company})
    company.advertising.push(advertising._id)
    company.total_advertising += 1
    await company.save()
    await updateAdvertising({_id: advertising._id}, {step: 5, isCompleted: true})
    word = "Reklama muvaffaqiyatli yakunlandi"
  }
  if (text === kb.admin.not_to_confirmation_advertising) {
    await updateAdvertising({_id: advertising._id}, {step: 6, isMistake: true})
    word = "Reklama muvaffaqiyatli yakunlanmadi"
  }

  await bot.sendMessage(chat_id, word, {
    reply_markup: {
      resize_keyboard: true,
      keyboard: keyboard.admin.pages
    }
  })
}

const adminAdvertising = async (bot, chat_id, text) => {

  const advertising = await getOneAdvertising({
    _id: advertising_id,
    isCompleted: false,
    isMistake: false,
    isApproved: false
  })
    ? await getOneAdvertising({_id: advertising_id, isCompleted: false, isMistake: false, isApproved: false})
    : (await getAllAdvertising({isCompleted: false, isMistake: false, isApproved: false}))[0]

  if (text === kb.admin.pages.advertising) {
    await aas0(bot, chat_id)
  }
  if (text === kb.admin.advertising.number) {
    await aas1(bot, chat_id)
  }
  if (text === kb.admin.advertising.all) {
    await aas2(bot, chat_id)
  }
  if (text === kb.admin.advertising.add) {
    const advertising = await makeAdvertising(chat_id)
    advertising_id = advertising._id

    await bot.sendMessage(chat_id, "Reklama joylashga hush kelibsiz")
    await bot.sendMessage(chat_id, "Reklamani rasmini jo'nating", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.uz
      }
    })
  }

  if (advertising) {
    if (advertising.step === 0) {
      await aas3(bot, chat_id, advertising._id, text)
    }
    if (advertising.step === 1) {
      await aas4(bot, chat_id, advertising._id, text)
    }
    if (advertising.step === 2) {
      await aas5(bot, chat_id, advertising._id, text)
    }
    if (advertising.step === 3) {
      await aas6(bot, chat_id, advertising, text)
    }
    if (advertising.step === 4) {
      await aas7(bot, chat_id, advertising, text)
    }
    if (text === kb.user.back.uz) {
      await updateAdvertising({_id: advertising._id}, {step: 6, isMistake: true})
      await aas0(bot, chat_id)
    }
  }
}

module.exports = {adminAdvertising}
