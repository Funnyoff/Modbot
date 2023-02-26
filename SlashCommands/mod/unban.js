
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')
const randomstring = require('randomstring')
const moment = require('moment')
const db = require("quick.db")
module.exports = {
    name: "unban",
    description: "membre",
    category: "utility",
    options: [{
        name: "utilisateur",
        type: "STRING",
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

            let member = interaction.options.getString("utilisateur")

            interaction.guild.bans.remove(member)
            interaction.reply({ content: `Le membre à été unban` })


        }
    }
}