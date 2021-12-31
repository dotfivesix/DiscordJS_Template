echo "Press <Ctrl+C> to exit..."
while true
do
    echo "Enter the name of message command (delete the folder to remove simply) :"
    read command
    [ -d "./src/commands/message/$command" ] && echo "ERROR : Command already exists, delete the folder to create" && continue
    mkdir "./src/commands/message/$command"
    mkdir "./src/commands/message/$command/components"
    touch "./src/commands/message/$command/$command.js"
    INDEX_CODE=$"const {Client, Message} = require(\"discord.js\");

/**
 * 
 * @param {Client<boolean>} client 
 * @param {Message<boolean>} message 
 */
async function execute(client, message)
{

    // Code here....   
    

}

module.exports = {execute};
"
    echo "$INDEX_CODE" > "./src/commands/message/$command/$command.js"
done
