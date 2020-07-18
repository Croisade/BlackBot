const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config()

client.on('message', message => {
    if (message.content === '!ping') {
	// send back "Pong." to the channel the message was sent in
	message.channel.send('Pong.');
}
console.log(message.content);
});


client.once('ready', () => {
    console.log('Ready!');
});

client.login(process.env.TOKEN);

