const https = require('https')

require('dotenv').config()

module.exports = {
  name: 'dict',
  description: 'Query the dictionary api!',
  execute(message, embed) {
    const args = message.content.split(' ')

    // eslint-disable-next-line babel/camelcase
    const app_id = process.env.APPLICATION_ID
    // eslint-disable-next-line babel/camelcase
    const app_key = process.env.APPLICATION_KEY
    const wordId = args[1]
    const fields = 'definitions'
    const strictMatch = 'false'

    const options = {
      host: 'od-api.oxforddictionaries.com',
      port: '443',
      path: `/api/v2/entries/en-us/${wordId}?fields=${fields}&strictMatch=${strictMatch}`,
      method: 'GET',
      headers: { app_id, app_key },
    }

    try {
      https.get(options, (resp) => {
        let body = ''
        resp.on('data', (d) => {
          body += d
        })
        resp.on('end', () => {
          const parsed = JSON.parse(body)
          if (parsed.error) { return message.channel.send(embed.setDescription('Word can not be parsed')) }
          embed.setTitle(`${parsed.id}:`)
          embed.setDescription(parsed.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0])
          embed.setColor('#008000')
          return message.channel.send(embed)
        })
      })
    } catch (e) {
      return message.channel.send(e)
    }
    return undefined
  },
}
