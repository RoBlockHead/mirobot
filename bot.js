const Discord = require('discord.js');
const logger = require('winston');
const https = require('https');
const tbaBaseURL = 'www.thebluealliance.com';
const toaBaseURL = 'www.theorangealliance.org';

const logChannelID = "584874513750163478";
// DATABASE WORK
const { Client } =  require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

client.query('CREATE TABLE user_stats(user_id, number_lol, number_owo)');



function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
var today = new Date();
if(today.getMinutes() < 10) {
  var min = "0" + today.getMinutes();
}
else {
  var min = today.getMinutes();
}
var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
var time = today.getHours() + ":" + min + ":" + today.getSeconds();
var dateTime = time;

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
const config = require("./config.json");
logger.level = 'debug';
const bot = new Discord.Client();

function glog(channel,user,command,servername){
  bot.channels.get(logChannelID).send(`[${dateTime}] ${user} issued command ${command} in channel <${channel}> of server ${servername}`);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// const nfsMsg = new Discord.MessageEmbed(nfsEmbed);
// var textLabel = document.getElementById("textLabel");
bot.on('ready', function (evt) {
    console.log('[' + dateTime + '] Connected');
    console.log('[' + dateTime + `] Logged in as: ${bot.user.username} - (${bot.user.id})`);
    // logger.info(bot.username + ' - (' + bot.id + ')');
    // bot.user.setPresence({ game: { name: 'mirobot (!)', type: "playing"}}); 
    // bot.user.setActivity(`mirobot (!) | serving ${bot.guilds.size} servers`);
    bot.user.setActivity(`mirobot (!) | serving ${bot.guilds.size} servers`);
    console.log('['+ dateTime + `] Activity changed to '${bot.user.presence.game}'`);
    // textLabel.innerHTML = `${bot.user.username}`;
   
});

bot.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  bot.user.setActivity(`mirobot (!) | serving ${bot.guilds.size} servers`);
});

bot.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  if(message.author.bot) return;

  if(message.content.toLowerCase() === "lol" || message.content.toLowerCase() === "lmao") {
    message.channel.send("HAHAHAHAHA that's very funny"); 
  }
  
  if(message.content.indexOf(config.prefix) !== 0) return; 
  
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  console.log(command);
  
  if(command === "owo") {
    message.channel.send("What's this?");
    glog(message.channel.name, message.author.tag, "owo", message.guild.name);
  }
  
  if(command === "nick") {
    message.channel.sendMessage(message.author.username);
    glog(message.channel.name, message.author.tag, "nick", message.guild.name);
  }
  
  if(command === "denial"){
    message.channel.send("no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no nono no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no no");
    glog(message.channel.name, message.author.tag, "denial", message.guild.name);
  }
  
  if(command === "help") {
   message.channel.send("See https://nehabot.github.io/docs for help!");
   glog(message.channel.name, message.author.tag, "help", message.guild.name); 
  }
  
  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(bot.ping)}ms`);
    glog(message.channel.name, message.author.tag, "ping", message.guild.name);
  }
  
  if(command === "stahp") {
   message.channel.send("Stop forwarding that crap to me...");
   glog(message.channel.name, message.author.tag, "stahp", message.guild.name); 
  }

  if(command === "time") {
    message.channel.send("It is " + time + " on " + date );
    console.log('['+time+`] Time command used on '${message.guild}'`);
    glog(message.channel.name, message.author.tag, "time", message.guild.name);
  }
  
  if(command === "urmom") {
    message.channel.send("No u");
    console.log('['+time+`] urmom command used on '${message.guild}'`);
    glog(message.channel.name, message.author.tag, "urmom", message.guild.name);
  }
  
  if(command === "checkpulse") {
    message.channel.send("Beep. Boop. Beep. Boop. I'm Alive");
    glog(message.channel.name, message.author.tag, "checkpulse", message.guild.name); 
  }
  
  if(command === "idk") {
    message.channel.send("I don't know either");
    glog(message.channel.name, message.author.tag, "idk", message.guild.name); 
  }
  
  if(command === "lol") {
    message.channel.send("HAHAHAHAHA that's funny");
    glog(message.channel.name, message.author.tag, "lol", message.guild.name); 
  }

  if(command === "tba") {
    var teamNum = args[0];
    var options = {
        host: tbaBaseURL,
        path: `/api/v3/team/frc${teamNum}`,
        method: 'GET',
        headers: {
            'X-TBA-Auth-Key': process.env.TBAAUTH, 
            'User-Agent': `Mirobot Discord Bot (${bot.user.username})`
        }
    };
    var tbaResponse = ' ';
    
    https.get(options,function(res){
        console.log("Connected to TBA");
        var body = ' ';
        res.on('data', function(chunk){
            body += chunk;
        });
        res.on('end', function(done){
          tbaResponse = JSON.parse(body);
          console.log(tbaResponse.nickname);
          message.channel.send({
            content: `Here's what I found on team ${teamNum}: `,
            embed: {
            "title": `Team ${teamNum}`,
            "url": `https://www.thebluealliance.com/team/frc${teamNum}`,
            "color": 407960,
            "fields": [
              {
                "name": "Nickname",
                "value": tbaResponse.nickname
              },
              {
                "name": "Location",
                "value": `${tbaResponse.city}, ${tbaResponse.state_prov}, ${tbaResponse.country}`
              },
              {
                "name": "Rookie Year",
                "value": tbaResponse.rookie_year
              },
              {
                "name": "Website",
                "value": tbaResponse.website
              }
            ]
          }});
        });
      });
    glog(message.channel.name, message.author.tag, `tba ${teamNum}`, message.guild.name);
  }

  if(command === "toa") {
    var teamNum = args[0];
    var options = {
        host: toaBaseURL,
        path: `/api/team/${teamNum}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-TOA-Key': process.env.TBAAUTH, 
          'X-Application-Origin': `Mirobot Discord Bot (${bot.user.username})`
        }
    };
    var tbaResponse = ' ';
    
    https.get(options,function(res){
        console.log("Connected to TOA");
        var body = ' ';
        res.on('data', function(chunk){
            body += chunk;
        });
        res.on('end', function(done){
          toaResponse = JSON.parse(body);
          console.log(toaResponse);
          // message.channel.send({
          //   content: `Here's what I found on team ${teamNum}: `,
          //   embed: {
          //   "title": `Team ${teamNum}`,
          //   "url": `https://www.thebluealliance.com/team/frc${teamNum}`,
          //   "color": 407960,
          //   "fields": [
          //     {
          //       "name": "Nickname",
          //       "value": tbaResponse.nickname
          //     },
          //     {
          //       "name": "Location",
          //       "value": `${tbaResponse.city}, ${tbaResponse.state_prov}, ${tbaResponse.country}`
          //     },
          //     {
          //       "name": "Rookie Year",
          //       "value": tbaResponse.rookie_year
          //     },
          //     {
          //       "name": "Website",
          //       "value": tbaResponse.website
          //     }
          //   ]
          // }});
        });
      });
    glog(message.channel.name, message.author.tag, `toa ${teamNum}`, message.guild.name);
  }

  if(command === "mirobot.shutdown254") {
    if(message.author.id === "156126755646734336" ){
      glog(message.channel.name, message.author.tag, "***MIROBOT.SHUTDOWN254***", message.guild.name);
      bot.channels.get(logChannelID).send("***NEHABOT IS NOW SHUTTING DOWN***");
      sleep(10000);
      // process.exit();
    }
    else{
      message.channel.send("Error: You are not an authorized bot administrator.");
      bot.channels.get(logChannelID).send(`[${dateTime}] ${message.author.tag} has just attempted to shut down nehabot without permissions`);
    }
  }

  if(command === "daphne") {
    message.channel.send("I am a yo-yo!");
    glog(message.channel.name, message.author.tag, "daphne", message.guild.name);

  }

  if(command === "kill") {
    message.channel.send("Killing all users...");
    message.channel.send("All users killed")
    glog(message.channel.name, message.author.tag, "kill", message.guild.name);

  }

  if(command === "patrick") {
    message.channel.send("Hi! Patrick is a chicken tendie! Make sure to give him all of the chickens...", {files: ["https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/7/28/2/YW0808H_baked-chicken-tenders-with-honey-mustard_s4x3.jpg.rend.hgtvcom.616.462.suffix/1476820959088.jpeg"]});
    glog(message.channel.name, message.author.tag, "patrick", message.guild.name);
  }

  if(command === "nehasfurryshit" || command === "nfs" ) {

    if(message.channel.nsfw === false) {

      message.channel.send("Sorry, but this channel is not marked as NSFW, therefore I cannot process this command");
      glog(message.channel.name, message.author.tag, "nfs [non-nsfw]", message.guild.name);    
    }
    else{
        message.channel.send({embed: {
          color: 2067276,
          title: "Neha's Furry Shit",
          description: "Rawr x3 nuzzles how are you pounces on you you're so warm o3o notices you have a bulge o: someone's happy ;) nuzzles your necky wecky~ murr~ hehehe rubbies your bulgy wolgy you're so big :oooo rubbies more on your bulgy wolgy it doesn't stop growing ·///· kisses you and lickies your necky daddy likies (; nuzzles wuzzles I hope daddy really likes $: wiggles butt and squirms I want to see your big daddy meat~ wiggles butt I have a little itch o3o wags tail can you please get my itch~ puts paws on your chest nyea~ its a seven inch itch rubs your chest can you help me pwease squirms pwetty pwease sad face I need to be punished runs paws down your chest and bites lip like I need to be punished really good~ paws on your bulge as I lick my lips I'm getting thirsty. I can go for some milk unbuttons your pants as my eyes glow you smell so musky :v licks shaft mmmm~ ",
          author: {
            name: `SassIsBacker`,
            icon_url: "https://cdn.discordapp.com/avatars/485628261494292505/cff791984e2a9d1a5b0911dda94fbf01.png"
          }
          
        }});
        // message.channel.send(`Rawr x3 nuzzles how are you pounces on you you're so warm o3o notices you have a bulge o: someone's happy ;) nuzzles your necky wecky~ murr~ hehehe rubbies your bulgy wolgy you're so big :oooo rubbies more on your bulgy wolgy it doesn't stop growing ·///· kisses you and lickies your necky daddy likies (; nuzzles wuzzles I hope daddy really likes $: wiggles butt and squirms I want to see your big daddy meat~ wiggles butt I have a little itch o3o wags tail can you please get my itch~ puts paws on your chest nyea~ its a seven inch itch rubs your chest can you help me pwease squirms pwetty pwease sad face I need to be punished runs paws down your chest and bites lip like I need to be punished really good~ paws on your bulge as I lick my lips I'm getting thirsty. I can go for some milk unbuttons your pants as my eyes glow you smell so musky :v licks shaft mmmm~ <@485628261494292505>`);
        glog(message.channel.name, message.author.tag, "nfs [nsfw]", message.guild.name);
    }

  }

  if(command === "doit") {
    message.channel.send("Do it\nJust do it\n\nDon't let your dreams be dreams\nYesterday you said tomorrow\nSo just do it\nMake your dreams come true\nJust do it\n\nSome people dream of success\nWhile you're gonna wake up and work hard at it\nNothing is impossible\n\nYou should get to the point\nWhere anyone else would quit\nAnd you're not going to stop there\nNo, what are you waiting for?\n\nDo it\nJust do it\nYes you can\nJust do it\nIf you're tired of starting over\nStop giving up");
    glog(message.channel.name, message.author.tag, "doit", message.guild.name);

  }
});

bot.login(process.env.TOKEN);

// require('http').createServer().listen(3000)