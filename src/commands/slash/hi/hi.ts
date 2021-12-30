import {Client, CommandInteraction, CacheType} from "discord.js";

async function execute(client:Client<boolean>, interaction:CommandInteraction<CacheType>)
{

    await interaction.reply({content:"Hello !"});

    
}

export {execute};
