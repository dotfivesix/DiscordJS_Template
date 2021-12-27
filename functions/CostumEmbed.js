const {MessageEmbed} = require("discord.js");
const { default_color } = require("../config.json").embeds;

class CustomEmbed extends MessageEmbed {
    constructor(props)
    {
        super(props);
        if (default_color) this.color = default_color;
    }
}

module.exports = CustomEmbed;