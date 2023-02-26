
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')
const randomstring = require('randomstring')
const moment = require('moment')
const db = require("quick.db")
module.exports = {
    name: "warnings",
    description: "Permet de voir les warns du membre",
    category: "utility",
    options: [{
        name: "utilisateur",
        type: "USER",
        description: "Selectionner l'utilisateur",
        required: true,
    }],

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction) => {

        let message = interaction

        if (db.get(`owners_${message.guild.id}_${message.user.id}`) === interaction.user.id) {

            let color = db.fetch(`color_${message.guild.id}`)
            if (color == null) color = '#606060'

            let pf = db.fetch(`prefix_${message.guild.id}`)
            if (pf == null) pf = '/'

            let member = interaction.options.getUser("utilisateur").id
            member = message.guild.members.cache.get(member)

            const number = db.fetch(`number.${message.guild.id}.${member.user.id}`)
            const data = db.fetch(`info.${message.guild.id}.${member.user.id}`)

            if (data == null) return interaction.reply({ content: `Ce membre n'a recu aucun warn` })

            let e = data.map(r => r)
                .map((m, i) => `Type:  \`${m.type}\`\nModérateur: ${m.moderator} \nRaison: \`${m.reason}\` \nDate: <t:${m.date}>\nWarnID: \`${m.id}\``)
            const embed = new MessageEmbed()
                .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() })
                .setDescription(e.join("\n\n"))
                .setTimestamp()
            interaction.reply({ embeds: [embed] })

        }
    }
}