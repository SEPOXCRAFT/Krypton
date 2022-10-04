module.exports = {
	name: "volume",
	description: "Establece el volumen de la música",
	config: {
		enabled: true,
		debug: false,
	},
	options: [
	{
		name: "porcentaje",
		description: "Porcentaje del volumen (30, 60, 86, ...)",
		type: 4,
		required: true,
		choices: [
		{
			name: "20",
			value: 20
		},
		{
			name: "40",
			value: 40
		},
		{
			name: "60",
			value: 60
		},
		{
			name: "80",
			value: 80
		},
		{
			name: "100",
			value: 100
		},
		]
	}
	],
	async run(client, interaction){
		if (!interaction.guild.members.me.voice.channel) return interaction.reply("No estoy en ningún canal de voz!");
		if (interaction.member.voice.channel != interaction.guild.members.me.voice.channel) return interaction.reply("Debes estar en mi mismo canal de voz");
		client.music.setVolume(interaction, interaction.options.getInteger("procentaje"))
		interaction.reply("El volumen ha sido establecido al "+interaction.options.getInteger("porcentaje")+"%")
	}
}