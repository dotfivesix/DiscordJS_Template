const CustomEmbed = require("../functions/CostumEmbed");
const CustomCollector = require("../functions/CustomCollector");
const {MessageButton} = require("discord.js");
const {SlashCommandBuilder} = require("@discordjs/builders");

module.exports = {
    
    // Set command here
    data : new SlashCommandBuilder()
              .setName("dummy")
              .setDescription("Say Hello !")
    ,
    async execute(interaction) {

        // Code here...
        const embed = new CustomEmbed({title : "Mmmmmm"});
        const btn = new MessageButton({label:"E ?", style:"SUCCESS", customId:"e"});
        const nah = new MessageButton({label:"N ?", style:"SUCCESS", customId:"n"});
        const wtf = new MessageButton({label:"wtf ?", style:"SUCCESS", customId:"wtf"});
        const msg = new CustomCollector(interaction, [embed], [btn]);
        msg.setCustomRows([[wtf, btn],[nah]]);
        msg.start(async i => {
            await i.reply("Monke !");
        });

    }
}
