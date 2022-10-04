module.exports = {
	name: "leave",
	description: "Abandona el canal de voz",
	config: {
		enabled: true,
		debug: false,
	},
	async run(client, interaction){
		if (!interaction.guild.members.me.voice.channel) return interaction.reply("No estoy en ningún canal de voz");
		if (!interaction.member.voice.channel || interaction.member.voice.channel != interaction.guild.members.me.voice.channel) return interaction.reply("Debes estar en mi mismo canal para poder ejecutar este comando.");
		client.music.voices.get(interaction)?.leave();
		interaction.reply("Se ha abandonado el canal de voz correctamente");
	}
}