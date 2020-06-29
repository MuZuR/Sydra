const Discord = require("discord.js");
module.exports.run = async (bot, message, args) => {
let bug = args.join(" ").slice(0);
let user = message.author.username;//Kolgh Creations//Kolgh Creations
let guild = message.guild.name;
let guildid = message.guild.id;//Kolgh Creations
let kanal = message.channel.name;
let channel = bot.channels.get("725698994650480751")//bug repot kanal id'i
let embed = new Discord.RichEmbed()//Kolgh Creations//Kolgh Creations//Kolgh Creations//Kolgh Creations
.setTitle("Bug Report")
.setThumbnail("https://cdn.discordapp.com/attachments/545569894268272650/645252657572872192/tosun.png?width=80&height=80")
.addField("Bug", bug)
.addField("Report Eden", user, true)
.addField("Sunucu", guild, true)
.addField("Sunucu ID", guildid, true)//Kolgh Creations
.addField("Kanal", kanal, true)
.setColor("#f49542")//Kolgh Creations//Kolgh Creations
//Kolgh Creations
message.channel.send(":white_check_mark:  **| Bug Report Başarı İle İletildi.**")
channel.send(embed).then(i => i.react(":hourglass_flowing_sand:"))//Kolgh Creations

  //Kolgh Creations

}//Kolgh Creations
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["bug"],
  permLevel: 0  
};

exports.help = {
  name: 'hata-bildir',//Kolgh Creations
  description: 'Çalışıp para kazanırsınız.',
  usage: 'hata-bildir'
}