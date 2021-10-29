// const axios = require('axios')
import axios from 'axios'
import { kelvinToFahrenheit } from '../utils/weather'

require('dotenv').config()

module.exports = {
  name: 'weather',
  description: 'Provides commands list',
  async execute(message, embed) {
    const args = message.content.split(' ')
    const zipCode = args[1]
    const countryCode = 'US'

    try {
      const config = {
        url: `/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${process.env.WEATHERAPIKEY}`,
        method: 'get',
        baseURL: 'https://api.openweathermap.org',
        timeout: 1000,
      }

      const {
        data: {
          name,
          main: {
            temp,
            // eslint-disable-next-line babel/camelcase
            temp_max,
            // eslint-disable-next-line babel/camelcase
            feels_like,
            // eslint-disable-next-line babel/camelcase
            temp_min,
          },
        },
      } = await axios(config)
      const kToF = kelvinToFahrenheit(temp)
      const kToFMAX = kelvinToFahrenheit(temp_max)
      const kToFFeels = kelvinToFahrenheit(feels_like)
      const kToFLOW = kelvinToFahrenheit(temp_min)
      embed.setTitle(
        `<a:NigHype:738137933156057178>  Here is today's forecast for ${name}    <a:NigHype:738137933156057178> `,
      )
      embed.setDescription(
        `Town/City: ${name} \nCurrent Temperature: ${kToF}°F \nFeels Like: ${kToFFeels}°F \n:thermometer: High/Low: ${kToFMAX}°F/${kToFLOW}°F`,
      )
      embed.setColor('#008000')
      return message.channel.send(embed)
      // return message.channel.send(JSON.stringify(data))
    } catch (e) {
      return message.channel.send('error')
    }
  },
}
