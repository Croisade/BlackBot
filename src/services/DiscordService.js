const ytdl = require('ytdl-core')

class DiscordService {
  constructor(args, message) {
    this.args = args
    this.message = message
  }

  async playMusic() {
    const voiceChannel = this.message.member.voice.channel
    if (!voiceChannel) return this.message.channel.send('You need to join a voice channel to play music')
    const permissions = voiceChannel.permissionsFor(this.message.client.user)
    if (!permissions.has('CONNECT')) return this.message.channel.send('Give me permissions to join a voice channel')
    if (!permissions.has('SPEAK')) return this.message.channel.send('Give me permissions to speak in a voice channel')

    try {
      const connection = await voiceChannel.join()
      const dispatcher = connection.play(ytdl(this.args[1]))
        .on('finish', () => {
          voiceChannel.leave()
        })
        .on('error', (error) => {
          console.log(error)
          return this.message.channel.send(error)
        })
      dispatcher.setVolumeLogarithmic(5 / 5)
    } catch (error) {
      console.log(`There was an error connecting to the voice channel ${error}`)
      return this.message.channel.send(`There was an error connecting to the voice channel ${error}`)
    }
    return undefined
  }

  async stopMusic() {
    if (!this.message.member.voice.channel) return this.message.channel.send('You need to be in a voice channel')
    this.message.member.voice.channel.leave()
    return undefined
  }
}

export default DiscordService
