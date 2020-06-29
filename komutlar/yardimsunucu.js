const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = '.'
let yardım = new Discord.RichEmbed()  
.setAuthor(`Sydra Sunucu Komutları Menüsü`)
.setColor('#000000')
.addField('Sydra Botunu Eklemek İsterseniz -davet',`
**:white_small_square: = \`-duyuru\` : Duyuru Başlatır**
**:white_small_square: = \`-oylama\` : Oylama Başlatır**
**:white_small_square: = \`-aç\` : Sohbet Kanalını Açar**
**:white_small_square: = \`-kapat\` : Sohbet Kanalını Kapatır**
**:white_small_square: = \`-çekiliş\` : Çekiliş Düzenlersiniz**
**:white_small_square: = \`-hızlıçek\` : Anında Çekiliş Yaparsınız**
**:white_small_square: = \`-üyedurum\` : Üyeler Hakkında Bilgi**
**:white_small_square: = \`-scbilgi\` : Sunucu Hakkında Bilgi**
**:white_small_square: = \`-sunucudavet\` : Sunucuya Davet Attar**
**:white_small_square: = \`-destek\` : Özel Destek Kanalı Açar**
**:white_small_square: = \`-reklam-tara\` : Reklamları Tarar**
**:white_small_square: = \`-sil\` : Mesaj Siler**`)
.setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL)
.addField('Sydra Bot',`[Botu Davet Et](https://discord.com/oauth2/authorize?client_id=725083973406949497&scope=bot&permissions=8) **|** [Destek Sunucumuz](https://discord.gg/xFCjS3p)`)
.setImage(`https://cdn.discordapp.com/attachments/724354962372427830/725597223018037320/ddca333df63d4e1b9b9cec3980066ff2.png`)
.setThumbnail(client.user.avatarURL)
 message.channel.send(yardım) 
  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["sunucu"], 
  permLevel: 0
};
exports.help = {
  name: 'sunucu'
}; 