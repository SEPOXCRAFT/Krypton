module.exports = {
	name: "skip",
	description: "Salta la canción actual",
	config: {
		enabled: true,
		debug: false,
	},
	async run(client, interaction){
		if (!interaction.guild.members.me.voice.channel) return interaction.reply("No estoy en ningún canal de voz");
		if (!interaction.member.voice.channel || interaction.member.voice.channel != interaction.guild.members.me.voice.channel) return interaction.reply("Debes estar en mi mismo canal para poder ejecutar este comando.");
		const { songs } = client.music.getQueue(interaction)
		if (!songs[1]) return interaction.reply("No hay ninguna canción más (¿Querías decir \"/stop\"?)");
		interaction.reply("Canción "+songs[0].name+" ha sido saltada.")
		client.music.skip(interaction);
	}
}