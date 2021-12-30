import { Client, CommandInteraction, CacheType, Collection } from "discord.js";
import fs from "fs";
import path from "path";

interface SlashCmd { execute : (client:Client<boolean>, interaction: CommandInteraction<CacheType>) => any; }

module.exports = function(client:Client<boolean>)
{   
    const slashCommands = new Collection();

    fs.readdir(path.resolve(__dirname, "..", "commands", "slash"), (error, commandsList) => {

        if (!commandsList || error) { console.log("You haven't made any slash command yet so no slash command has been loaded !"); return; }

        console.log(`Loaded ${commandsList.length} slash commands.`);

        for (const commandDir of commandsList)
        {
            const command = require(path.resolve(__dirname, ".." ,"commands", "slash", commandDir, `${commandDir}.js`));
            slashCommands.set(commandDir, command);

            console.log(`Slash Command [${commandsList.indexOf(commandDir)+1}] : ${commandDir}`);
        }
    });
    

    client.on("interactionCreate", async (interaction) => {

        if (!interaction.isCommand()) return;
        const command:SlashCmd = slashCommands.get(interaction.commandName) as SlashCmd;
    
        if (!command) return;
    
        try {
            await command.execute(client, interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({content:"This command can't be processed at the moment due to internal server error, please try again !", ephemeral: true });
        }
    
    });
}

