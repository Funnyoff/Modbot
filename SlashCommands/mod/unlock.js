
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')
const db = require("quick.db")

module.exports = {
    name: "unlock",
    description: "unlock un salon",
    category: "utility",
    options: [{
        name: "salon",
        type: "CHANNEL",
        description: "Unlock le salon",
        required: true,
        channelTypes: ['GUILD_TEXT']
    }],

    run: async (client, interaction) => {

        let message = interaction
        if (db.get(`owners_${message.guild.id}_${message.user.id}`) === interaction.user.id) {

            let channel = interaction.options.getChannel("salon")

            message.guild.roles.cache.forEach(role => {
                channel.permissionOverwrites.edit(message.guild.id, {
                    SEND_MESSAGES: true,
                });
            });

            message.reply(`:heavy_check_mark: ${channel} unlock parfaitement !`)

        }
    }
}