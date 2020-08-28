import { set, get } from 'lodash'

const ytdl = require('ytdl-core-discord')

class DiscordService {
  constructor(args, message) {
    this.args = args
    this.message = message
  }

  async loadQueue(queue) {
    queue = {}
    const songInfo = await ytdl.getInfo(this.args[1])
    const serverId = this.message.guild.id
    const voiceChannel = this.message.member.voice.channel
    const permissions = voiceChannel.permissionsFor(this.message.client.user)
    if (!voiceChannel) return this.message.channel.send('You need to join a voice channel to play music')
    if (!permissions.has('CONNECT')) return this.message.channel.send('Give me permissions to join a voice channel')
    if (!permissions.has('SPEAK')) return this.message.channel.send('Give me permissions to speak in a voice channel')

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
    if (!queue.serverId) { set(queue, `${serverId}.queue`, queueConstruct) }

    queue[serverId].queue.connection = await voiceChannel.join()
    queue[serverId].queue.songs.push(song)
    console.log(queue[serverId].queue.songs)

    this.message.channel.send(`${song.title} has been added to the queue`)
    return queue
  }

  async playMusic(queue) {
    // const loadedQueue = this.loadQueue(queue)
    const serverId = this.message.guild.id
    const { connection } = queue[serverId].queue

    const ytdlPlay = async (song, loadedQueue) => {
      const serverQueue = get(loadedQueue, this.message.guild.id)
      if (!song) {
        this.message.member.voice.channel.leave()
      }

      const dispatcher = connection.play(await ytdl(song.url), { type: 'opus' })
        .on('finish', () => {
          queue[this.message.guild.id].queue.songs.shift()
          ytdlPlay(queue[this.message.guild.id].queue.songs[0], queue)
          console.log(queue[this.message.guild.id].queue.songs)
        })
        .on('error', error => this.message.channel.send(error))
      dispatcher.setVolumeLogarithmic(5 / 5)
    }

    const firstSong = queue[serverId].queue.songs[0]
    try {
      ytdlPlay(firstSong, queue)
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
