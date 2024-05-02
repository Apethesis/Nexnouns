const { SlashCommandBuilder } = require('discord.js');
function execute(interaction, user) {

}
module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Register your id in the database.')
        .addIntegerOption(option => option.setName('age').setDescription('Required, but not required to be true. If you feel uncomfortable set it to any random number.').setRequired(true))
        .addStringOption(option => option.setName('gender').setDescription('Max 10 characters, required.').setRequired(true).setMaxLength(10))
        .addStringOption(option => option.setName('gender_type').setDescription('Cis, trans, etc. Max 8 characters, required.').setRequired(true).setMaxLength(8))
        .addStringOption(option => option.setName('sexuality').setDescription('Max 16 characters, required.').setRequired(true).setMaxLength(16))
        .addStringOption(option => option.setName('pronouns').setDescription('Max 16 characters, required.').setRequired(true).setMaxLength(16))
        .addStringOption(option => option.setName('description').setDescription('Max 1000 characters, not required.').setMaxLength(1_000)),
    execute: execute
}