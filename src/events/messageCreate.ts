import { Client, Message, Collection } from "discord.js";
import fs from "fs";
import path from "path";
import { prefix } from "../config.json";
interface MsgCmd { execute : (client:Client<boolean>, message: Message<boolean>) => any; }

module.exports = function(client:Client<boolean>)
{   
    const messageCommands = new Collection();

    fs.readdir(path.resolve(__dirname, "..", "commands", "message"),(error, commandsList) => {

        if (!commandsList || error) { console.log("You haven't made any message command yet so no message command has been loaded !"); return; }

        console.log(`Loaded ${commandsList.length} message commands.`);

        for (const commandDir of commandsList)
        {
            const command = require(path.resolve(__dirname, "..", "commands", "message", commandDir, `${commandDir}.js`));
            messageCommands.set(commandDir, command);

            console.log(`Message Command [${commandsList.indexOf(commandDir)+1}] : ${commandDir}`);
        }

        client.on("messageCreate", async message => {

            if (message.author.bot) return;

            let command:MsgCmd|undefined;
            // If there is no prefix
            if (!prefix)
            {
                command = messageCommands.get(message.content.split(" ")[0]) as MsgCmd;
            }
            if (message.content.startsWith(prefix) && client.user?.id !== message.author.id)
            {
                if (prefix) command = messageCommands.get(message.content.split(prefix)[1].split(" ")[0]) as MsgCmd;
                else command = messageCommands.get(message.content.split(" ")[0]) as MsgCmd;
            }
            
            
            if (command?.execute)
            {
                console.log("Inside statement");
                try {
                    await command.execute(client, message);
                } catch(error) {
                    console.log(error);
                    await message.reply({content:"This command can't be processed at the moment due to internal server error, please try again !"});
                }
            }
            

        });

    });
    
}

