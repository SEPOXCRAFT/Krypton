module.exports = async (client, queue, playlist) => {
	const Discord = require("discord.js")
	const embed = new Discord.EmbedBuilder()
	.setAuthor({ name: `Queue - ${queue.textChannel.guild.name}`, iconURL: queue.textChannel.guild.iconURL({ dynamic: true })})
	.setColor("Random")
	.setDescription(`**Añadido a la queue • [${playlist.name}](${playlist.url})** \`${queue.formattedDuration}\` (${playlist.songs.length} canciones) • ${playlist.user}`)
	queue.textChannel.send({ embeds: [embed] })
}