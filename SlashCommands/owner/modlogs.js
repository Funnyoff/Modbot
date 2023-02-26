
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')
const db = require("quick.db")

module.exports = {
  name: "modlogs",
  description: "Activer le système modlogs",
  category: "utility",
  options: [{
    name: "salon",
    type: "CHANNEL",
    description: "Salon logs",
    required: true,
    channelTypes: ['GUILD_TEXT']
  }],

  run: async (client, interaction) => {

    let message = interaction

    if (db.get(`owners_${message.guild.id}_${message.user.id}`) === interaction.user.id) {

    let channel = interaction.options.getChannel("salon")
    if (!channel) channel = interaction.channel
    db.set(`${message.guild.id}.voclog`, channel.id)
    message.reply(`:heavy_check_mark: Les logs ont été configurés sur ${channel}`)

  }
}
}