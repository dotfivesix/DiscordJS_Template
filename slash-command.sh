echo "Press <Ctrl+C> to exit..."
while :
do
    echo "Enter the name of command (delete the folder to remove simply) :"
    read command
    [ -d "./src/commands/slash/$command" ] && echo "ERROR : Command already exists, delete the folder to create" && continue
    mkdir "./src/commands/slash/$command"
    mkdir "./src/commands/slash/$command/components"
    touch "./src/commands/slash/$command/$command.ts"
    touch "./src/commands/slash/$command/$command.cmd.ts"

    INDEX_CODE=$"import {Client, CommandInteraction, CacheType} from \"discord.js\";

async function execute(client:Client<boolean>, interaction:CommandInteraction<CacheType>)
{

    // Code here....


}

export {execute};"
    COMMAND_CODE=$"import { SlashCommandBuilder } from \"@discordjs/builders\";

const command = new SlashCommandBuilder()
                   .setName(\"$command\")
                   .setDescription(\"Description_here\")

export {command};"

    echo "$COMMAND_CODE" > "./src/commands/slash/$command/$command.cmd.ts"
    echo "$INDEX_CODE" > "./src/commands/slash/$command/$command.ts"
done
