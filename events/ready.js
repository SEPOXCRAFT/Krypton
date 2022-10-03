module.exports = async (client) => {
	setInterval(async () => {
		await client.user.setPresence({
			activities: [{
				name: client.guilds.cache.size + " servidor y " + client.users.cache.filter(e => !e.bot).size + " usuarios", type: 3
			}],
			status: 'dnd',
			afk: false
		});
	}, 10000)
};

module.exports.client = client;