const Discord = require('discord.js');
const config = require("./config.json");
const bot = new Discord.Client();
const token = require("./config.json");
const RichEmbed = require("discord.js");
//youtube
// const YouTube = require('simple-youtube-api');
// const youtube = new YouTube(botconfig.YoutubeAPI);

//commands
bot.commands = new Discord.Collection();
/*
const botCommands = require('./commands');
bot.readdir("./commands/", (err, files) =>{
  if(err) console.log(err);

	let jsfile = files.filter(f => f.split(".").pop() === "js")
	if(jsfile.length <= 0){
		console.log("沒有找到指令!")
		return;
	}
  jsfile.forEach((f, i) =>{
		let props = require(`./commands/${f}`);
		let hrStart = process.hrtime()
		let hrDiff;
		hrDiff = process.hrtime(hrStart);
		console.log(`${f} 指令已載入! 載入耗時: ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ''}${hrDiff[1] / 1000000}ms.`);
		bot.commands.set(props.help.name, props);
	});
});

Object.keys(botCommands).map(key => {
    bot.commands.set(botCommands[key].name, botCommands[key]);
});
*/
bot.on('ready', () => {
  console.log(`成功登入 ${bot.user.tag}!`);
});
// Create an event listener for new guild members
bot.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find(ch => ch.name === 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}`);
});
bot.on('message', msg => {
  const prefix = "!";
  if(msg.author.bot) return;
  if(!msg.guild) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (msg.content.startsWith('嗨')) {
    msg.reply('嗨你不邊緣 至少還有我~');
  }
  if(!msg.content.startsWith(prefix)) return;
  //以下指令區
  if(cmd === "say"){
    if(msg.deletable) msg.delete();

    if(args.length < 1)
      return msg.reply("Nothing to say?").then(m => m.delete(5000));

      const roleColor = msg.guild.me.displayHexColor === "#000000" ? "#ffffff" : msg.guild.me.displayHexColor;

      if(args[0].toLowerCase() === "embed") {
        const embed = new Discord.RichEmbed()
          .setColor(roleColor)
          .setDescription(args.slice(1).join(" "))
          .setTimestamp()
          .setImage(bot.user.displayAvatarURL)
          .setAuthor(msg.author.username, msg.author.displayAvatarURL);
          msg.channel.send(embed);
      } else {
        msg.channel.send(args.join(" "));
      }
  }
  if(cmd === "post"){
    if(msg.deletable) msg.delete();

    if(args.length < 1)
      return msg.reply("Nothing to say?").then(m => m.delete(5000));

      const roleColor = msg.guild.me.displayHexColor === "#000000" ? "#ffffff" : msg.guild.me.displayHexColor;//GG人的顏色
      const color = "#000000";//黑色
      const embed = new Discord.RichEmbed()
          .setColor(roleColor)
          .setDescription(args.slice(0).join(" "))
          .setTimestamp()
          // .setImage(bot.user.displayAvatarURL)
          .setAuthor(msg.author.username, msg.author.displayAvatarURL);
      msg.channel.send(embed);
  }
  if(cmd === "?"){
    if(msg.deletable) msg.delete();
    const cmds = "say x: GG人講話x\npost x : post訊息x";
    msg.channel.send(cmds);
  }
});
bot.on('message', msg => {
  if (msg.content === '!embed') {
    msg.reply({embed:{
      title: "titleTest",
      description: "description",
      color: 0xFFFFFF
    }});
  }
});
bot.login(config.token);
