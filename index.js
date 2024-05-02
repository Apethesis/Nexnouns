require("dotenv").config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { Sequelize, DataTypes } = require('sequelize');
const pdb = new Sequelize('pdb','postgres','root', {
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
})
const user = pdb.define('user',
    {
        uid: {
            primaryKey: true,
            unique: true,
            type: DataTypes.STRING,
            allowNull: false
        },
        uname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: DataTypes.INTEGER,
        gender: DataTypes.STRING(10),
        gentype: DataTypes.STRING(8),
        sexuality: DataTypes.STRING(16),
        pronouns: DataTypes.STRING(16),
        description: {
            type: DataTypes.STRING(1000),
            defaultValue: ""
        }
    }
)
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
client.commands = new Collection();
const foldersPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(foldersPath).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const filePath = path.join(foldersPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.once(Events.ClientReady, client => {
    user.sync({ alter: true });
    console.log("ellie is neat")
})

client.on(Events.InteractionCreate, interaction => {
	if (!interaction.isChatInputCommand()) return;
	const command = interaction.client.commands.get(interaction.commandName);
    if (!command) { return; }

    try {
        command.execute(interaction, user);
    } catch (error) {
        console.log(error)
    }
});

client.login(process.env.TOK)