const {mainPage} = require('./mainPage')
const {register} = require('./register')
const {settings} = require('./settingsPage')
const {reports} = require('./reportPage')
const {feedback} = require('./feedbackPage')
const {vacancy} = require('./vacanyPage')
const {work} = require('./botsWorkPage')
const {conditions} = require('./conditionsPage')
const {company} = require('./companyPage')
const {getUser, updateUser, makeUser} = require('./../../controllers/userController')
const kb = require('./../../helpers/keyboard-buttons')
const keyboard = require('./../../helpers/keyboard')

let lang

const userPanel = async (bot, message) => {
  let text
  const telegram_id = message.from.id, first_name = message.from.first_name, username = message.from.username

  text = message.contact ? message.contact.phone_number : message.text

  if (text === kb.language.uz || text === kb.language.ru) await updateUser({telegram_id}, {lang: text})

  const user = await getUser({telegram_id})

  if (!user && text === kb.start) {
    await makeUser({telegram_id})

    await bot.sendMessage(telegram_id, `Bo'timizga xush kelibsiz ${first_name}. Tilni tanlang \n Добро пожаловать ${first_name}. Выберите язык`, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.language
      }
    })
  }

  if (user) {
    lang = user.lang

    if (user.step < 3) {
      await register(bot, user, telegram_id, lang, text)
    }

    if (user.isCompleted && user.step >= 3) {
      const name = user.name

      await settings(bot, user, lang, text)
      await reports(bot, telegram_id, lang, text)
      await conditions(bot, telegram_id, lang, text)
      await work(bot, telegram_id, lang, text)
      await company(bot, telegram_id, lang, text)

      // if (user.type === kb.user.search.uz.giveJob || user.type === kb.user.search.ru.giveJob) {
      //   await company(bot, telegram_id, lang, text)
      // } else if ((user.type === kb.user.search.uz.getJob || user.type === kb.user.search.ru.getJob) &&
      //   (text === kb.user.pages.uz.company || text === kb.user.pages.ru.company)) {
      //   const word = (lang === kb.language.uz)
      //     ? `Eslatib o'tamiz bu bo'limga kirishingiz uchun sizning tipingiz ${kb.user.search.uz.giveJob} bo'lishi kerak`
      //     : `Обратите внимание, что для доступа к этому разделу ваш тип должен быть ${kb.user.search.ru.giveJob}`
      //   await bot.sendMessage(telegram_id, word)
      // }

      if (user.isAllowed) {
        await feedback(bot, telegram_id, name, lang, text)
        await vacancy(bot, telegram_id, username, name, lang, text)
      } else if (!user.isAllowed) {
        const word = (lang === kb.language.uz) ? "Botni ishlatish shartlariga rozi bo'ling" : "Согласитесь с условиями использования бота."
        await bot.sendMessage(telegram_id, word)
      }

      if (text === kb.user.pages.uz.author || text === kb.user.pages.ru.author) {
        const link = (lang === kb.language.uz)
          ? `<a href="https://t.me/Nyunusov1">Telegram botlarga buyurtma berish uchun shu manzila murojaat qilishingiz mumkun.</a>`
          : `<a href="https://t.me/Nyunusov1">По этому адресу вы можете подать заявку на заказ Telegram ботов.</a>`

        await bot.sendMessage(telegram_id, link, {parse_mode: 'HTML'})
      }

      if (text === kb.main.uz || text === kb.main.ru || text === kb.start) {
        await mainPage(bot, telegram_id, name, lang)
      }
    }
  }
}

module.exports = {userPanel}
