
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')
const db = require("quick.db")

module.exports = {
    name: "clear",
    description: "Supprimé des messages",
    category: "utility",
    options: [{
        name: "nombre",
        description: "Dis un nombre",
        type: "STRING",
        required: true,
    }],

    run: async (client, interaction) => {

        let message = interaction
        if (db.get(`owners_${message.guild.id}_${message.user.id}`) === interaction.user.id) {
        let funnynumber = interaction.options.getString("nombre")

        message.channel.messages.fetch({ limit: funnynumber })
            .then((messages) => {
                message.channel.bulkDelete(messages)
                interaction.reply({ content: `J'ai supprimé ${funnynumber} messages`, ephemeral: true })
            }).catch(console.error);



    }
}
}