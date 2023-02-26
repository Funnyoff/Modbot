
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')
const db = require("quick.db")

module.exports = {
    name: "pvoc",
    description: "désactive perm",
    category: "utility",

    run: async (client, interaction) => {

        let message = interaction
        if (db.get(`owners_${message.guild.id}_${message.user.id}`) === interaction.user.id) {

            const roles = message.guild.roles.cache.filter(role =>  role.permissions.any(["MUTE_MEMBERS", "MOVE_MEMBERS", "DEAFEN_MEMBERS"]));
            roles.forEach(role => role.setPermissions(role.permissions.remove(["MUTE_MEMBERS", "MOVE_MEMBERS", "DEAFEN_MEMBERS"])).catch(() => {}))
            
            const permEmbed = new MessageEmbed()
              .setDescription('**Je désactive les permissions vocal du serveur à tous les rôles.**')

            message.reply({ embeds: [permEmbed] })

        }
    }
}