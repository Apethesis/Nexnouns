const { SlashCommandBuilder } = require('discord.js');
function execute(interaction, user) {
    const usr = user.findOne({ where: { uid: interaction.member.id } }).then((tag) => {
        if (tag) {
            tag.update({
                age: interaction.options.getInteger('age') ?? undefined,
                gender: interaction.options.getString('gender') ?? undefined,
                gentype: interaction.options.getString('gender_type') ?? undefined,
                sexuality: interaction.options.getString('sexuality') ?? undefined,
                pronouns: interaction.options.getString('pronouns') ?? undefined,
                description: interaction.options.getString('description') ?? undefined
            }).then(() => {
                tag.save().then(() => {
                    interaction.reply("Successfully edited!")
                }).catch((err) => {
                    interaction.reply("Failed to edit")
                    console.log(err)
                })
            }).catch((err) => {
                console.log(err)
            })
        } else {
            interaction.reply("You are not registered.")
        }
    })
}
module.exports = {
    data: new SlashCommandBuilder()
        .setName('edit')
        .setDescription('Edit your entry in the database.')
        .addIntegerOption(option => option.setName('age').setDescription('Can be a fake or real age.'))
        .addStringOption(option => option.setName('gender').setDescription('Max 10 characters.').setMaxLength(10))
        .addStringOption(option => option.setName('gender_type').setDescription('Cis, trans, etc. Max 8 characters.').setMaxLength(8))
        .addStringOption(option => option.setName('sexuality').setDescription('Max 16 characters.').setMaxLength(16))
        .addStringOption(option => option.setName('pronouns').setDescription('Max 16 characters.').setMaxLength(16))
        .addStringOption(option => option.setName('description').setDescription('Max 1000 characters.').setMaxLength(1_000)),
    execute: execute
}