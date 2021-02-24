import Client from '@/utils/client'
import forEach from 'lodash/forEach'

const fs = require('fs')

const Discord = require('discord.js')

require('dotenv').config()

const client = new Client()
client.commands = new Discord.Collection()
const embed = new Discord.MessageEmbed()
const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
const regex = new RegExp(expression)
const commandFiles = fs.readdirSync('./src/services').filter((file) => file.endsWith('.js'))

forEach(commandFiles, (file) => {
  const command = require(`./services/${file}`)
  client.commands.set(command.name, command)
})

console.log(client.commands)

const prefix = '~'

client.on('message', async (message) => {
  if (message.author.bot) return

  if (message.channel.id === '750807318249341159' && message.content.match(regex)) {
    const channel = client.channels.cache.find((chan) => chan.id === '809473464020369419')
    channel.send(message.content)
  }

  if (!message.content.startsWith(prefix)) return
  const args = message.content.substring(prefix.length).split(' ')
  const command = client.commands.get(args[0])

  try {
    command.execute(message, embed)
  } catch (error) {
    console.error(error)
    message.reply('There was an error trying to execute that command!')
  }
})

client.login(process.env.TOKEN)
