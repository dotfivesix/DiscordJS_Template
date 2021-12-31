const {Client, Message} = require("discord.js");

/**
 * 
 * @param {Client<boolean>} client 
 * @param {Message<boolean>} message 
 */
async function execute(client, message)
{

    // Code here....   
    await message.channel.send("Hello !");

}

module.exports = {execute};
