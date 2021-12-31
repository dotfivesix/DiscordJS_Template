const { SlashCommandBuilder } = require("@discordjs/builders");

const command = new SlashCommandBuilder()
                   .setName("hi")
                   .setDescription("Sends hello !")

module.exports = {command};
