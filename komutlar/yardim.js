const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = '.'
let yardım = new Discord.RichEmbed()  
.setAuthor(`Sydra Yardım Menüsü`)
.setColor('#000000')
.addField('Sydra Botunu Eklemek İsterseniz -davet',`
**:white_small_square: = \`-genel\` : Genel Komutlar**
**:white_small_square: = \`-ayarlar\` : Moderasyon Komutları**
**:white_small_square: = \`-sunucu\` : Sunucu Komutları**
**:white_small_square: = \`-eğlence\` : Eğlence Komutları**
**:white_small_square: = \`-eklenti\` : Eklenti Komutları**`)
.setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL)
.addField('Sydra Bot',`[Botu Davet Et](https://discord.com/oauth2/authorize?client_id=725083973406949497&scope=bot&permissions=8) **|** [Destek Sunucumuz](https://discord.gg/xFCjS3p)`)
.setImage(`https://cdn.discordapp.com/attachments/724354962372427830/725597223018037320/ddca333df63d4e1b9b9cec3980066ff2.png`)
.setThumbnail(client.user.avatarURL)
 message.channel.send(yardım) 
  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["help","music","yardım"], 
  permLevel: 0
};
exports.help = {
  name: 'yardım'
}; 