module.exports = {
	name: "stop",
	description: "Para la música",
	config: {
		enabled: true,
		debug: false
	},
	async run(client, interaction){
		if (!interaction.guild.members.me.voice.channel) return interaction.reply("No estoy en ningún canal de voz");
		if (!interaction.member.voice.channel || interaction.member.voice.channel != interaction.guild.members.me.voice.channel) return interaction.reply("Debes estar en mi mismo canal para poder ejecutar este comando.");
		client.music.stop(interaction)
		interaction.reply("La musica se ha parado.")
	}
}