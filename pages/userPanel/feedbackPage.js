const {getAllFeedback, getOneFeedback, makeFeedback, updateFeedback, countFeedback} = require('../../controllers/feedbackController')
const {getUser} = require('../../controllers/userController')
const kb = require('../../helpers/keyboard-buttons')
const keyboard = require('../../helpers/keyboard')

let feedback_id

const fs0 = async (bot, chat_id, lang) => {
  if (lang === kb.language.uz) {
    await bot.sendMessage(chat_id, "Fikrlar bo'limida nima qilamiz", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.feedback.uz
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(chat_id, "Что мы делаем в разделе комментариев", {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.feedback.ru
      }
    })
  }
}

const fs1 = async (bot, chat_id, lang) => {
  const new_feedback = await makeFeedback(chat_id)
  feedback_id = new_feedback._id

  if (lang === kb.language.uz) {
    await bot.sendMessage(chat_id, `Fikringiz nima haqida ekanini yozing yozib qoldiring`, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.uz
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(chat_id, 'Напишите, что вы думаете об этом', {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.ru
      }
    })
  }
}

const fs2 = async (bot, feedback, lang, text) => {
  // await updateFeedback({_id: feedback._id}, {title: text, step: 2})

  const e_feedback = await getOneFeedback({_id: feedback._id})

  e_feedback.title = text
  e_feedback.step = 2
  await e_feedback.save()

  if (lang === kb.language.uz) {
    await bot.sendMessage(feedback.author, `Endi shu ${e_feedback.title} haqida fikringizni yozing`, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.uz
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(feedback.author, `Теперь напишите свое мнение об этом ${e_feedback.title}`, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.back.ru
      }
    })
  }
}

const fs3 = async (bot, feedback, lang, text) => {
  // await updateFeedback({_id: feedback._id}, {description: text, step: 3, isCompleted: true})
  const e_feedback = await getOneFeedback({_id: feedback._id})

  e_feedback.description = text
  e_feedback.step = 3
  e_feedback.isCompleted = true
  await e_feedback.save()

  if (lang === kb.language.uz) {
    await bot.sendMessage(feedback.author, `${e_feedback.title} haqidagi fikringiz muvaffaqiyatli qoldirildi`, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.feedback.uz
      }
    })
  } else if (lang === kb.language.ru) {
    await bot.sendMessage(feedback.author, `Ваш отзыв по ${e_feedback.title} успешно оставлен`, {
      reply_markup: {
        resize_keyboard: true,
        keyboard: keyboard.user.feedback.ru
      }
    })
  }
}

const fs4 = async (bot, id, lang) => {
  let text
  const
    feedback = await getAllFeedback({author: id}),
    count = await countFeedback({author: id}),
    author = await getUser({telegram_id: id}),
    completed = await countFeedback({author: id, isCompleted: true, isMistake: false}),
    mistake = await countFeedback({author: id, isCompleted: false, isMistake: true})

  if (count > 0) {
    feedback.map(async item => {
      const word = `
        avtor: ${author.name}
        title: ${item.title}
        description: ${item.description}
      `
      await bot.sendMessage(id, word)
    })

    text = (lang === kb.language.uz)
      ? `${author.name} siz umumiy ${count} fikr qoldirgansiz.
        ${completed} tugallangan fikrlaringiz soni
        ${mistake} xato fikrlaringiz soni`
      : `${author.name} Вы предоставили всего ${count} коментарии.
        ${completed} количество закрытых коментарии
        ${mistake} количество ошибочных коментарии`

  } else if (count === 0) {
    text = (lang === kb.language.uz) ? "Hozircha siz fikr qoldirmagansiz" : "Пока вы не прокомментировали"
  }

  await bot.sendMessage(id, text)
}

const fs5 = async (bot, feedback, lang) => {
  await updateFeedback({_id: feedback._id}, {step: 4, isMistake: true})
  await fs0(bot, feedback.author, lang)
}

const feedback = async (bot, chat_id, name, lang, text) => {

  const feedback = await getOneFeedback({_id: feedback_id, author: chat_id, isCompleted: false, isMistake: false})
  ? await getOneFeedback({_id: feedback_id, author: chat_id, isCompleted: false, isMistake: false})
    : (await getAllFeedback({author: chat_id, isCompleted: false, isMistake: false}))[0]

  try {
    if (feedback) {
      if (feedback.step === 1 && !(text === kb.user.back.uz || text === kb.user.back.ru)) {
        await fs2(bot, feedback, lang, text)
      } else if (feedback.step === 2 && !(text === kb.user.back.uz || text === kb.user.back.ru)) {
        await fs3(bot, feedback, lang, text)
      } else if (feedback.step >= 0 && (text === kb.user.back.uz || text === kb.user.back.ru)) {
        await fs5(bot, feedback, lang)
      }
    }

    if (text === kb.user.pages.uz.feedback || text === kb.user.pages.ru.feedback) {
      await fs0(bot, chat_id, lang)
    } else if (text === kb.user.feedback.uz.add || text === kb.user.feedback.ru.add) {
      await fs1(bot, chat_id, lang)
    } else if (text === kb.user.feedback.uz.my_feedback || text === kb.user.feedback.ru.my_feedback) {
      await fs4(bot, chat_id, lang)
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports = {feedback}
