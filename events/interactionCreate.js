const Discord = require("discord.js");

module.exports = async (client, interaction) => {
  if (interaction.isCommand()) {
    const cmd = client.commands.get(interaction.commandName || null);
    if (cmd.config?.debug == false && cmd.config?.enabled == true) {
      cmd.run(client, interaction);
    } else if (cmd.config?.debug == true) {
      if (interaction.user.id == client.users.cache.find(e => e.username == "SEPOX48").id) {
        cmd.run(client, interaction);
      } else {
        interaction.reply(`${interaction.commandName} está en desarrollo.`)
      }
    } else if (cmd.config?.enabled == false) {
      interaction.reply(`${interaction.commandName} está desactivado.`)
    }
  };
};