echo "Press <Ctrl+C> to exit..."
while :
do
    echo "Enter the name of command (delete the folder to remove simply) :"
    read command
    [ -d "./src/commands/slash/$command" ] && echo "ERROR : Command already exists, delete the folder to create" && continue
    mkdir "./src/commands/slash/$command"
    mkdir "./src/commands/slash/$command/components"
    touch "./src/commands/slash/$command/$command.js"
    touch "./src/commands/slash/$command/$command.cmd.js"

    INDEX_CODE=$"const {Client, CommandInteraction, CacheType} = require(\"discord.js\");

/**
 * 
 * @param {Client<boolean>} client 
 * @param {CommandInteraction<CacheType>} interaction 
 */
async function execute(client, interaction)
{

    // Code here...
    
}

module.exports = {execute};
"
    COMMAND_CODE=$"const { SlashCommandBuilder } = require(\"@discordjs/builders\");

const command = new SlashCommandBuilder()
                   .setName(\"$command\")
                   .setDescription(\"Description_here\")

module.exports = {command};"

    echo "$COMMAND_CODE" > "./src/commands/slash/$command/$command.cmd.js"
    echo "$INDEX_CODE" > "./src/commands/slash/$command/$command.js"
done
