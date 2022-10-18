const {readFile} = require('fs/promises')
const sharp = require("sharp");
const {getVacancy, updateVacancy} = require('./../../controllers/vacansyController')
const kb = require('./../../helpers/keyboard-buttons')
const png = require('png-js');


const addTextOnImage = async (bot, _id) => {
  let title, work_type, company_name, price, photo
  const width = 1280, height = 886

  const data = await readFile('./../../images/ios.png');

  console.log(data)

  // photo = new png()
  photo = png.load('./../../images/ios.png')
  console.log(photo)

  const vacancy = await getVacancy({_id})

  try {
    if (vacancy && vacancy.isApproved) {
      if (vacancy.title) title = vacancy.title

      if (vacancy.work_type) work_type = vacancy.work_type

      if (vacancy.company) company_name = vacancy.company

      if (vacancy.currency) {
        if (
          vacancy.currency === kb.user.currency.uzs ||
          vacancy.currency === kb.user.currency.rub ||
          vacancy.currency === kb.user.currency.usd ||
          vacancy.currency === kb.user.currency.euro
        )
          price = `${vacancy.salary}`


        if (vacancy.currency === kb.user.conversation.uz || vacancy.currency === kb.user.conversation.ru)
          price = vacancy.currency
      }
    }


    const svgImage = `
    <svg width="${width}" height="${height}">
      <style>
      .title { 
        width: 753px;
        height: 114px;
        left: 102px;
        top: 283px;
        font-family: 'Gilroy';
        font-style: normal;
        font-weight: 900;
        font-size: 90px;
        line-height: 114px;
        color: #000000;
      }
      
      .work_type { 
        width: 67px;
        height: 39px;
        left: 165px;
        top: 421px;
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 500;
        font-size: 32.212px;
        line-height: 39px;
        color: rgba(0, 0, 0, 0.5);
      }
      
      .company_name { 
        width: 426px;
        height: 39px;
        left: 165px;
        top: 497px;
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 500;
        font-size: 32.212px;
        line-height: 39px;
        color: rgba(0, 0, 0, 0.5);
      }
      
      .price { 
        width: 190px;
        height: 59px;
        left: 102px;
        top: 584px;
        font-family: 'Montserrat';
        font-style: normal;
        font-weight: 600;
        font-size: 48.5976px;
        line-height: 59px;
        color: #34A853;
      }
      </style>
      
      <text class="title">${title}</text>
      <text class="work_type">${work_type}</text>
      <text class="company_name">${company_name}</text>
      <text class="price">${price}</text>
      
    </svg>
    `;
    const svgBuffer = Buffer.from(svgImage);
    const image = await sharp(photo).composite([{
          input: svgBuffer,
          top: 0,
          left: 0,
        }, ]).toFile('ios-bot.png');

    if (image) {
      await bot.sendPhoto(vacancy.author, image)
      // await updateVacancy({_id}, {isImaged: true})
      vacancy.isImaged = true
      await vacancy.save()
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {addTextOnImage}
