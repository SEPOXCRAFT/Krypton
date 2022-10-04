module.exports = async (client, queue) => {
	queue.textChannel.send(`**No hay nadie en el canal de voz**. Si nadie se conecta en **15 segundos** el bot se detendrá.`)
	setTimeout(() => {
		if (client.guild.members.me.voice.channel.members.size > 1) return;
	}, 15000)
	client.music.stop(client.guild);
}