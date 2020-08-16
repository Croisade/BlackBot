const Discord = require('discord.js')
const fs = require('fs')
const ytdl = require('ytdl-core')

const client = new Discord.Client()
require('dotenv').config()

const prefix = '?'

async function execute(message, serverQueue) {
  const args = message.content.split(' ')

  const voiceChannel = message.member.voice.channel
  if (!voiceChannel) {
    return message.channel.send('Join a channel, dickhead')
  }

  const permissions = voiceChannel.permissionsFor(message.client.user)
  if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
    return message.channel.send('I don\'t have the permissions for this')
  }
}

client.on('message', async (message) => {
  if (message.author.bot) return
  if (!message.content.startsWith(prefix)) return

  const args = message.content.substring(prefix.length).split(' ')
  if (message.content.startsWith(`${prefix}play`)) {
    console.log(args)
    const voiceChannel = message.member.voice.channel
    if (!voiceChannel) return message.channel.send('You need to join a voice channel to play music')
    const permissions = voiceChannel.permissionsFor(message.client.user)
    if (!permissions.has('CONNECT')) return message.channel.send('Give me permissions to join a voice channel')
    if (!permissions.has('SPEAK')) return message.channel.send('Give me permissions to speak in a voice channel')

    try {
      const connection = await voiceChannel.join()
      const dispatcher = connection.play(ytdl(args[1]))
        .on('finish', () => {
          voiceChannel.leave()
        })
        .on('error', (error) => {
          console.log(error)
          return message.channel.send(error)
        })
      dispatcher.setVolumeLogarithmic(5 / 5)
    } catch (error) {
      console.log(`There was an error connecting to the voice channel ${error}`)
      return message.channel.send(`There was an error connecting to the voice channel ${error}`)
    }
  } else if (message.content.startsWith(`${prefix}stop`)) {
    if (!message.member.voice.channel) return message.channel.send('You need to be in a voice channel')
    message.member.voice.channel.leave()
    return undefined
  }
})

client.login(process.env.TOKEN)
