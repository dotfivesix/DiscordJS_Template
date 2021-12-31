const {status, statusType, statusText} = require("../config.json").botPresence;

module.exports = function(client)
{
    client.once("ready", bot => {

        console.log(`${bot.user.tag} is ready !`);
        
        client.user.setStatus(status);
    
        if (statusText && statusType)
        {
            client.user.setActivity({type:statusType, name:statusText});
        }
    
        // If you have any databse to connect with like mongoDb, require it below
        // require("../db/conn");
    });
}

