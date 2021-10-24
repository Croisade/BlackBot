// const axios = require('axios')
import axios from 'axios'

require('dotenv').config()

const fs = require('fs')

module.exports = {
  name: 'weather',
  description: 'Provides commands list',
  async execute(message, embed) {
    const args = message.content.split(' ')
    console.log(args)
    const zipCode = args[1]
    const countryCode = 'US'
    const instance = axios.create()
    try {
      const data = await instance({
        // `url` is the server URL that will be used for the request
        url: `/data/2.5/weather?zip=${zipCode},${countryCode}&appid=${process.env.WEATHERAPIKEY}`,

        // `method` is the request method to be used when making the request
        method: 'get',
        baseURL: 'api.openweathermap.org',
        timeout: 1000,
      })
      return message.channel.send(JSON.stringify(data))
    } catch (e) {
      return message.channel.send('Error Message Test!')
    }
  },
}
