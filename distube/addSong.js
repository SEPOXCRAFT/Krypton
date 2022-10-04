module.exports = async (client, queue, song) => {
	const Discord = require("discord.js")
	const embed = new Discord.EmbedBuilder()
	.setAuthor({ name: `Queue - ${queue.textChannel.guild.name}`, iconURL: queue.textChannel.guild.iconURL({ dynamic: true })})
	.setColor("Random")
	.setDescription(`**Añadido a la queue • [${song.name}](${song.url})** \`${song.formattedDuration}\` • ${song.user}`)
	queue.textChannel.send({ embeds: [embed] })
}