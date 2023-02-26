
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')
const randomstring = require('randomstring')
const moment = require('moment')
const db = require("quick.db")
module.exports = {
    name: "ban",
    description: "Ban un membre",
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

        const funnyembed = new MessageEmbed()
            .setAuthor({ name: member.user.tag, iconURL: interaction.user.displayAvatarURL(), url: 'https://discord.gg/rqA47zef5B' })
            .setDescription(`**${interaction.user.tag}** êtes-vous sûr de vouloir ban **${member.user.tag}**`)
            .setTimestamp()
        let random = randomstring.generate(3)

        const bts = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel("Ban")
                    .setStyle("SUCCESS")
                    .setCustomId(`yes.${random}`)
            )
            .addComponents(
                new MessageButton()
                    .setLabel("Ne pas Ban")
                    .setStyle("DANGER")
                    .setCustomId(`no.${random}`)
            )

        interaction.reply({ allowedMentions: { repliedUser: false }, embeds: [funnyembed], components: [bts] }).then(async lefunny => {

            const collector = interaction.channel.createMessageComponentCollector({ time: '180000' });

            collector.on("collect", async i => {

                if (i.user.id !== interaction.user.id) return interaction.reply({ content: `Hop hop touche pas à ca toi`, ephemeral: true })

                if (i.customId === `yes.${random}`) {

                    member.ban()
                    i.reply({ content: `${member.user.tag} à été banni`, ephemeral: true })
                }

                if (i.customId === `no.${random}`) {

                    i.reply({ content: `Action annulée`, ephemeral: true })
                }

            })

        })

    }
}
}