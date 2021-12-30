import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import dotenv from "dotenv";
import path from "path";
import fs from "fs";

dotenv.config({path:path.resolve(__dirname, "..", ".env")});
const token = process.env.CLIENT_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

let commands: any[] = [];
fs.readdir(path.resolve(__dirname, "." ,"commands", ".", "slash"), (error, command) => {

    if (!command || error) { console.log("Note : You haven't made any slash command yet so nothing has been registered !"); return; }

    command.map((folder:string) => {
        const slashCommand = require(path.resolve(__dirname, "." , "commands", ".", "slash" , "." , folder , "." , `${folder}.cmd.js`));
        const data = slashCommand.command;
        if (!data) throw new Error(`Export a command variable in commands.ts of command ${folder}`);
        else
        {
            commands.push(data.toJSON());
        }
    });

    const rest = new REST({ version: '9' }).setToken(token!);

    rest.put(Routes.applicationGuildCommands(clientId!, guildId!), { body: commands })
        .then(() => {
            console.log(`Successfully registered ${commands.length} slash commands`);
            if (commands)
            {
                for (const command of commands)
                {
                    console.log(`[${(commands.indexOf(command)) + 1}] : ${command.name}`);
                }
            }
        })
        .catch(error => {
            console.error(error);
    });

});

