const fs = require('fs')
const forEach = require('lodash')

module.exports = {
  name: 'help',
  description: 'Provides commands list',
  execute(message, embed) {
    const files = fs.readdirSync('./src/services').filter(file => file.endsWith('.js'))

    let str = ''
    for (const file of files) {
      const command = require(`./${file}`)
      str += `Command: ${command.name} \nDescription: ${command.description} \n\n`
    }
    console.log(message.channel)
    try {
      embed.setTitle('NigBot Commands')
      embed.setDescription(str)
      embed.setColor('#008000')
      return message.channel.send(embed)
    } catch (err) {
      return message.channel.send('something went wrong in Help!')
    }
  },
}
