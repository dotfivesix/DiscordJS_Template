import { SlashCommandBuilder } from "@discordjs/builders";

const command = new SlashCommandBuilder()
                   .setName("hi")
                   .setDescription("Sends hello !")

export {command};
