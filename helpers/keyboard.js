const kb = require('./keyboard-buttons')

module.exports = {
  language: [
    [kb.language.uz, kb.language.ru]
  ],
  user: {
    pages: {
      uz: [
        [kb.user.pages.uz.settings, kb.user.pages.uz.feedback],
        [kb.user.pages.uz.vacancies, kb.user.pages.uz.company],
        [kb.user.pages.uz.bots_work, kb.user.pages.uz.author],
        // [kb.user.pages.uz.report, kb.user.pages.uz.conditions]
      ],

      ru: [
        [kb.user.pages.ru.settings, kb.user.pages.ru.feedback],
        [kb.user.pages.ru.vacancies, kb.user.pages.ru.company],
        [kb.user.pages.ru.bots_work, kb.user.pages.ru.author],
        // [kb.user.pages.ru.report, kb.user.pages.ru.conditions]
      ]
    },

    vacancies: {
      uz: [
        [kb.user.vacancies.uz.add],
        [kb.user.vacancies.uz.my_vacancies],
        [kb.main.uz]
      ],

      ru: [
        [kb.user.vacancies.ru.add],
        [kb.user.vacancies.ru.my_vacancies],
        [kb.main.ru]
      ]
    },

    feedback: {
      uz: [
        [kb.user.feedback.uz.add],
        [kb.user.feedback.uz.my_feedback],
        [kb.main.uz]
      ],

      ru: [
        [kb.user.feedback.ru.add],
        [kb.user.feedback.ru.my_feedback],
        [kb.main.ru]
      ]
    },

    settings: {
      uz: [
        [kb.user.settings.uz.name, kb.user.settings.uz.number],
        [kb.user.settings.uz.type, kb.user.settings.uz.language],
        [kb.main.uz]
      ],

      ru: [
        [kb.user.settings.ru.name, kb.user.settings.ru.number],
        [kb.user.settings.ru.type, kb.user.settings.ru.language],
        [kb.main.ru]
      ]
    },

    company: {
      uz: [
        [kb.user.company.uz.my_companies],
        [kb.main.uz]
      ],

      ru: [
        [kb.user.company.ru.my_companies],
        [kb.main.ru]
      ]
    },

    company_settings: {
      uz: [
        [kb.user.company_settings.uz.name],
        [kb.user.company_settings.uz.location],
        [kb.user.company_settings.uz.description],
        [kb.user.back.uz]
      ],

      ru: [
        [kb.user.company_settings.ru.name],
        [kb.user.company_settings.ru.location],
        [kb.user.company_settings.ru.description],
        [kb.user.back.ru]
      ]
    },

    allow: {
      uz: [
        [kb.user.allow.uz.yes], [kb.user.allow.uz.no]
      ],

      ru: [
        [kb.user.allow.ru.yes], [kb.user.allow.ru.no]
      ]
    },

    condition: {
      uz: [
        [kb.user.condition.uz.true],
        [kb.user.condition.uz.false]
      ],

      ru: [
        [kb.user.condition.ru.true],
        [kb.user.condition.ru.false]
      ]
    },

    search: {
      uz: [
        [kb.user.search.uz.getJob, kb.user.search.uz.giveJob]
      ],

      ru: [
        [kb.user.search.ru.getJob, kb.user.search.ru.giveJob]
      ],
    },

    work: {
      uz: [
        [kb.user.work.uz.home, kb.user.work.uz.office]
      ],

      ru: [
        [kb.user.work.ru.home, kb.user.work.ru.office]
      ],
    },

    currency: {
      uz: [
        [kb.user.currency.uzs, kb.user.currency.usd],
        [kb.user.conversation.uz]
      ],

      ru: [
        [kb.user.currency.uzs, kb.user.currency.usd],
        [kb.user.conversation.ru]
      ],
    },

    connection_type: {
      uz: [
        [kb.user.connection_type.uz.number, kb.user.connection_type.uz.email],
        [kb.user.connection_type.uz.url, kb.user.connection_type.uz.username]
      ],

      ru: [
        [kb.user.connection_type.ru.number, kb.user.connection_type.ru.email],
        [kb.user.connection_type.ru.url, kb.user.connection_type.ru.username]
      ],
    },

    back: {
      uz: [[kb.user.back.uz]],
      ru: [[kb.user.back.ru]],
    },

    confirmation: {
      uz: [[kb.user.confirmation.uz, kb.user.not_to_confirm.uz]],
      ru: [[kb.user.confirmation.ru, kb.user.not_to_confirm.ru]]
    }

  },

  main: {
    uz: [[kb.main.uz]],
    ru: [[kb.main.ru]]
  },

  start: [[kb.start]],

  admin: {
    pages: [
      [kb.admin.pages.settings, kb.admin.pages.vacancies],
      [kb.admin.pages.users, kb.admin.pages.advertising],
      [kb.admin.pages.feedback]
    ],
    settings: [
      [kb.admin.settings.name, kb.admin.settings.number, kb.admin.settings.username],
      [kb.main.uz]
    ],
    vacancies: [
      [kb.admin.vacancies.number],
      [kb.admin.vacancies.confirmation],
      [kb.admin.vacancies.errorVacancies],
      [kb.main.uz]
    ],
    advertising: [
      [kb.admin.advertising.number],
      [kb.admin.advertising.add],
      [kb.admin.advertising.all],
      [kb.main.uz]
    ],
    users: [
      [kb.admin.users.number],
      [kb.main.uz]
    ],
    feedback: [
      [kb.admin.feedback.number],
      [kb.main.uz]
    ],
    confirmation_advertising: [
      [kb.admin.confirmation_advertising, kb.admin.not_to_confirmation_advertising]
    ]
  }
}
