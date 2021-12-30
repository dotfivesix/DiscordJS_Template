# DiscordTS Starter Template
### A simple template for beginners and lazy programmers who just want to build slash command bots quickly
##### Note : *There is another repository for [Javascript Discord Template](https://github.com/KatsukeX56/DiscordJS_Template)*

## Why this when we have discord.js ?
If you have worked with discord.js before, you know that we have to install mulitple libraries like @discord/rest @discord/builders etc... to start, not only that, a seperate file for deployement of slash commands is required.
***Lets all be honest*** , We programmers hate memorizing syntax thats why coders are considered best at googling ツ and that's the whole reason why this exists

## How to get started ?
*Make sure you have Node.js's latest LTS version installed and typescript as well*
 Clone this repository and you 2 simple commmands.
```bash
$ npm install
$ npm run restart
```
Here are other commands
```bash
$ npm run start
# Use this command to start the bot
$ npm run deploy
# Use this command to deploy slash commands, use it only after creating a new slash command
$ npm run build
# Use this script to compile ts to js (you can use tsc --watch alternatively in other terminal but must use this to restructure after deleting any ts file
$ bash message-command.sh || bash slash-command.sh
# Use anyone of these to get boilerplate of code
```
## Just a template ?
#### No, this project is more than just a starter template, as I mentioned above it's for lazy programmers, means everything can be done pretty fast here.
### How to create first command ?
You can delete **hi** folders from commands/slash and commands/message if you don't want boilerplate for commands. Yes I know you are lazy to even copy paste, there are 2 bash scripts **slash/message-command.sh** Just execute the one you desire to create command of (Make sure you are in the directory of bot like "C:\DiscordBots\DiscordJS_Template\") and input command name of command (e.g "ping").

## Make Sure
- src has a folder named "commands" with only 2 subfoldes "slash" and "message"
- src/commands/slash/your_command and the file inside it have the same name
- (Incase of slash command) There should be a {command_name}.cmd.ts file exporting a variable "command" which is of type SlashCommandBuilder, make your slash command there
- every {command_name}.ts export an async function execute with client and interaction as params

```bash
$ code .
```
#### **You can delete src/functions folder if you don't want support and just a template**

## Configuration
Open config.json and edit as per your need :
```js
{
    "prefix" : "!", // Leave empty if you don't want any (not recommended, if you want every message better modify src/events/messageCreate.ts
    "botPresence" : {
        "status" : "online", // "dnd" or "invisible" or "idle"
        "statusType" : "PLAYING", // "WATCHING" or "COMPETING" or "LISTENING"
        "statusText" : "with your life" // text you want
    },
    "embeds" : {
        "default_color" : "#00FFFF", // Color you want all embeds to have (You can overwrite for specific embeds by the way, but leave it empty "" if you don't want this feature
    }
}
```
There is no need to even touch **index.ts** or **deploy-commands.ts**
Once you are done with **config.json** now create a file called .env using
```bash
$ touch .env
# Or just don't be lazy and create file using GUI
```
Open it and paste :
```
CLIENT_TOKEN=BOT_TOKEN_HERE
CLIENT_ID=CLIENT_ID_HERE
GUILD_ID=SERVER_ID
```
Fill the fields, if you don't have/know :
1. Go to [Discord's developer portal](https://discord.com/developers/applications/) and create a new application.
2. Set profile pic/name and click on "Bot" on left side, then "Add Bot".
3. Then click on "COPY" button below "Token" and fill the above field.
4. Click on "OAUTH2" (General) on left and Copy "Client ID" and fill the above field.
5. Next [Go to discord](https://discord.com/channels/@me) and create a new server, right click on it (on left column) and then "Copy Id", incase that option doesn't show up, enable developer mode in settings. Once you have copied Server/Guild ID, fill the above field.
6. Now invite the bot to the same server you copied ID from, go to [Portal](https://discord.com/developers/applications/) back and Open "OAUTH2" (URL Generator)
7. Under Scopes section, mark "bot" and "application.commands".
8. Under Bot permissions section, set permissions of bot, if you don't know/haven't decided yet and you have enough power, just mark administrator and copy the link generated below.
9. Paste that link in browser, and add the bot to the same server you copied ID from.
#### DONE !

## Production
Once the bot is ready for production, you sure want to deploy slash commands for all servers and not just your development server. For that, comment out last 3 lines of deploy-commands.js and add below :
```js
await rest.put(Routes.applicationCommands(clientId), { body: commands })
.then(() => console.log("Registered Successfully !")
.catch(error => console.error(error));
```
Edit **package.json** file as you see fit for production server and requirements.
### Done !

## Functions ?
I will keep adding common features to make development faster, you can also make and send PR. Some of the functions done are these.
### 1. CustomEmbed :
If you remember setting default color of embeds in **config.json**, Yes ! It's that only, everytime you want to create an embed, if you hate giving same color to each embed you create ever, use this instead of MessageEmbed, you can overwrite afterall, This is nothing more than a class which extends MessageEmbed and just sets Default color, you can overwrite for specific embeds afterall !
### 2. CustomButtonCollector :
Who doesn't hate writing 56 lines of code just to collect button/interactions, you have to create filters/messageComponentCollector/whatsoever then manage collector on collect and end states while also handling exceptions. That's so time consuming. That's why this class Exists. It's as much customizable as any normal collector and will be helpful in most cases.
```js
const {default_color} = require("../config.json").embeds;
const embed = new MessageEmbed({title : "Mmmmmm", color: default_color});
const btn = new MessageButton({label:"E ?", style:"SUCCESS", customId:"e"});
const filter = i => i.user.id === interaction.user.id;

const row = new MessageActionRow().addComponents(btn);

const msg = await interaction.reply({embeds:[embed], components:[row]});

const collector = await interaction.channel.createMessageComponentCollector({
    filter, time: 60000, max : 1
});

collector.on("collect", async i => {
    if (i.customId === "e") await i.reply("Monke !");
})
.catch(error => console.error(error));

collector.on("end", () => {
    const disabledRow = new MessageActionRow().addComponents(btn.setDisabled(true));
    if (!msg.deleted) await msg.edit({embeds:[embed], components:[disabledRow]});
})
.catch(error => console.error(error));
```
This is how much coding is required just to create a simple collector which will send Monke if you click "E ?" Button.
```js
const embed = new CustomEmbed({title : "Mmmmmm"});
const btn = new MessageButton({label:"E ?", style:"SUCCESS", customId:"e"});
const msg = new CustomButtonCollector(interaction, [embed], [[btn]]);

msg.start(async i => {
    await i.reply("Monke !");
});
```
This is how easy it is, with functions. (Note that in 3rd argument, we use 2D array, 1 represents row and other buttons)
#### Now you might be thinking "Ok, but this isn't costumizable", No wait...
```js
const msg = new CustomButtonCollector(interaction, [embed], [[btnA1, btnA2, btnA3], [btnB1, btnB2]]);
msg
    .setFilter(i => i.user.id === "7653543635645")
    .setMax(5)
    .setTime(30000) // 30 seconds
    .setEphemeral(true)
    .start(async i => {
        if (i.customId === "e") await i.reply("Monke !");
    });
```
#### Yup ! That's how easy it is, also the ".start" method should be treated the same way you treat `collector.on("collect", this_callback)` Now ask yourself why you shouldn't you use this ?
###### If you have any idea of more awesome features, consider PR, I will keep adding cool features time by time that can make Devleoper experience fun and quick... That's it !
