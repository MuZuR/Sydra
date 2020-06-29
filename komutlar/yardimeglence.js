const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = '.'
let yardım = new Discord.RichEmbed()  
.setAuthor(`Sydra Eğlence Menüsü`)
.setColor('#000000')
.addField('Sydra Botunu Eklemek İsterseniz -davet',`
**:white_small_square: = \`-adamol\` : Adam Olursunuz**
**:white_small_square: = \`-kralol\` : Kral Olursunuz**
**:white_small_square: = \`-aşk-ölçer\` : Aşkınızı Ölçer**
**:white_small_square: = \`-bulanık\` : Avarınızı Bulanıklaşdırır**
**:white_small_square: = \`-balıktut\` : Balık Tutarsınız**
**:white_small_square: = \`-tkm\` : TKM Oynarsınız**`)
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
  name: 'eğlence'
}; 