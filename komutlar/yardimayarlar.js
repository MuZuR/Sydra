const Discord = require('discord.js');
exports.run = async (client, message, args) => { 
let prefix = '.'
let yardım = new Discord.RichEmbed()  
.setAuthor(`Sydra Moderasyon Menüsü`)
.setColor('#000000')
.addField('Sydra Botunu Eklemek İsterseniz -davet',`
**:white_small_square: = \`-reklam-engel\` : Reklamları Siler**
**:white_small_square: = \`-küfür-engel\` : Hata Bildirirsiniz**
**:white_small_square: = \`-otorol\` : Gelen Herkese Oto Rol Verir**
**:white_small_square: = \`-ototag\` : Gelen Herkese Oto Tag Verir**
**:white_small_square: = \`-ban\` : Belirtilen Kişiyi Banlar**
**:white_small_square: = \`-kick\` : Belirtilen Kişiyi Kickler**
**:white_small_square: = \`-unban\` : Belirtilen Kişinin Banını Açar**
**:white_small_square: = \`-modlog\` : Sunucunuzun Loglarını Tutarsınız**
**:white_small_square: = \`-sayaç\` : Sunucunuza Sayaç Kurarsınız**
**:white_small_square: = \`-uyar\` : Belirtilen Kişiyi Uyarır**
**:white_small_square: = \`-sayaç-kapat\` : Sayaçı Kapatırsınız**
**:white_small_square: = \`-bansay\` : Sunucudaki Banlananları Sayar**
**:white_small_square: = \`-banaffı\` : Herkesın Banını Açar**
**:white_small_square: = \`-yavaşmod\` : Sohbeti Yavaşlatır**
**:white_small_square: = \`-güvenlik\` : Üyeleri Kontrol Eder**
**:white_small_square: = \`-rol-ver\` : Rol verir**`)
.setFooter(`${message.author.tag} Tarafından İstendi.`, message.author.avatarURL)
.addField('Sydra Bot',`[Botu Davet Et](https://discord.com/oauth2/authorize?client_id=725083973406949497&scope=bot&permissions=8) **|** [Destek Sunucumuz](https://discord.gg/xFCjS3p)`)
.setImage(`https://cdn.discordapp.com/attachments/724354962372427830/725597223018037320/ddca333df63d4e1b9b9cec3980066ff2.png`)
.setThumbnail(client.user.avatarURL)
 message.channel.send(yardım) 
  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ["ayarlar"], 
  permLevel: 0
};
exports.help = {
  name: 'ayarlar'
}; 