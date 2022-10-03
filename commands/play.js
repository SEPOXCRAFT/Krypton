module.exports = {
	name: "play",
	description: "Reproduce música",
	options: [
	{
		name: "nombre",
		description: "Nombre/link de la canción",
		type: 3,
		required: true,
	},
	],
	async run(client, interaction){
		client.music.play(interaction.user.voice.channel, interaction.options.getString("nombre"), {
			member: interaction.user,
			textChannel: interaction.channel,
			message: interaction,
		});
	}
}