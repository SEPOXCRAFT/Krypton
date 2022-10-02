module.exports = {
  name: "test",
  description: "Test",
  options: [
    {
      name: "test1",
      description: "Test de argumentos 1",
      type: 3,
      required: true
    },
    {
      name: "test2",
      description: "Test de argumentos 2",
      type: 3,
      required: false
    },
    {
      name: "test3",
      description: "Test de argumentos 3",
      required: false,
      type: 3,
      choices: [
        {
          name: "Prueba",
          value: "test"
        },
        {
          name: "Prueba 2",
          value: "test_2"
        }
      ]
    }
  ],
  async run(client, interaction) {
    interaction.reply(`Los Slash Commands están funcionando perfectamente. (${interaction.options.getString("test1")}, ${interaction.options.getString("test2")}, ${interaction.options.getString("test3")})`)
  },
  config: {
    debug: false,
    enabled: true
  }
}