module.exports = {
  name: 'serverMute',
  description: 'Mute every user in your channel!',
  execute(message) {
    if (message.member.voice.channel) {
      const channel = message.guild.channels.cache.get(message.member.voice.channel.id)
      // TODO: redo for of
      for (const [memberID, member] of channel.members) {
        member.voice.setMute(true)
      }
    } else {
      message.reply('You need to join a voice channel first!')
    }
  },
}
