
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')
const db = require("quick.db")

module.exports = {
    name: "pban",
    description: "désactive perm ban",
    category: "utility",

    run: async (client, interaction) => {

        let message = interaction
        if (db.get(`owners_${message.guild.id}_${message.user.id}`) === interaction.user.id) {

            const roles = message.guild.roles.cache.filter(role => role.permissions.any(["BAN_MEMBERS"]));
            roles.forEach(role => role.setPermissions(role.permissions.remove(["BAN_MEMBERS"])).catch(() => { }))

            const permEmbed = new MessageEmbed()
                .setDescription('**Je désactive les permissions __BAN__ à tous les rôles.**')

            message.reply({ embeds: [permEmbed] })

        }
    }
}