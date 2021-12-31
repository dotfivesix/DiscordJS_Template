const { MessageEmbed, MessageEmbedOptions } = require("discord.js");
const {default_color, timestamps} = require("../config.json").embeds;

class CustomEmbed extends MessageEmbed
{
    /**
     * 
     * @param {MessageEmbedOptions} data
     */
    constructor(data)
    {
        super(data);
        if (default_color) this.color = default_color;
        if (timestamps) this.setTimestamp();
    }
};

module.exports = {CustomEmbed};