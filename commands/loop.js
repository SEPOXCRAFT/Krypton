module.exports = {
	name: "loop",
	description: "Habilita el modo repetición",
	options: [
	{
		name: "modo",
		description: "Modo de repetición",
		type: 4,
		required: true,
		choices: [
		{
			name: "Desactivado",
			value: 0,
		},
		{
			name: "Toda la queue",
			value: 2
		},
		{
			name: "Solo esta canción",
			value: 1
		}
		]
	}
	],
	config: {
		enabled: true,
		debug: false,
	},
	async run(client, interaction){
		const { channel: vc } = interaction.member.voice;
		if (!interaction.guild.members.me.voice.channel) return interaction.reply("No estoy en ningún canal de voz");
		if (!vc || vc != interaction.guild.members.me.voice.channel) return interaction.reply("Debes estar en mi mismo canal para poder ejecutar este comando.");
		const mode = client.music.setRepeatMode(interaction, parseInt(interaction.options.getInteger("modo")));
		interaction.reply(
			`El modo repetición se ha establecido a \`${
				mode
					? mode === 2
						? 'Toda la queue'
						: 'Esta canción'
					: 'Apagado'
			}\``,
		);
	}
}