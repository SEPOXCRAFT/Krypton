const Discord = require("discord.js")
const fs = require("fs")
const Path = require("path")
global.chalk = require("chalk")
console.info = (text) => {
	console.blue(text)
}

console.green = (text) => {
	console.log(chalk.green(text))
}

console.blue = (text) => {
	console.log(chalk.blue(text))
}

console.red = (text) => {
	console.log(chalk.red(text))
}

require("./keepAlive.js")
require("dotenv").config()
let token = process.env.TOKEN
let clientid = process.env.ClientId

const client = new Discord.Client({
	intents: [
		Discord.GatewayIntentBits.Guilds,
		Discord.GatewayIntentBits.GuildMessages,
		Discord.GatewayIntentBits.MessageContent,
		Discord.GatewayIntentBits.GuildMembers,
	]
})

client.commands = global.commands = new Discord.Collection();
const synchronizeSlashCommands = require('discord-sync-commands-v14');

if (true) {

	const eventsRegister = () => {
		let eventsDir = Path.resolve(__dirname, './events');
		if (!fs.existsSync(eventsDir)) return console.red("I could not find an events directory. (looking to read a events dir.)");
    /* the forEach loop is not advised yet I was lazy.*/
		fs.readdirSync(eventsDir, { encoding: "utf-8" }).filter((cmd) => cmd.split(".").pop() === "js").forEach((event) => {
			let totalEventevents = require(`./events/${event}`);
			if (!totalEventevents) return console.red("No event events in the code");
			console.green(`${event} was saved.`);
			client.on(event.split('.')[0], totalEventevents.bind(null, client));
			delete require.cache[require.resolve(`./events/${event}`)];
		});
	};

	const commandsRegister = () => {
		let commandsDir = Path.resolve(__dirname, './commands');
		if (!fs.existsSync(commandsDir)) return console.red("Commands directory does not exist.");
		/*
		Not changing the commands directory as I can't find a cute name for it.
		Once more; forEach isn't much advised.
		*/
		fs.readdirSync(commandsDir, { encoding: "utf-8" }).filter((cmd) => cmd.split(".").pop() === "js").forEach((command) => {
			let cmdFile = require(`./commands/${command}`);
			if (!cmdFile || cmdFile.name == undefined || cmdFile.name == null) return console.log("No props in command " + command);
			console.log('\x1b[33m%s\x1b[0m', `Saved command: ${command}`);
			client.commands.set(cmdFile.name, cmdFile);
			delete require.cache[require.resolve(`./commands/${command}`)];
		});
	};

	const rest = new Discord.REST({ version: '10' }).setToken(token);

	const slashCommandsRegister = async () => {
		const commands = []
		for (let command of client.commands) {
			command = command[1]
			commands.push({
				name: command.name,
				description: command.description,
				options: command.options || [],
			})
		}
		const result = await rest.put(
		Discord.Routes.applicationCommands(clientid),
			{ body: commands },
		);
		console.green(result.length + " commands has been set.")
	};

	eventsRegister();
	commandsRegister();
	slashCommandsRegister();

	client.login(token).then(() => console.info("Logged in as " + client.user.tag))

	process.on('unhandledRejection', error => {
		console.log(error);
	});
}