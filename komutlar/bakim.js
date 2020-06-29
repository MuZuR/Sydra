const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')

exports.run = (client, message, args) => {
  
  if(message.author.id != ayarlar.sahip) return
  
  if(!args[0]) return message.channel.send(`Bakım modunu açmak için ${ayarlar.prefix}bakım aç`)
  
  if(args[0] === 'aç') {
    if(db.fetch(`bakim`)) return message.channel.send('Bakım modu zaten açık')
    message.channel.send(`Bakım modu açıldı. Kapatmak için: ${ayarlar.prefix}bakım kapat`)
    db.set(`bakim`, 'acik')
  }
  if(args[0] === 'kapat'){
    if(!db.fetch(`bakim`)) return message.channel.send('Bakım modu zaten kapalı.')
    message.channel.send('Bakım modu kapatıldı.')
    db.delete(`bakim`)
  }
  
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
}

exports.help = {
  name: 'bakım'
}