import Client from '@/utils/client'

const fs = require('fs')

const Discord = require('discord.js')

require('dotenv').config()

const client = new Client()
client.commands = new Discord.Collection()
const embed = new Discord.MessageEmbed

const commandFiles = fs.readdirSync('./src/services').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./services/${file}`)
  client.commands.set(command.name, command)
}

console.log(client.commands)

const prefix = '~'

client.on('message', async (message) => {
  if (message.author.bot) return
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
