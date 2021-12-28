echo "Enter the name of command :"
read command
touch "./commands/$command.js"
echo $( < "./commands/$command.js" )
CODE=$"const { CustomEmbed } = require(\"../functions/CostumEmbed\");
const {SlashCommandBuilder} = require(\"@discordjs/builders\");

module.exports = {
    
    // Set command here
    data : new SlashCommandBuilder()
              .setName(\"$command\")
              .setDescription(\"\")
    ,
    async execute(interaction) {

        // Code here...
        

    }
}"
echo "$CODE" > "./commands/$command.js"
