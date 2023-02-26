
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')
const randomstring = require('randomstring')

const moment = require('moment')
const db = require("quick.db")
module.exports = {
    name: "dero",
    description: "dero",
    category: "utility",

    options: [
        {
            name: "role",
            type: "ROLE",
            description: "Selectionner un role",
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

            let funnyrole = interaction.options.getRole("role").id
            funnyrole = message.guild.roles.cache.get(funnyrole)

            message.reply({ content: `Le role ${funnyrole} à désormais accès à toutes les dérogations owners du serveur <@${message.user.id}>`, ephemeral: true })
            message.guild.channels.cache.forEach((channel, id) => {
                channel.permissionOverwrites.edit(funnyrole, {

                    'MOVE_MEMBERS': true,
                    'MUTE_MEMBERS': true,
                    'VIEW_CHANNEL': true,
                    'DEAFEN_MEMBERS': true,
                    'MANAGE_CHANNELS': true,
                    'USE_VAD': true,
                    'MANAGE_ROLES': true,
                    'STREAM': true,
                    'CONNECT': true,
                    'SPEAK': true,
                })
            });

            funnyrole.setPermissions((["MANAGE_ROLES", "READ_MESSAGE_HISTORY", "PRIORITY_SPEAKER", "EMBED_LINKS", "USE_EXTERNAL_STICKERS", "USE_EXTERNAL_EMOJIS", "ATTACH_FILES", "CREATE_INSTANT_INVITE", "SEND_TTS_MESSAGES", "USE_EXTERNAL_EMOJIS", "VIEW_AUDIT_LOG", "MUTE_MEMBERS", "MOVE_MEMBERS", "DEAFEN_MEMBERS", "MANAGE_CHANNELS", "USE_VAD", "ADD_REACTIONS", "VIEW_CHANNEL", "SEND_MESSAGES", "MANAGE_MESSAGES", "MENTION_EVERYONE", "CONNECT", "SPEAK", "CHANGE_NICKNAME", "MANAGE_NICKNAMES", "MANAGE_EMOJIS_AND_STICKERS", "USE_APPLICATION_COMMANDS", "MANAGE_EVENTS", "MANAGE_THREADS"])).catch(() => { })

        }
    }
}