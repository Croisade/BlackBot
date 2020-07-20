const Discord = require('discord.js')
const fs = require('fs')
const ytdl = require('ytdl-core')

const client = new Discord.Client()
require('dotenv').config()

const prefix = '!'

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

client.on('message', (message) => {
  console.log(message.content)
  const musicArg = message.content.substring(prefix.length).split(' ')
  console.log(typeof musicArg[1])
  if (musicArg[0].startsWith('Test')) {
    
    console.log('this activates')
    ytdl(musicArg[1])
      .pipe(fs.createWriteStream('video.flv'))
  }
})

client.login(process.env.TOKEN)
