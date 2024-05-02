function execute(interaction, user) {

}
module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Register your id in the database.')
        .addIntegerOption(option => option.setName('Age').setDescription('Required, but not required to be true. If you feel uncomfortable set it to any random number.').setRequired(true))
        .addStringOption(option => option.setName('Gender').setDescription('Max 10 characters, required.').setRequired(true).setMaxLength(10))
        .addStringOption(option => option.setName('Gender Type').setDescription('Cis, trans, etc. Max 8 characters, required.').setRequired(true).setMaxLength(8))
        .addStringOption(option => option.setName('Sexuality').setDescription('Max 16 characters, required.').setRequired(true).setMaxLength(16))
        .addStringOption(option => option.setName('Pronouns').setDescription('Max 16 characters, required.').setRequired(true).setMaxLength(16))
        .addStringOption(option => option.setName('Description').setDescription('Max 1000 characters, not required.').setMaxLength(1_000)),
    execute: execute
}