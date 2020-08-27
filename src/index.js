import DiscordService from './services/DiscordService'

const Discord = require('discord.js')

const client = new Discord.Client()
require('dotenv').config()

const prefix = '?'

client.on('message', (message) => {
  if (message.author.bot) return
  if (!message.content.startsWith(prefix)) return

  const args = message.content.substring(prefix.length).split(' ')
  const BlackBot = new DiscordService(args, message)
  const queue = {}

  if (message.content.startsWith(`${prefix}play`)) {
    console.log(`before play music ${JSON.stringify(queue)}`)
    BlackBot.playMusic(queue)
    console.log(`after play music ${JSON.stringify(queue)}`)
  }
  if (message.content.startsWith(`${prefix}stop`)) { BlackBot.stopMusic() }
})

client.login(process.env.TOKEN)
