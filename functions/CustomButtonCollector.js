const {MessageActionRow} = require("discord.js");

class CustomButtonCollector
{
    #interaction;
    #embeds;
    #buttons;
    #max;
    #time;
    #filter;
    #ephemeral;

    constructor(interaction, embeds, buttons)
    {
        this.#interaction = interaction;
        this.#embeds = embeds;
        this.#buttons = buttons;
        this.#max = 1;
        this.#time = 60000;
        this.#filter = i => i.user.id === interaction.user.id;
        this.#ephemeral = false;
    }

    setFilter(filter)
    {
        this.#filter = filter;
        return this;
    }

    setMax(max)
    {
        this.#max = max;
        return this;
    }

    setTime(time)
    {
        this.#time = time;
        return this;
    }

    setEphemeral(boolean)
    {
        this.#ephemeral = boolean;
        return this;
    }

    async start(collectorHandler)
    {
        const generateRow = btnIsDisabled => {
            const row = [];
            this.#buttons.forEach(x => {
                const tempRow = new MessageActionRow();
                if (Array.isArray(x))
                {
                    let comps = [];
                    x.forEach(y => comps.push(y.setDisabled(btnIsDisabled)));
                    tempRow.addComponents(...comps);
                    row.push(tempRow);
                }
                else
                {
                    tempRow.addComponents(x.setDisabled(btnIsDisabled));
                    row.push(tempRow);
                }
            });
            return row;
        }

        try {

            await this.#interaction.reply({
                embeds:[...this.#embeds],
                components:[...generateRow(false)],
                ephemeral: this.#ephemeral
            })
    
            const collector = this.#interaction.channel.createMessageComponentCollector({
                filter:this.#filter, time:this.#time, max:this.#max
            })
    
            collector.on("collect", collectorHandler)
    
            collector.on("end", () => {
    
                this.#interaction.editReply({
                    embeds: [...this.#embeds],
                    components: [...generateRow(true)],
                    ephemeral: this.#ephemeral
                });
            });

        } catch (error) {
            console.log(error);
        };

        return this;

    }

}

module.exports = CustomCollector;