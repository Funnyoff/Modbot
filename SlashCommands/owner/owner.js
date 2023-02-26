
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')
const db = require("quick.db")

module.exports = {
    name: "owner",
    category: "utility",
    description: "Permet de configurer les owners du bot",

    options: [{
        name: "add",
        type: "SUB_COMMAND",
        description: "Permet d'ajouter un owner",

        options: [{
            name: "user",
            type: "USER",
            description: "La personne a ajouter en tant que owner du bot ",
            required: true
        }]

    }, {
        name: "remove",
        type: "SUB_COMMAND",
        description: "Permet d'enlever un owner du bot",
        options: [{
            name: "user",
            type: "USER",
            description: "La personne a retirer des owners",
            required: true
        }]
    },
    {
        name: "list",
        type: "SUB_COMMAND",
        description: "Permet de voir la liste des owners du bot"
    }],

    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */
    run: async (client, interaction, args) => {
        const [SubCmd] = args
        let message = interaction

        let color = db.fetch(`color_${message.guild.id}`)
        if (color == null) color = client.config.color

        if (message.member.id !== message.guild.ownerId) return interaction.reply({ content: "Vous n'êtes pas autorisé a faire cela", ephemeral: true })

        if (SubCmd == "add") {

            let user = interaction.options.getUser("user").id
            user = message.guild.members.cache.get(user)


            db.set(`owners_${message.guild.id}_${user.id}`, user.id)
            interaction.reply(`L'utilisateur ${user.user.username} à bien été ajouté aux **owners**`)

        } else if (SubCmd == "remove") {

            let member = interaction.options.getUser("user").id
            let user = member
            member = message.guild.members.cache.get(user)

            db.delete(`owners_${message.guild.id}_${user}`)
            interaction.reply(`L'utilisateur ${member.user.username} à bien été supprimé des **owners**`)

        } else if (SubCmd == "list") {
            message.reply({ content: "Ownerlist", ephemeral: false })
            let list = message.guild.members.cache.filter(u => db.get(`owners_${message.guild.id}_${u.id}`) === u.id).map(a => "<@" + a.user.id + ">")

            const embed = new MessageEmbed()
                .setTitle("liste des Owners")
                .setDescription(list.join("\n"))
                .setColor(color)
            message.channel.send({ embeds: [embed] })


        }



    }
}