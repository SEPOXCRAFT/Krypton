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
		const Discord = require("discord.js")
		const { channel } = interaction.member.voice;
        if (!channel) return interaction.reply("Necesitas estar en un canal de voz!")
        if (!channel.permissionsFor(interaction.guild.members.me).has(Discord.PermissionsBitField.Flags.Connect)) return interaction.reply(`No tengo el permiso sufuciente en ${channel.name} para unirme!`);
        if (!channel.permissionsFor(interaction.guild.members.me).has(Discord.PermissionsBitField.Flags.Speak)) return interaction.reply(`No tengo permisos para hablar en ${channel.name}!`);
		let name = interaction.options.getString("nombre")
		
		client.music.play(interaction.member.voice.channel, name, {
			member: interaction.member,
			textChannel: interaction.channel,
			interaction,
		});
		interaction.reply("Añadiendo a la queue...")
	},
	config: {
		enabled: true,
		debug: false
	}
}