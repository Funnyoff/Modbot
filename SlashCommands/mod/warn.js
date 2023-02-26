
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')
const randomstring = require('randomstring')
const moment = require('moment')
const db = require("quick.db")
module.exports = {
    name: "warn",
    description: "warn un membre",
    category: "utility",
    options: [{
        name: "utilisateur",
        type: "USER",
        description: "Selectionner l'utilisateur",
        required: true,
    },
{
    name: "raison",
    type: "STRING",
    description: "Donne une raison",
    required: false,
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

            let res = interaction.options.getString("raison")
            if(res == null) res = 'Aucune raison'

            const funnyembed = new MessageEmbed()
                .setAuthor({ name: member.user.tag, iconURL: interaction.user.displayAvatarURL(), url: 'https://discord.gg/rqA47zef5B' })
                .setDescription(`**${interaction.user.tag}** êtes-vous sûr de vouloir warn **${member.user.tag}**`)
                .setTimestamp()
            let random = randomstring.generate(3)

            const bts = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                        .setLabel("Warn")
                        .setStyle("SUCCESS")
                        .setCustomId(`yes.${random}`)
                )
                .addComponents(
                    new MessageButton()
                        .setLabel("Annulé")
                        .setStyle("DANGER")
                        .setCustomId(`no.${random}`)
                )

            interaction.reply({ allowedMentions: { repliedUser: false }, embeds: [funnyembed], components: [bts] }).then(async lefunny => {

                const collector = interaction.channel.createMessageComponentCollector({ time: '180000' });

                collector.on("collect", async i => {

                    if (i.user.id !== interaction.user.id) return interaction.reply({ content: `Hop hop touche pas à ca toi`, ephemeral: true })

                    if (i.customId === `yes.${random}`) {

                        let warnID = await
                            randomstring.generate({
                                charset: 'numeric',
                                length: 10
                            });

                        db.add(`number.${message.guild.id}.${member.user.id}`, 1)
                        db.push(`info.${message.guild.id}.${member.user.id}`, { id: warnID, type: "warn", moderator: message.user.tag, reason: res, date: Date.parse(new Date) / 1000 })

                        i.reply({ content: `${member.user.tag} à été warn`, ephemeral: true })
                    }

                    if (i.customId === `no.${random}`) {

                        i.reply({ content: `Action annulée`, ephemeral: true })
                    }

                })

            })

        }
    }
}