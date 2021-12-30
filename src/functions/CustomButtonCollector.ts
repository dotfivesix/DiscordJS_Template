import { Awaitable, MessageActionRow } from "discord.js";
import {CommandInteraction, CacheType, MessageEmbed, MessageButton, Interaction, MessageComponentInteraction } from "discord.js";

class CustomButtonCollector
{
    protected interaction:CommandInteraction<CacheType>;
    protected embeds:MessageEmbed[];
    protected rows:MessageButton[][];
    protected max:number;
    protected time:number;
    protected filter:(i:Interaction<CacheType>) => boolean;
    protected ephemeral:boolean;

    public constructor(interaction:CommandInteraction<CacheType>, embeds:MessageEmbed[], buttons:MessageButton[][])
    {
        this.interaction = interaction;
        this.embeds = embeds;
        this.rows = buttons;
        this.max = 1;
        this.time = 60000;
        this.filter = (i:Interaction<CacheType>) => i.user.id === interaction.user.id;
        this.ephemeral = false;
    }

    public setFilter(filter:(i:Interaction<CacheType>) => boolean)
    {
        this.filter = filter;
        return this;
    }

    public setMax(max:number)
    {
        this.max = max;
        return this;
    }

    public setTime(time:number)
    {
        this.time = time;
        return this;
    }

    public setEphemeral(boolean:boolean)
    {
        this.ephemeral = boolean;
        return this;
    }

    protected generateRow(compIsDisabled:boolean):MessageActionRow[]
    {

        return this.rows.map(row => 
             new MessageActionRow()
            .addComponents(...row.map(button => button.setDisabled(compIsDisabled)))
        );
        
    }

    public async start(collectorHandler:(i:MessageComponentInteraction) => Awaitable<void>)
    {

        try {

            await this.interaction.reply({
                embeds:this.embeds,
                components: this.generateRow(false),
                ephemeral: this.ephemeral,
            })
    
            const collector = this.interaction.channel?.createMessageComponentCollector({
                filter:this.filter, time:this.time, max:this.max
            })
    
            collector?.on("collect", collectorHandler);
    
            collector?.on("end", () => {
    
                this.interaction.editReply({
                    embeds: this.embeds,
                    components: this.generateRow(true)
                });

            });

        } catch (error) {
            console.log(error);
        };

        return this;

    }

}

export {CustomButtonCollector};