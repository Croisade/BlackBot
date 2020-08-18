const ytdl = require('ytdl-core')

class DiscordService {
  constructor(args, message) {
    this.args = args
    this.message = message
  }

  async playMusic() {
    const serverQueue = this.queue.get(this.message.guild.id)
    const voiceChannel = this.message.member.voice.channel
    const permissions = voiceChannel.permissionsFor(this.message.client.user)
    const songInfo = await ytdl.getInfo(this.args[1])
    const song = {
      title: songInfo.title,
      url: songInfo.video_url,
    }
    const queueConstruct = {
      textChannel: this.message.channel,
      voiceChannel: this.message.voiceChannel,
      connection: null,
      songs: [],
      playing: true,
    }
    console.log(`server queue ${serverQueue}`)
    if (!voiceChannel) return this.message.channel.send('You need to join a voice channel to play music')
    if (!permissions.has('CONNECT')) return this.message.channel.send('Give me permissions to join a voice channel')
    if (!permissions.has('SPEAK')) return this.message.channel.send('Give me permissions to speak in a voice channel')
    if (!serverQueue) {
      this.queue.set(this.message.guild.id, queueConstruct)

      queueConstruct.songs.push(song)
      console.log('this is running')
      const firstSong = queueConstruct.songs[0]

      try {
        const connection = await voiceChannel.join()
        this.ytdlPlay(this.message.guild.id, firstSong, connection)
      } catch (error) {
        console.log(`There was an error connecting to the voice channel ${error}`)
        return this.message.channel.send(`There was an error connecting to the voice channel ${error}`)
      }
      return undefined
    }
    queueConstruct.songs.push(song)
    return this.message.channel.send(`${song.title} has been added to the queue`)
  }

  async stopMusic() {
    if (!this.message.member.voice.channel) return this.message.channel.send('You need to be in a voice channel')
    this.message.member.voice.channel.leave()
    return undefined
  }

  queue = new Map()

  ytdlPlay = (serverId, song, ytdlConnection) => {
    const serverQueue = this.queue.get(serverId)
    console.log(serverQueue)
    console.log(song)
    if (!song) {
      serverQueue.voiceChannel.leave()
      this.queue.delete(serverId)
    }

    const dispatcher = ytdlConnection.play(ytdl(song.url))
      .on('finish', () => {
        serverQueue.songs.shift()
        this.ytdlPlay(serverId, serverQueue[0])
      })
      .on('error', (error) => {
        console.log(error)
        return this.message.channel.send(error)
      })
    dispatcher.setVolumeLogarithmic(5 / 5)
  }
}

export default DiscordService
