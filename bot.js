const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');////////fynx
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');////////fynx
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
////////fynx

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "YOUTUBE LORD CREATİVE");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {////////fynx
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);/////////fynx
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });////////fynx
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });/////////lordcreative
            resolve();
        } catch (e) {
            reject(e);
        }////////fynx
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};/////////lordcreative




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {////////fynx
            reject(e);
        }/////////lordcreative
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};/////////lordcreative
//YAPAMIYAN OLURSA LORD CREATİVE'E SORABİLİRSİNİZ VEYA FYNX DİSCORDUNDAN YARDIM ALABİLİRSİNİZ

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   l0RDconsole.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// }); //DEVİLHOUSE//

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);////////fynx

//---------------------------------KOMUTLAR---------------------------------\\

client.on("message", async message => {
  let prefix = (await db.fetch(`prefix_${message.guild.id}`)) || ayarlar.prefix;

  let kullanıcı = message.mentions.users.first() || message.author;
  let afkdkullanıcı = await db.fetch(`afk_${message.author.id}`);
  let afkkullanıcı = await db.fetch(`afk_${kullanıcı.id}`);
  let sebep = afkkullanıcı;
   let isim = db.fetch(`afkK_${message.author.id}`);

  if (message.author.bot) return;
  if (message.content.includes(`${prefix}afk`)) return;

  if (message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
    const embed = new Discord.RichEmbed()
      .setColor('BLUE')
      .setDescription(`<@${message.author.id}> adlı kullanıcı artık AFK değil!`)
       message.channel.send(embed)
      db.delete(`afk_${message.author.id}`);
  }
    if (afkkullanıcı) {
      const embed = new Discord.RichEmbed()
      .setColor('BLUE')
      .setDescription(`<@${kullanıcı.id}> adlı kullanıcı şuan **${sebep}** nedeniyle AFK!`)
      message.channel.send(embed)
    }
  }

  if (!message.content.includes(`<@${kullanıcı.id}>`)) {
    if (afkdkullanıcı) {
      const embed = new Discord.RichEmbed()
      .setColor('BLUE')
      .setDescription(`<@${message.author.id}> adlı kullanıcı artık AFK değil!`)
      message.channel.send(embed)
      db.delete(`afk_${message.author.id}`);
      message.member.setNickname(isim)
  }
    }
});

client.on("message", async message => {
    let uyarisayisi = await db.fetch(`reklamuyari_${message.author.id}_${message.guild.id}`);
    let reklamkick = await db.fetch(`reklamkick_${message.guild.id}`)
    let kullanici = message.member;
    if (reklamkick == 'kapali') return;
    if (reklamkick == 'acik') {
        const reklam = ["discord.app", "discord.gg", "invite", "discordapp", "discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az",];
        if (reklam.some(word => message.content.toLowerCase().includes(word))) {
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                message.delete();
                db.add(`reklamuyari_${message.author.id}_${message.guild.id}`, 1)
                if (uyarisayisi === null) {
             
                  message.channel.send(`<@${message.author.id}>  Reklam Kick Sistemine Yakalandın! Reklam Yapmaya Devam Edersen \`Atılma ve Banlanma\` İhtimalin Var! (1/5)`)
              .then(msg => msg.delete(5000)) 
}
                if (uyarisayisi === 1) {
           
                      message.channel.send(`<@${message.author.id}>  Reklam Kick Sistemine Yakalandın! Reklam Yapmaya Devam Edersen \`Atılma ve Banlanma\` İhtimalin Var! (2/5)`)
                 .then(msg => msg.delete(5000)) 
                }
              
              if (uyarisayisi === 2) {
           
                      message.channel.send(`<@${message.author.id}>  Reklam Kick Sistemine Yakalandın! Reklam Yapmaya Devam Edersen \`Atılma ve Banlanma\` İhtimalin Var! (3/5)`)
               .then(msg => msg.delete(5000))   
              }
              
              if (uyarisayisi === 3) {
           
                      message.channel.send(`<@${message.author.id}> Reklam Kick Sistemine Yakalandın! Reklam Yapmaya Devam Edersen \`Atılma ve Banlanma\` İhtimalin Var! (4/5)`)
               .then(msg => msg.delete(5000))   
              }
              
                if (uyarisayisi === 4) {
                    message.delete();
                    await kullanici.kick({
                        reason: `REKLAM`,
                    })
           
                       message.channel.send(`<@${message.author.id}> 5 Defa Reklam Yaptığı İçin Sunucudan Attım! Bir Daha Yaprsa **Banlıcam.**`)
         .then(msg => msg.delete(60000))     
                }
                if (uyarisayisi === 5) {
                    message.delete();
                    await kullanici.ban({
                        reason: `REKLAM`,
                    })
                    db.delete(`reklamuyari_${message.author.id}_${message.guild.id}`)
                
                       message.channel.send(`<@${message.author.id}> Reklam Yaptığı İçin Önce **Atıldı.** Fakat Tekrardan Gelip Reklam Yaptığı İçin **Banladım.**`)
                .then(msg => msg.delete(60000)) 
                  
}
}
}
}
});

client.on("guildMemberAdd", async (member, guild, message) => {
  let role = db.fetch(`otorolisim_${member.guild.id}`);
  let otorol = db.fetch(`autoRole_${member.guild.id}`);//Lord Creative
  let i = db.fetch(`otorolKanal_${member.guild.id}`);
  if (!otorol || otorol.toLowerCase() === "yok") return;
  else {
    try {
      if (!i) return;
      if (!role) {
        member.addRole(member.guild.roles.get(otorol));
        var embed = new Discord.RichEmbed()
          .setDescription(
            "**Sunucuya Yeni Katılan** @" +
              member.user.tag +
              " **Kullanıcısına** <@&" +
              otorol +
              ">  **Rolü verildi:white_check_mark:**"
          )
          .setColor("0x36393E")
          .setFooter(`wonders Otorol Sistemi`);
        member.guild.channels.get(i).send(embed);
      } else if (role) {
        member.addRole(member.guild.roles.get(otorol));
        var embed = new Discord.RichEmbed()
          .setDescription(
            `**Sunucuya Yeni Katılan** \`${member.user.tag}\` **Kullanıcısına** \`${role}\` **Rolü verildi. <a:blobjoining:696373472431177781>**`
          )
          .setColor("0x36393E")
          .setFooter(`Fays Otorol Sistemi`);
        member.guild.channels.get(i).send(embed);
      }
    } catch (e) {
      console.log(e);
    }
  }
});

client.on("roleDelete", async(role , channel , message , guild) => {
  let rolkoruma = await db.fetch(`rolk_${role.guild.id}`);
    if (rolkoruma == "acik") {
  role.guild.createRole({name: role.name, color: role.color,  permissions: role.permissions}) 
        role.guild.owner.send(` **${role.name}** Adlı Rol Silindi Ve Ben Rolü Tekrar Oluşturdum `)
      
  
}
})

client.on("roleDelete", async(role , channel , message , guild) => {
  let rolkoruma = await db.fetch(`rolk_${role.guild.id}`);
    if (rolkoruma == "acik") {
  role.guild.createRole({name: role.name, color: role.color,  permissions: role.permissions}) 
        role.guild.owner.send(` **${role.name}** Adlı Rol Silindi Ve Ben Rolü Tekrar Oluşturdum `)
      
  
}
}) 

client.on("guildMemberAdd", async member => {
  let frenzysayı = await db.fetch(`FrenzyCode+SayaçSayı_${member.guild.id}`);
  let frenzykanal = await db.fetch(`FrenzyCode+SayaçKanal_${member.guild.id}`);
  if (!frenzysayı || !frenzykanal) return;
  let sonuç = frenzysayı - member.guild.memberCount;
  client.channels
    .get(frenzykanal)
    .send(
      `O Sunucumuza Yeni Biri Geldi Ve İsmi ${member}, Hoşgeldin **${frenzysayı}** Kişiye Ulaşmak İçin  **${sonuç}** Kişi Kaldı.`
    );
});
client.on("guildMemberRemove", async member => {
  let frenzysayı = await db.fetch(`FrenzyCode+SayaçSayı_${member.guild.id}`);
  let frenzykanal = await db.fetch(`FrenzyCode+SayaçKanal_${member.guild.id}`);
  if (!frenzysayı || !frenzykanal) return;
  let sonuç = frenzysayı - member.guild.memberCount;

  client.channels
    .get(frenzykanal)
    .send(
      `Olamaz ${member}, Sunucudan Ayrıldı! **${frenzysayı}** Kişiye Ulaşmak İçin  **${sonuç}** Kişi Kaldı.`
    );
  return;
});

client.on("guildCreate", async guild => {
  let prefix = await db.fetch(`prefix_${guild.id}`) || "a!";
  const embed = new Discord.RichEmbed()
  .setColor("BLACK")
  .setTitle("Teşekkürler!")
  .setDescription(`Merhaba <@${guild.owner.id}>, ben **Sydra**!\nBeni sunucuna eklediğieklediğin için teşekkür ederim!\nKomutlarımı gormek istersen: -yardım yazabilirsin!`)
  guild.owner.send(embed)
})

client.on("message", async message => {
    const ms = require("ms");
    const prefix =
      (await require("quick.db").fetch(`prefix_${message.guild.id}`)) ||
      ayarlar.prefix;
    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();
    let u = message.mentions.users.first() || message.author;
    if (command === "sunucu-kur") {
      if (
        message.guild.channels.find(channel => channel.name === "Bot Kullanımı")
      )
        return message.channel.send(" Bot Paneli Zaten Ayarlanmış.");
      if (!message.member.hasPermission("ADMINISTRATOR"))
        return message.channel.send(
          " Bu Kodu `Yönetici` Yetkisi Olan Kişi Kullanabilir."
        );
      message.channel.send(
        `Bot Bilgi Kanallarının kurulumu başlatılsın mı? başlatılacak ise **evet** yazınız.`
      );
      message.channel
        .awaitMessages(response => response.content === "evet", {
          max: 1,
          time: 10000,
          errors: ["time"]
        })
        .then(collected => {
          message.guild.createChannel("|▬▬|ÖNEMLİ KANALLAR|▬▬|", "category", [
            {
              id: message.guild.id,
              deny: ["SEND_MESSAGES"]
            }
          ]);

          message.guild
            .createChannel("「📃」kurallar", "text", [
              {
                id: message.guild.id,
                deny: ["SEND_MESSAGES"]
              }
            ])//Lord Creative
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel("「🚪」gelen-giden", "text", [
              {
                id: message.guild.id,
                deny: ["SEND_MESSAGES"]
              }
            ])
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel("「✅」sayaç", "text", [
              {
                id: message.guild.id,
                deny: ["SEND_MESSAGES"]
              }
            ])
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel("「💾」log-kanalı", "text", [
              {
                id: message.guild.id,
                deny: ["SEND_MESSAGES"]
              }
            ])
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel("「📢」duyuru-odası", "text", [
              {
                id: message.guild.id,
                deny: ["SEND_MESSAGES"]
              }
            ])//Lord Creative
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|ÖNEMLİ KANALLAR|▬▬|"
                )
              )
            );
        })
        .then(collected => {
          message.guild.createChannel("|▬▬|GENEL KANALLAR|▬▬|", "category", [
            {
              id: message.guild.id
            }
          ]);

          message.guild
            .createChannel(`「💡」şikayet-ve-öneri`, "text")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`「👥」pre-arama-odası`, "text")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`「📷」görsel-içerik`, "text")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`「🤖」bot-komutları`, "text")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`「💬」sohbet`, "text")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(//Lord Creative
                  channel => channel.name === "|▬▬|GENEL KANALLAR|▬▬|"
                )
              )
            );

          message.guild
            .createChannel(`🏆》Kurucu Odası`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|SES KANALLARI|▬▬|"
                )
              )
            )
            .then(c => {
              let role = message.guild.roles.find("name", "@everyone");
              let role2 = message.guild.roles.find("name", "Kurucu");

              c.overwritePermissions(role, {
                CONNECT: false
              });
              c.overwritePermissions(role2, {
                CONNECT: true
              });
            });

          message.guild.createChannel("|▬▬|SES KANALLARI|▬▬|", "category", [
            {
              id: message.guild.id
            }
          ]);

          message.guild
            .createChannel(`🏆》Yönetici Odası`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|SES KANALLARI|▬▬|"
                )
              )
            )
            .then(c => {
              let role = message.guild.roles.find("name", "@everyone");
              let role2 = message.guild.roles.find("name", "Kurucu");
              let role3 = message.guild.roles.find("name", "Yönetici");
              c.overwritePermissions(role, {
                CONNECT: false
              });
              c.overwritePermissions(role2, {
                CONNECT: true
              });
              c.overwritePermissions(role3, {
                CONNECT: true
              });
            });

          message.guild//Lord Creative
            .createChannel(`💬》Sohbet Odası`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|SES KANALLARI|▬▬|"
                )
              )
            )
            .then(c => {
              let role = message.guild.roles.find("name", "@everyone");
              c.overwritePermissions(role, {
                CONNECT: true
              });
            });

          message.guild.createChannel("|▬▬|OYUN ODALARI|▬▬|", "category", [
            {
              id: message.guild.id
            }
          ]);

          message.guild
            .createChannel(`🎮》LOL`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`🎮》ZULA`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`🎮》COUNTER STRİKE`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`🎮》PUBG`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )//Lord Creative
              )
            );
          message.guild
            .createChannel(`🎮》FORTNİTE`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`🎮》MİNECRAFT`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`🎮》ROBLOX`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )
              )
            );
          message.guild
            .createChannel(`🎮》WOLFTEAM`, "voice")
            .then(channel =>
              channel.setParent(
                message.guild.channels.find(
                  channel => channel.name === "|▬▬|OYUN ODALARI|▬▬|"
                )
              )
            );

          message.guild.createRole({
            name: "Kurucu",
            color: "RED",
            permissions: ["ADMINISTRATOR"]
          });

          message.guild.createRole({
            name: "Yönetici",
            color: "BLUE",
            permissions: [
              "MANAGE_GUILD",
              "MANAGE_ROLES",
              "MUTE_MEMBERS",
              "DEAFEN_MEMBERS",
              "MANAGE_MESSAGES",
              "MANAGE_NICKNAMES",
              "KICK_MEMBERS"
            ]
          });
//Lord Creative
          message.guild.createRole({
            name: "Moderatör",
            color: "GREEN",
            permissions: [
              "MANAGE_GUILD",
              "MANAGE_ROLES",
              "MUTE_MEMBERS",
              "DEAFEN_MEMBERS",
              "MANAGE_MESSAGES",
              "MANAGE_NICKNAMES"
            ]
          });

          message.guild.createRole({
            name: "V.I.P",
            color: "00ffff"
          });

          message.guild.createRole({
            name: "Üye",
            color: "WHITE"
          });

          message.guild.createRole({
            name: "Bot",
            color: "ORANGE"
          });
//Lord Creative
          message.channel.send("Gerekli Odalar Kuruldu!");
        });
    }
  });
//Lord Creative
client.on('ready', () =>{
client.channels.get('722540071684800583').join()
})

client.on("guildMemberAdd", async member => {
let fynx_cod = client.channels.get("725290243275882509"); 
fynx_cod.setName(`Son Üye : ${member.user.username}`)
})


client.on('guildMemberAdd', member => {
  let guild = member.guild;
  const channel = member.guild.channels.find('name', '「ꇓ公」kayıtsız');
  if (!channel) return;
  const embed = new Discord.RichEmbed()
  .setColor('RED')
        .setAuthor(`Kayıt Sistemi`)
            .addField(`Hoş Geldin`,`**Hoşgeldin** ${member} **Seninle \`${member.guild.memberCount}\` Kişiyiz**`)
         .addField(`Kayıt Olmak İçin`,`**İsmini ve Yaşını Yaz │ Kayıt Ekibimiz  İlgilenecektir**`)
  channel.sendEmbed(embed); 
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === '-kayıt') {  //BUNU YAZINCA ALTTAKİ MESAJ GİDİCEK
   msg.reply('Kayıt Sistemi eklemek için <`-kayıt-rol @rol`/`-kayıt-kanal #kanal`/`-kayıt-log #kanal`> şeklinde Ayarlıya bilirsiniz.'); //YUKARIDAKİNİ YAZINCA BU CEVABI VERİCEK
  }
});



const invites = {};

const wait = require("util").promisify(setTimeout);

client.on("ready", () => {
  wait(1000);

  client.guilds.forEach(g => {
    g.fetchInvites().then(guildInvites => {
      invites[g.id] = guildInvites;
    });
  });
});

client.on('guildMemberAdd', async(member) => {
  let kayitkanali = await db.fetch(`kayitkanali_${member.guild.id}`);
  let kayithosgeldinmesaji = await db.fetch(`kayithosgeldinmesaji_${member.guild.id}`);
  try {
    if(client.channels.has(kayitkanali)) { await client.channels.get(kayitkanali).send(kayithosgeldinmesaji.replace('(uye)', member)) };
  } catch(err) { }
});

client.on('guildMemberAdd',async member => {
  let user = client.users.get(member.id);
  let chan = client.channels.get(db.fetch(`guvenlik${member.guild.id}`)) 
       const kobs = require('kobs')
       const obs = kobs.createkobs(360,100);
       const ctx = kobs.getContext('2d');
  
  const resim1 = await kobs.loadImage('https://cdn.discordapp.com/attachments/725278880679854091/725644207900852264/IMG_20200625_132948.png')
    const resim2 = await kobs.loadImage('https://cdn.discordapp.com/attachments/725278880679854091/725644187537768498/IMG_20200625_133041.png')
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    
    var kontrol;
      if (kurulus > 1296000000) kontrol = resim1
    if (kurulus < 1296000000) kontrol = resim2

  const avatar = await kobs.loadImage(member.user.displayAvatarURL);
  ctx.drawImage(kontrol,0,0,kobs.width, canvas.height)
  ctx.beginPath();
    ctx.lineWidth = 4;
  ctx.fill()
    ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
    ctx.clip();
  ctx.drawImage(avatar, 143,10, 73, 72  );

   
chan.send(new Discord.Attachment(canvas.toBuffer(), "oskobs.png"))
});

client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;

  let i = await db.fetch(`küfürFiltre_${msg.guild.id}`);
  if (i == "acik") {
    const küfür = [
      "amcık",
      "yarrak",
      "orospu",
      "piç",
      "sikerim",
      "sikik",
      "amına",
      "pezevenk",
      "yavşak",
      "ananı",
      "anandır",
      "orospu",
      "evladı",
      "göt",
      "pipi",
      "sokuk",
      "yarak",
      "bacını",
      "karını",
      "amk",
      "aq",
      "mk",
      "anaskm"
    ];
    if (küfür.some(word => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("MANAGE_WEBHOOKS")) {
          msg.delete();
          let embed = new Discord.RichEmbed()
            .setColor(0xffa300)
            .setFooter("Küfür Sistemi", client.user.avatarURL)
            .setAuthor(
              msg.guild.owner.user.username,
              msg.guild.owner.user.avatarURL
            )
            .setDescription(
              "Sydra"
                `***${msg.guild.name}***` +
                " adlı sunucunuzda küfür yakaladım."
            )
            .addField(
              "Küfür Eden Kişi",
              "Kullanıcı: " + msg.author.tag + "\nID: " + msg.author.id,
              true
            )
            .addField("Engellenen mesaj", msg.content, true)
            .setTimestamp();
          msg.guild.owner.user.send(embed);
          return msg.channel
            .send(
              `${msg.author}, Küfür Etmek Yasak! Senin Mesajını Özelden Kurucumuza Gönderdim.`
            )
            .then(msg => msg.delete(25000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});
///reklam///
client.on("message", async msg => {
  let antoxd = await db.fetch(`antoxd${msg.guild.id}`);
  if (antoxd === "acik") {//Lord Creative
    const reklam = ["discord.gg", "https://discordapp.com/invite/"];
    if (reklam.some(word => msg.content.includes(word))) {
      msg.delete();
    }
  }
});

client.on("message", async msg => {
  if (msg.author.bot) return;
  if (msg.channel.type === "dm") return;

  let i = await db.fetch(`reklamFiltre_${msg.guild.id}`);
  if (i == "acik") {
    const reklam = [
      "discord.app",
      "discord.gg",
      "invite",
      "discordapp",
      "discordgg",
      ".com",
      ".net",//Lord Creative
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az"
    ];
    if (reklam.some(word => msg.content.toLowerCase().includes(word))) {
      try {
        if (!msg.member.hasPermission("MANAGE_GUILD")) {
          msg.delete();
          let embed = new Discord.RichEmbed()
            .setColor(0xffa300)
            .setFooter(
              "Reklam engellendi.",
              client.user.avatarURL
            )
            .setAuthor(
              msg.guild.owner.user.username,
              msg.guild.owner.user.avatarURL
            )
            .setDescription(
              " Reklam Sistemi, " +
                `**${msg.guild.name}**` +
                " Adlı Sunucuda Reklam Yakaladım."
            )
            .addField(
              "Reklamı yapan kişi",
              "Kullanıcı: " + msg.author.tag + "\nID: " + msg.author.id,
              true
            )
            .addField("Engellenen mesaj", msg.content, true)
            .setTimestamp();
          msg.guild.owner.user.send(embed);
          return msg.channel
            .send(`${msg.author.tag}, Reklam Yapmak Yasak!`)
            .then(msg => msg.delete(25000));
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  if (!i) return;
});

client.on("guildMemberAdd", member => {  
if(member.guild.id != "719228347720138753") return
  const kanal = "719825426184274001";
  let user = client.users.get(member.id);
  require("moment-duration-format");
    const kurulus = new Date().getTime() - user.createdAt.getTime();  
    var kontrol;
if (kurulus < 1296000000) kontrol = ' **Bu Hesap Güvenilir Değil :onaylanmams: ** '
if (kurulus > 1296000000) kontrol = ' **Bu Hesap Güvenilir :onaylanmis:** '
  moment.locale("tr");
  let buse = client.channels.get(kanal);
buse.send("**:blobjoin: Hoşgeldin " + member + " Seninle Birlikte \`" + member.guild.memberCount + "\`Kişiyiz \n\n :loadingdot:Kayıt Olmak İçin n :blobhappy: <@&723160517623021679> Rolündeki yetkililer seninle iliglencektir**\n\n :dikkat:Hesabın Oluşturulma Tarihi:" + moment(member.user.createdAt).format("YYYY **__DD MMMM dddd (hh:mm:ss)__**") +  "  \n\n"  + kontrol + " \n\n",  new Discord.Attachment("https://cdn.discordapp.com/avatars/725429810817531964/33638f0973b537dfffea09abee267604.png"
    )
  );
});

//eklendim-atıldım
client.on("guildCreate", guild => {  // sunucuya eklendim ve atıldım
let add = client.channels.get("725699143997325352")
const eklendim = new Discord.RichEmbed()


.setTitle(`Hayırlı Olsun Yeni Bir Sunucuya Eklendim`)
.setTimestamp()
.setColor("GREEN")
.setThumbnail(guild.iconURL)
.addField(`Sunucu İsmi`,guild.name)
.addField(`Sunucu ID`, guild.id)
.addField(`Kurucu`,guild.owner.user.tag)
.addField(`Kurucu ID`,guild.owner.user.id)
.addField(`Üye Sayısı`,guild.memberCount)

add.send(eklendim)//Kolgh Creations

});

client.on("guildDelete", guild => {
let remove = client.channels.get("725699183901671454")
const atildim = new Discord.RichEmbed()

.setTitle(`Kötü Bir Haberim Var Bu Sunucudan Atıldım`)
.setTimestamp()
.setColor("RED")
.setThumbnail(guild.iconURL)
.addField(`Sunucu İsmi`,guild.name)
.addField(`Sunucu ID`, guild.id)
.addField(`Kurucu`,guild.owner.user.tag)
.addField(`Kurucu ID`,guild.owner.user.id)
.addField(`Üye Sayısı`,guild.memberCount)

remove.send(atildim)

});

client.on('message', message => {
 if (message.content.toLowerCase() === '<@717411894897672212>') {
 message.delete()
 message.channel.send(`${message.author}, **Sahibimi Etiketlemeyi Bırak!**`).then(message => message.delete(5000))
 message.channel.send(`${message.author}, **O Etiketlenemez!**  `).then(message => message.delete(5000))
}
});

client.on("message", async msg => {
const request = require('node-superfetch');
const db = require('quick.db');
const ms = require('parse-ms')
let zamans = 600000
let norman = await db.fetch(`gold_${msg.author.id}`);
let i = ayarlar.sahip
          if (msg.author.id == i) {
          if (norman !== null && zamans - (Date.now() - norman) > 0) {
          let time = ms(zamans - (Date.now() - norman));
          } else {
          if(msg.author.bot) return;   
          if (msg.content.length > 1) {
          db.set(`shp_${msg.author.id}`, Date.now());
                var nrmn = new Discord.RichEmbed()
                .setAuthor(`Sahibim ${msg.author.username}`,`${msg.author.avatarURL || msg.author.displayAvatarURL}`)
                .setDescription(`**Sahibim Geldi** <@${msg.author.id}>`)
                .setColor("RANDOM")
                .setFooter("Benim Sahibim Beliri!!")
                msg.channel.send(nrmn)
  }
};
          }
   else if (i == undefined) {           
          }
          if (!i) return;
        
})

client.on("message", async msg => {
  if(msg.channel.type === "dm") return
  if(msg.author.bot) return;  
  if(msg.content.length < 4) return
  if(!db.fetch(`capslock_${msg.guild.id}`)) return
  let caps = msg.content.toUpperCase();
  if(msg.content == caps) {
    if(msg.member.hasPermission("BAN_MEMBERS")) return
    let yashinu = msg.mentions.users.first() || msg.mentions.channels.first() || msg.mentions.roles.first();
    if(!yashinu && !msg.content.includes('@everyone') && !msg.content.includes('@here')) {
      msg.delete(50)
      return msg.channel.sendEmbed(new Discord.RichEmbed().setAuthor(client.user.username, client.user.avatarURL).setColor('RANDOM').setDescription(`${msg.author} Fazla büyük harf kullanmamalısın!`)).then(m => m.delete(5000))
    }
  }
});
client.on("messageUpdate", async (oldMsg, newMsg) => {
  if(newMsg.channel.type === "dm") return
  if(newMsg.author.bot) return;  
  if(newMsg.content.length < 4) return
  if(!db.fetch(`capslock_${newMsg.guild.id}`)) return
  let caps = newMsg.content.toUpperCase();
  if(newMsg.content == caps) {
    if(newMsg.member.hasPermission("BAN_MEMBERS")) return
    let yashinu = newMsg.mentions.users.first() || newMsg.mentions.channels.first() || newMsg.mentions.roles.first();
    if(!yashinu && !newMsg.content.includes('@everyone') && !newMsg.content.includes('@here')) {
      newMsg.delete(50)
      return newMsg.channel.sendEmbed(new Discord.RichEmbed().setAuthor(client.user.username, client.user.avatarURL).setColor('RANDOM').setDescription(`${msg.author} Fazla büyük harf kullanmamalısın!`)).then(m => m.delete(5000))
    }
  }
});

client.on("message", msg => {
  var dm = client.channels.get("725699069535846490"); //mesajın geleceği kanal idsi//
  if (msg.channel.type === "dm") {
    if (msg.author.id === client.user.id) return;
    const botdm = new Discord.RichEmbed()
      .setTitle(`${client.user.username} Dm`)
      .setTimestamp()
      .setColor("BLUE")
      .setThumbnail(`${msg.author.avatarURL}`)
      .addField(":boy: Gönderen ", msg.author.tag)
      .addField(":id:  Gönderen ID :", msg.author.id)
      .addField(":globe_with_meridians: Gönderilen Mesaj", msg.content);
 
    dm.send(botdm);
  }
  if (msg.channel.bot) return;
});

client.on("message", async msg => {
  const i = await db.fetch(`ssaass_${msg.guild.id}`);
  if (i == "acik") {
    if (
      msg.content.toLowerCase() == "sa" ||
      msg.content.toLowerCase() == "slm" ||
      msg.content.toLowerCase() == "selamun aleyküm"
    ) {
      try {
        return msg.reply(
          "**Aleyküm Selam, Hoşgeldin** <a:hype:722456683477205045>"
        );
      } catch (err) {
        console.log(err);
      }
    }
  } else if (i == "kapali") {
  }
  if (!i) return;
});

///////
  client.on("roleDelete", async(role , guild) => {
  let a = await db.fetch(`rol_${role.guild.id}`);
    if (a == "açık") {
  role.guild.createRole({name: role.name, color: role.color,  permissions: role.permissions}) 
        role.guild.owner.send(` **${role.name}** Adlı Rol Sılındı Aynısından Ben Tekrar Olusturdum Efendim`)

  
}
})

if(db.fetch(`bakim`)) {
  if(message.author.id !== "717411894897672212") {return message.channel.send('Şuanda Bakım Modu Açıktır.')}
}

client.on('ready', () =>{
client.channels.get('726851112908358214').join()
})

client.on('message', async message => {
    var command = message.content.toLowerCase().slice(prefix.length).split(' ')[0];
    var args = message.content.split(' ').slice(1);

  if (command === 'modlog') {
    message.delete()
    let kanallars = args.slice(0).join(" ");

    try{
      let denemekan = message.guild.channels.cache.find(c => c.name == kanallars)
      db.set(`kanalslar_${message.guild.id}`, denemekan.id)
      db.set(`kanalslars_${message.guild.id}`, "aktif")

      message.channel.send("Modlog Kanalı Başarıyla Ayarlandı:  <#" + denemekan.id + ">")
      return;
         }catch(e){
          message.channel.send("Böyle Bir Kanal Bulunamadı")
        }
  }

if(command == "modlogkapat"){
    message.delete()
    if(message.member.hasPermission("ADMINISTRATOR")) {
      db.delete(`kanalslar_${message.guild.id}`)
      db.delete(`kanalslars_${message.guild.id}`)
  
    const embed52 = new Discord.MessageEmbed()
    .setColor(0xdb710d)
    .setDescription("Modlog Kanalı Kapatıldı!")
    .setTimestamp()
    .setFooter("Bu Mesaj 10 Saniye İçerisinde Silinecektir")
  
    message.channel.send(embed52)
  }else{
    message.reply("Gerekli Yetkiye Sahip Değilsin!").then(msg => {
      msg.delete({ timeout: 10000 })
    })
  }
  }
});