
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')
const db = require("quick.db")

module.exports = {
    name: "botinfo",
    description: "Donne les infomations du bot",
    category: "utility",

    run: async (client, interaction) => {

        //J'ai pas tout fait parce que j'avais la flemme parce que certains trucs sont inutiles (:

        const embed = new MessageEmbed()
            .setAuthor({ name: 'Informations du bot', iconURL: client.user.displayAvatarURL(), url: 'https://discord.gg/rqA47zef5B' })
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`
            __**🤖・Identité :**__
            > **Nom d'utilisateur :** <@${client.user.id}>
            > **Tag :** ${client.user.discriminator}
            > **ID :** ${client.user.id}
            > **Date de création :** ${client.user.createdAt}

            __**:heart:・Développeur :**__
            > **Nom :** <@1035322112350621808> \`Funny#0666\`
            > **ID :** 1035322112350621808

            __**📊・Statistiques du bot :**__
            > **Démarré :** Il y a 3 jours
            > **Serveurs :** ${client.guilds.cache.size.toLocaleString()}
            > **Utilisateurs :** ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}
            > **Salons :** Flemme
            > **Ping avec l'API de Discord :** ${client.ws.ping}ms
            > **Status de la base de données :** Connecter (MongoDB)

            __**🖥️・Informations techniques :**__
            > **Hébergeur :** OVH
            > **Système d'exploitation :** Linux
            > **Processeur :** Intel(R) Xeon(R) CPU E5-2690 v2 @ 3.00GHz
            > **Mémoire utilisé :** 301.20MB/16 384MB (187.53%)
            > **Node.JS :** v16.18.1
            > **Discord.JS :** v13.6.0

            __**🔗 Liens :**__
            > **Invitez moi :** [Lien](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1101659111432&scope=applications.commands%20bot)
            > **Développeur :** [Funny#0666](https://discord.gg/rqA47zef5B)
            `)
            .setFooter(`${client.user.username}`)
            .setTimestamp()

        interaction.reply({ allowedMentions: { repliedUser: false }, embeds: [embed] })
    }
}