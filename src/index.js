import DiscordService from './services/DiscordService'

const Discord = require('discord.js')

const client = new Discord.Client()
require('dotenv').config()

const prefix = '?'

client.on('message', async (message) => {
  if (message.author.bot) return
  if (!message.content.startsWith(prefix)) return

  const args = message.content.substring(prefix.length).split(' ')
  const BlackBot = new DiscordService(args, message)

  if (message.content.startsWith(`${prefix}play`)) {
    const queue = undefined
    const loadedQueue = await BlackBot.loadQueue(queue)
    console.log(queue)
    await BlackBot.playMusic(loadedQueue)
  }
  if (message.content.startsWith(`${prefix}stop`)) { BlackBot.stopMusic() }
})

client.login(process.env.TOKEN)
