echo "Press <Ctrl+C> to exit..."
while true
do
    echo "Enter the name of message command (delete the folder to remove simply) :"
    read command
    [ -d "./src/commands/message/$command" ] && echo "ERROR : Command already exists, delete the folder to create" && continue
    mkdir "./src/commands/message/$command"
    mkdir "./src/commands/message/$command/components"
    touch "./src/commands/message/$command/$command.ts"
    INDEX_CODE=$"import {Client, Message} from \"discord.js\";

async function execute(client:Client<boolean>, message:Message<boolean>)
{

    // Code here....


}

export {execute};"
    echo "$INDEX_CODE" > "./src/commands/message/$command/$command.ts"
done
