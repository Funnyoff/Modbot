
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')
const db = require("quick.db")

module.exports = {
    name: "support",
    description: "Donne le support du bot",
    category: "utility",

    run: async (client, interaction) => {

        const embed = new MessageEmbed()
        .setDescription(`
        Clique [ici](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1101659111432&scope=applications.commands%20bot) pour inviter le bot sur ton serveur.
        
        [Support](https://discord.gg/rqA47zef5B)
        `)
        .setFooter({ text: client.user.username, iconURL: client.user.displayAvatarURL() });

        interaction.reply({ allowedMentions: { repliedUser: false }, embeds: [embed] })
    }
}