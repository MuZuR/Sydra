const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = '.'
let yardım = new Discord.RichEmbed()  
.setAuthor(`Sydra Davet Menüsü`)
.setColor('#000000')
.addField('Sydra Botunu Eklemek İsterseniz -davet',`
**:white_small_square: = \`-davet-kanal\` : Davet Kanalı Belirlersiniz**
**:white_small_square: = \`-davet-ekle\` : Seçilen Kullanıcıya Davet Ekler**
**:white_small_square: = \`-davet-sil\` : Seçilen Kullanıcıya Davet Siler**
**:white_small_square: = \`-davet-sıfırla\` : Tüm Davetleri Siler**
**:white_small_square: = \`-davet-kanal-sıfırla\` : Davet Kanalını Siler**
**:white_small_square: = \`-davetler\`  : Tüm Davetlerini Gösterir**`)
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
  name: 'invite'
}; 