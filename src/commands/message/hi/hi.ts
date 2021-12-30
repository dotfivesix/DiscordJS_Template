import {Client, Message} from "discord.js";

async function execute(client:Client<boolean>, message:Message<boolean>)
{

    // Code here....   
    await message.channel.send("Hello !");

}

export {execute};
