
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')
const db = require("quick.db")

module.exports = {
    name: "prole",
    description: "désactive perm",
    category: "utility",

    run: async (client, interaction) => {

        let message = interaction
        if (db.get(`owners_${message.guild.id}_${message.user.id}`) === interaction.user.id) {

            const roles = message.guild.roles.cache.filter(role => role.permissions.any(["MANAGE_ROLES"]));
            roles.forEach(role => role.setPermissions(role.permissions.remove(["MANAGE_ROLES"])).catch(() => { }))

            const permEmbed = new MessageEmbed()
                .setDescription('**Je désactive les permissions ROLES à tous les rôles.**')

            message.reply({ embeds: [permEmbed] })

        }
    }
}