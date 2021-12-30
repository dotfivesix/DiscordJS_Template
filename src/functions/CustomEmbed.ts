import { MessageEmbed, MessageEmbedOptions } from "discord.js";
const {default_color, timestamps} = require("../config.json").embeds;

class CustomEmbed extends MessageEmbed
{
    constructor(data?:MessageEmbedOptions)
    {
        super(data);
        if (default_color) this.color = default_color;
        if (timestamps) this.setTimestamp();
    }
};

export {CustomEmbed};