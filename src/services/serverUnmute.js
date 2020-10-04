module.exports = {
  name: 'serverUnmute',
  description: 'Unmute every user in your channel!',
  execute(message) {
    if (message.member.voice.channel) {
      const channel = message.guild.channels.cache.get(message.member.voice.channel.id)
      // TODO: redo for of
      for (const [memberID, member] of channel.members) {
        member.voice.setMute(false)
      }
    } else {
      message.reply('You need to join a voice channel first!')
    }
  },
}
