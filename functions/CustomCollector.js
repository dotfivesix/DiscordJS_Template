const {MessageActionRow} = require("discord.js");

const handleError = error => console.log(error);

class CustomCollector
{
    #interaction;
    #embeds;
    #buttons;
    #max;
    #time;
    #filter;
    #customRows;
    #ephemeral;

    constructor(interaction, embeds, buttons)
    {
        this.#interaction = interaction;
        this.#embeds = embeds;
        this.#buttons = buttons;
        this.#max = 1;
        this.#time = 60000;
        this.#filter = i => i.user.id === interaction.user.id;
        this.#customRows = [];
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

    setCustomRows(rows)
    {
        this.#customRows = rows;
        return this;
    }

    async start(collectorHandler)
    {
        let activeRows = [new MessageActionRow()];
        
        (this.#customRows.length === 0)
        ? activeRows[0].addComponents(...this.#buttons)
        : activeRows = this.#customRows.map(x => new MessageActionRow().addComponents(...x));

        await this.#interaction.reply({
            embeds:[...this.#embeds],
            components:[...activeRows],
            ephemeral: this.#ephemeral
        })
        .catch(handleError);

        const collector = this.#interaction.channel.createMessageComponentCollector({
            filter:this.#filter, time:this.#time, max:this.#max
        });

        collector.on("collect", collectorHandler);

        collector.on("end", () => {
            let disabledRows = [new MessageActionRow()];

            (this.#customRows.length === 0)
            ? disabledRows[0].addComponents(...this.#buttons.map(x => x.setDisabled(true)))
            : disabledRows = this.#customRows.map(x => new MessageActionRow().addComponents(...x.setDisabled(true)));

            this.#interaction.editReply({
                embeds: [...this.#embeds],
                components: [...disabledRows],
                ephemeral: this.#ephemeral
            })
            .catch(handleError);
            
              
        });

        return this;

    }

}

module.exports = CustomCollector;