const Discord = require('discord.js');
exports.run = function(client, message) {
 const embed = new Discord.RichEmbed()
  .setThumbnail("https://cdn.discordapp.com/attachments/724566885303320628/725069743698083900/images.png")
    .setColor('Bot İsmi İstatistik')
    .addField(' Gecikme', client.ping + 'ms')
    .addField(' Kullanıcılar', client.guilds.reduce((a, b) => a + b.memberCount, 0))
    .addField(' Kanallar', client.channels.size)
    .addField(' Sunucular', client.guilds.size)
    .addField(' Bellek Kullanımı', (process.memoryUsage().heapUsed / 2048 / 2048).toFixed(2))
    .addField(' Kütüphanesi', `Discord.js`)
    .addField(' Yapımcım', '<@717411894897672212>')
    .addField(' Botun Yapılmaya Başlandığı Tarih ', '**24.06.2020**')
  message.channel.send(embed);
};
exports.conf = {
  enabled: true, 
  guildOnly: false,
  aliases: ['botbilgi','i'], 
  permLevel: 0 
};
exports.help = {
  name: 'botbilgi', 
  description: 'Botun İstatiğini Atar',
  usage: 'istatistik' 
};
