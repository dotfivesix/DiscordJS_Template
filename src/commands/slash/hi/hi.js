const {Client, CommandInteraction, CacheType} = require("discord.js");

/**
 * 
 * @param {Client<boolean>} client 
 * @param {CommandInteraction<CacheType>} interaction 
 */
async function execute(client, interaction)
{

    await interaction.reply({content:"Hello !"});
    
}

module.exports = {execute};
