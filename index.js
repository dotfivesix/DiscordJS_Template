/*
 * Don't Edit this unless you have an idea what's going on here...
 */

const { Client, Collection, Intents } = require('discord.js');
const {status, statusType, statusText} = require('./config.json').botPresence;
const fs = require('fs');
const dotenv = require("dotenv");
dotenv.config();

const client = new Client({ intents: [
	Intents.FLAGS.GUILDS
] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}


client.once('ready', () => {
	console.log('Ready!');
	client.user.setStatus(status);
	if (statusType && statusText) client.user.setActivity(statusText, {type:statusType});
});

client.on('interactionCreate', async (interaction) => {

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({content:"This command can't be processed at the moment due to internal server error, please try again !", ephemeral: true });
	}

});

client.login(process.env.CLIENT_TOKEN);