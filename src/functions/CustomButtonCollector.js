const { Awaitable, MessageActionRow } = require("discord.js");
const {CommandInteraction, CacheType, MessageEmbed, MessageButton, Interaction, MessageComponentInteraction } = require("discord.js");

class CustomButtonCollector
{
    #interaction;
    #embeds;
    #rows;
    #max;
    #time;
    #filter;
    #ephemeral;
    #generateRow;

    /**
     * Creates a button collector
     * @param {CommandInteraction<CacheType>} interaction
     * @param {MessageEmbed[]} embeds - An aray of embeds
     * @param {MessageButton[][]} buttons - An array of list of buttons where list represents action row
     * @example new CustomButtonCollector(interaction, [embed1], [[btn1, btn2], [btn3]])
     * @example new CustomButtonCollector(message, [embed1], [[btn]])
     */
    constructor(interaction, embeds, buttons)
    {
        this.#interaction = interaction;
        this.#embeds = embeds;
        this.#rows = buttons;
        this.#max = 1;
        this.#time = 60000;
        this.#filter = (i) => i.user.id === interaction.user.id;
        this.#ephemeral = false;
    }

    /**
     * Set to true if anyone can collect, or make custom filter
     * @param {(i:Interaction<CacheType>) => boolean} filter
     */
    setFilter(filter)
    {
        this.#filter = filter;
        return this;
    }

    /**
     * 
     * @param {number} max
     */
    setMax(max)
    {
        this.#max = max;
        return this;
    }

    /**
     * 
     * @param {number} time 
     */
    setTime(time)
    {
        this.#time = time;
        return this;
    }

    /**
     * 
     * @param {boolean} boolean 
     */
    setEphemeral(boolean)
    {
        this.#ephemeral = boolean;
        return this;
    }

    #generateRow(compIsDisabled)
    {

        return this.#rows.map(row => 
             new MessageActionRow()
            .addComponents(...row.map(button => button.setDisabled(compIsDisabled)))
        );
        
    }

    /**
     * Treat it like you do callback of collector.on("collect")
     * @param {(i:MessageComponentInteraction) => Awaitable<void>} collectorHandler
     */
    async start(collectorHandler)
    {

        try {

            await this.#interaction.reply({
                embeds:this.#embeds,
                components: this.#generateRow(false),
                ephemeral: this.#ephemeral,
            });
    
            const collector = this.interaction.channel.createMessageComponentCollector({
                filter:this.#filter, time:this.#time, max:this.#max
            })
    
            collector.on("collect", collectorHandler);
    
            collector.on("end", () => {
    
                this.#interaction.editReply({
                    components: this.#generateRow(true)
                });

            });

        } catch (error) {
            console.log(error);
        };

        return this;

    }

}

module.exports = {CustomButtonCollector};