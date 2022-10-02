module.exports = {
  name: "ping",
  description: "Ping del bot",
  options: [],
  async run(client, interaction) {
    interaction.reply(`El bot tiene ${client.ws.ping.toString()}ms`)
  },
  config: {
    debug: false,
    enabled: true
  }
}