const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
function execute(interaction, user) {
    const usr = user.findOne({ where: { uid: interaction.options.getUser('user').id } }).then((tag) => {
        if (tag) {
            if (tag.description.length >= 1) {
                interaction.reply({ embeds: [ new EmbedBuilder()
                    .setColor("Random")
                    .setTitle(tag.uname)
                    .setThumbnail(interaction.options.getUser('user').displayAvatarURL())
                    .addFields(
                        { name: "Gender", value: tag.gender, inline: true },
                        { name: "Pronouns", value: tag.pronouns, inline: true},
                        { name: "Sexuality", value: tag.sexuality, inline: true},
                        { name: "Gender Type", value: tag.gentype, inline: true }
                    )
                    .setDescription(tag.description)
                ]})
            } else {
                interaction.reply({ embeds: [ new EmbedBuilder()
                    .setColor("Random")
                    .setTitle(tag.uname)
                    .setThumbnail(interaction.options.getUser('user').displayAvatarURL())
                    .addFields(
                        { name: "Age", value: tag.age, inline: true },
                        { name: "Gender", value: tag.gender, inline: true },
                        { name: "Pronouns", value: tag.pronouns, inline: true},
                        { name: "Sexuality", value: tag.sexuality, inline: true},
                        { name: "Gender Type", value: tag.gentype, inline: true }
                    )
                ]})
            }
        } else {
            interaction.reply('This user is not registered or does not exist.')
        }
    })
}
module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Gets info about a person from the database.')
        .addUserOption(option => option.setName('user').setDescription("The user you wish to get info about.").setRequired(true)),
    execute: execute
}