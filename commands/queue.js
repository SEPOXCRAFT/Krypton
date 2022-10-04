module.exports = {
	name: "queue",
	description: "Muestra la queue actual",
	options: [
	{
		name: "pagina",
		description: "Página de la queue",
		type: 4,
		required: true,
	}
	],
	config: {
		enabled: true,
		debug: false,
	},
	async run(client, interaction){
		const { EmbedBuilder } = require("discord.js")
		if (!interaction.guild.members.me.voice.channel) return interaction.reply("No estoy en ningún canal de voz");
		if (!interaction.member.voice.channel || interaction.member.voice.channel != interaction.guild.members.me.voice.channel) return interaction.reply("Debes estar en mi mismo canal para poder ejecutar este comando.");
		
		await interaction.deferReply({ ephemeral: false });

		const args = interaction.options.getInteger("pagina");

        const queue = client.music.getQueue(interaction);
        if (!queue) return interaction.editReply(`No se está reproduciendo ninguna canción ahora mismo`);

		const pagesNum = Math.ceil(queue.songs.length / 10);
		if(pagesNum === 0) pagesNum = 1;

		const songStrings = [];
		for (let i = 1; i < queue.songs.length; i++) {
			const song = queue.songs[i];
			songStrings.push(
				`**${i}.** [${song.name}](${song.url}) \`[${song.formattedDuration}]\` • ${song.user}
				`);
		}

		const pages = [];
		for (let i = 0; i < pagesNum; i++) {
			const str = songStrings.slice(i * 10, i * 10 + 10).join('');
			const embed = new EmbedBuilder()
                .setAuthor({ name: `Queue - ${interaction.guild.name}`, iconURL: interaction.guild.iconURL({ dynamic: true })})
                .setThumbnail(queue.songs[0].thumbnail)
				.setColor("Random")
				.setDescription(`**Reproduciendo actualmente:**\n**[${queue.songs[0].name}](${queue.songs[0].url})** \`[${queue.songs[0].formattedDuration}]\` • ${queue.songs[0].user}\n\n**Resto de la queue:**${str == '' ? '  Nada' : '\n' + str }`)
				.setFooter({ text: `Página • ${i + 1}/${pagesNum} | ${queue.songs.length} • Canciones | ${queue.formattedDuration} • Duración total.`});
			pages.push(embed);
		}

		if (!args) {
			if (pages.length == pagesNum && queue.songs.length > 10) QueuePage(client, interaction, pages, 60000, queue.songs.length, queue.formattedDuration);
			else return interaction.editReply({ embeds: [pages[0]] });
		}
		else {
			if (isNaN(args)) return interaction.editReply('La página debe ser un número.');
			if (args > pagesNum) return interaction.editReply(`Solo hay ${pagesNum} páginas disponibles.`);
			const pageNum = args == 0 ? 1 : args - 1;
			return interaction.editReply({ embeds: [pages[pageNum]] });
		}
	}
}