const Discord = require("discord.js");//Kolgh Creations
module.exports.run = async (bot, message) => {//Kolgh Creations
	var emojis = message.guild.emojis.array();//Kolgh Creations
	if (!emojis || emojis === []) return message.reply("Sunucuya hiç emoji eklenmemiş!");//Kolgh Creations
	if (emojis.length > 1) {//Kolgh Creations
		var page = 1;//Kolgh Creations
		var totalpages = emojis.length;//Kolgh Creations
		var embed = new Discord.RichEmbed()//Kolgh Creations
			.setTitle("Sunucuya Eklenen Emojiler")//Kolgh Creations
			.setDescription(`:${emojis[page - 1].name}:`)//Kolgh Creations
			.setImage(emojis[page - 1].url)//Kolgh Creations
			.setFooter(`Sayfa ${page}/${totalpages} | Emoji ID: ${emojis[page - 1].id}`)//Kolgh Creations
			.setColor("BLUE");//Kolgh Creations
		message.channel.send(embed).then(async function (sentEmbed) {//Kolgh Creations
			const emojiArray = ["◀", "▶"];//Kolgh Creations
			const filter = (reaction, user) => emojiArray.includes(reaction.emoji.name) && user.id === message.author.id;//Kolgh Creations
			await sentEmbed.react(emojiArray[0]).catch(function () { });//Kolgh Creations
			await sentEmbed.react(emojiArray[1]).catch(function () { });//Kolgh Creations
			var reactions = sentEmbed.createReactionCollector(filter, {//Kolgh Creations
				time: 300000//Kolgh Creations
			});//Kolgh Creations
			reactions.on("collect", async function (reaction) {//Kolgh Creations
				await reaction.remove(message.author);//Kolgh Creations
				if (reaction.emoji.name === "◀") {//Kolgh Creations
					if (page !== 1) {//Kolgh Creations
						page = page - 1;//Kolgh Creations
					} else {//Kolgh Creations
						page = totalpages;//Kolgh Creations
					}//Kolgh Creations
				} else {
					if (page !== totalpages) {//Kolgh Creations
						page = page + 1;//Kolgh Creations
					} else {//Kolgh Creations
						page = 1;//Kolgh Creations
					}//Kolgh Creations
				}//Kolgh Creations
				embed = new Discord.RichEmbed()
					.setTitle("Sunucuya Eklenen Emojiler")
					.setDescription(`:${emojis[page - 1].name}:`)
					.setImage(emojis[page - 1].url)
					.setFooter(`Sayfa ${page}/${totalpages} | Emoji ID: ${emojis[page - 1].id}`)
					.setColor("BLUE");
				sentEmbed.edit(embed).catch(function () { });
			});
			reactions.on("end", () => sentEmbed.edit("Etkileşimli komut sona erdi: 5 dakika geçti."));
		}).catch(() => {
			message.reply("Bu embed'i göndermeye çalışırken bir hata oluştu.").catch(() => {
				message.author.send(`Komut zaten çalışmakta ${message.channel}`).catch(function () { });
			});
		});
	} else {
		let emojiembed = new Discord.RichEmbed()
			.setTitle("Sunucuya Eklenen Emojiler")
			.setDescription(`:${emojis[0].name}:`)
			.setImage(emojis[0].url)
			.setFooter(`Sayfa ${1}/${1} | Emoji ID: ${emojis[0].id}`)
			.setColor("BLUE");
		message.channel.send(emojiembed);
	}
};
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["emojiler"],
  permLevel: 0
};

module.exports.help = {
  name: 'emoji',
  description: 'Sayfalı emojiler',
  usage: 'emoji'
};