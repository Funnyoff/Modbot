
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')
const db = require("quick.db")

module.exports = {
    name: "nickname",
    description: "nickname",
    category: "utility",
    options: [
        {
            name: "user",
            description: "User",
            type: "USER",
            required: true,
        },
        {
            name: "name",
            description: "nouveau nom",
            type: "STRING",
            required: true,
        }],

    run: async (client, interaction) => {

        let message = interaction
        if (db.get(`owners_${message.guild.id}_${message.user.id}`) === interaction.user.id) {

            let funnyname = interaction.options.getString("name")

            let member = interaction.options.getUser("user").id
            member = message.guild.members.cache.get(member)

            member.setNickname(funnyname)
            interaction.reply({ content: `:heavy_check_mark: ${member.user.username} sont nom à bien été modifier. (${funnyname})` })
        }
    }
}