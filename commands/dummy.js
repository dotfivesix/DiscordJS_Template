const CustomEmbed = require("../functions/CostumEmbed");
const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    
    // Set command here
    data : new SlashCommandBuilder()
              .setName("dummy")
              .setDescription("Say Hello !")
    ,
    async execute(interaction) {

        // Code here...
        await interaction.reply("Helo Pepo !");

    }
}
