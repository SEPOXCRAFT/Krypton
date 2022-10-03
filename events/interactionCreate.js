const Discord = require("discord.js");

module.exports = async (client, interaction) => {
	if (!interaction.isCommand()) return;
	
	const cmd = client.commands.get(interaction.commandName || null);
	
	if (cmd.config?.debug) {
		if (interaction.user.id != client.users.cache.find(e => e.username == "SEPOX48").id) 
			return interaction.reply(`${interaction.commandName} está en desarrollo.`);
		
		return cmd.run(client, interaction);
	}
	if (!cmd.config?.enabled) return interaction.reply(`${interaction.commandName} está desactivado.`);
	
	cmd.run(client, interaction);
};