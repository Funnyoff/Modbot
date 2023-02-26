
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')
const db = require("quick.db")

module.exports = {
    name: "ping",
    description: "Pour affiché le ping du bot",
    category: "utility",

    run: async (client, interaction) => {

        interaction.reply({ allowedMentions: { repliedUser: false }, content: `${client.ws.ping} ms` })
    }
}