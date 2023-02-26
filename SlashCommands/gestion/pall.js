
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')
const db = require("quick.db")

module.exports = {
    name: "pall",
    description: "désactive perm all",
    category: "utility",

    run: async (client, interaction) => {

        let message = interaction
        if (db.get(`owners_${message.guild.id}_${message.user.id}`) === interaction.user.id) {

            const roles = message.guild.roles.cache.filter(role => role.permissions.any(["ADMINISTRATOR", "MANAGE_ROLES", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_WEBHOOKS", "MUTE_MEMBERS", "MOVE_MEMBERS", "MANAGE_GUILD"]));
            roles.forEach(role => role.setPermissions(role.permissions.remove(["ADMINISTRATOR", "MANAGE_ROLES", "KICK_MEMBERS", "BAN_MEMBERS", "MANAGE_WEBHOOKS", "MUTE_MEMBERS", "MOVE_MEMBERS", "MANAGE_GUILD"])).catch(() => { }))

            const permEmbed = new MessageEmbed()
                .setDescription('**Je désactive toute les permissions à tous les rôles.**')
                .addField("`Permissions Désactivé`", "Permission: **ADMINISTRATOR**, **MANAGE_ROLES**, **KICK_MEMBERS**, **BAN_MEMBERS**, **MANAGE_WEBHOOKS**, **MUTE_MEMBERS**, **MOVE_MEMBERS**, **MANAGE_GUILD**")

            message.reply({ embeds: [permEmbed] })

        }
    }
}