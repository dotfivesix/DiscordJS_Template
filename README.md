# DiscordJS Starter Template
### A simple template for beginners and lazy programmers who just want to build slash command bots quickly
##### Note : *There is another repository for Typescript Discord Template*

## Why this when we have discord.js ?
If you have worked with discord.js before, you know that we have to install mulitple libraries like @discord/rest @discord/builders etc... to start, not only that, a seperate file for deployement of slash commands is required.
***Lets all be honest*** , We programmers hate memorizing syntax thats why coders are considered best at googling ツ and that's the whole reason why this exists

## How to get started ?
*Make sure you have Node.js's latest LTS version installed*
 Clone this repository and you 2 simple commmands.
```
$ npm install
$ node index.js
```
## Just a template ?
#### No, this project is more than just a starter template, as I mentioned above it's for lazy programmers, means everything can be done pretty fast here.
### How to create first command ?
You can delete **dummy.js** from commands folder if you don't want boilerplate for commands. Yes I know you are lazy to even copy paste, there's a bash script **create-command.sh** Just execute it (Make sure you are in the directory of bot like "C:\DiscordBots\DiscordJS_Template\") and input command name of command (e.g "ping"). Incase it doesn't work, just create new file of the name of comamnd everytime and copy paste boilerplate code from "dummy.js" each time
```bash
$ code .
```
Open any IDE/Editor you like, and add some description to the command
#### Note : It is important to add description atleast and you are free to edit any file except
- Any file in **functions** folder
- **"commands"** folder's name
- .gitignore
- **deploy-commands.js**, **index.js** and **functions.js**
#### **You can delete functions.js and functions folder if you don't want support and just a template**

## Configuration
Open config.json and edit as per your need :
```js
{ 
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
There is no need to even touch **index.js** or **deploy-commands**
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
### Test the bot
```
$ node deploy-commands.js
$ node index.js
Ready !
```
Use the two commands above, if you followed all steps carefully till now, you should see "Ready !".
Type /dummy and you will receive "Hello Pepo !", You are all done now ! Delete Dummy and happy coding.

## Workflow
- Run 'create-command.sh"
- Input command's name and open file
- Set description and Slash command according to your need, for help [refer to this](https://discordjs.guide/interactions/registering-slash-commands.html)
- `$ node deploy-commands.js` Try deploying command before starting to code interaction and after coding the slash builder command, so you know from where bug is coming from (Incase)
- ~~Happy~~ Coding
- `$ node index.js` debug, test etc...
#### Repeat Till Bot is Completed !
##### ***Please Note that I wouldn't recommend you code whole command in [command].js only if it's complicated, You can create folders, import export functions, to avoid spaghetti code. However don't create any folder or such in commands folder, create a separate folder for that outside.***

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
### 2. CustomCollector :
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
const msg = new CustomCollector(interaction, [embed], [btn]);

msg.start(async i => {
    await i.reply("Monke !");
});
```
This is how easy it is, with functions.
#### Now you might be thinking "Ok, but this isn't costumizable", No wait...
```js
const msg = new CustomCollector(interaction, [embed], [btn]);
msg
    .setCustomRows([[btnA1, btnA2, btnA3], [btnB1, btnB2]])
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
