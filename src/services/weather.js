// const axios = require('axios')
import axios from 'axios'

require('dotenv').config()

const fs = require('fs')

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

      const { data } = await axios(config)
      return message.channel.send(JSON.stringify(data))
    } catch (e) {
      return message.channel.send(e)
    }
  },
}
