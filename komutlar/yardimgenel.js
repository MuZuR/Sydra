const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = '.'
let yardım = new Discord.RichEmbed()  
.setAuthor(`Sydra Genel Komut Menüsü`)
.setColor('#000000')
.addField('Sydra Botunu Eklemek İsterseniz -davet',`
**:white_small_square: = \`-davet\` :  Botu Davet Edersiniz**
**:white_small_square: = \`-hata-bildir\` : Hata Bildirirsiniz**
**:white_small_square: = \`-profil\` : Kullanıcı Bilgilerini Gösterir**
**:white_small_square: = \`-botbilgi\` : Bot Hakkında Bilgi Verir**
**:white_small_square: = \`-afk\` : Sunucuda AFK Olursunuz**
**:white_small_square: = \`-korona\` : Korona Hakkında Bilgi Verir**
**:white_small_square: = \`-avatar\` : Avatarını Görürsün**
**:white_small_square: = \`-yapımcım\` : Geliştiricilerimi Görebilirsiniz**
**:white_small_square: = \`-yaz\` : İstediğiniz şeyi bota yazdırır**`)
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
  name: 'genel'
}; 