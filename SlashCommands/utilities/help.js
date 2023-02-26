const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Client, CommandInteraction } = require('discord.js');
const db = require("quick.db")

module.exports = {
  name: "help",
  description: "Affiche la liste de toutes les commandes disponibles",
  category: "utility",

  /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   */
  run: async (client, interaction) => {

    let message = interaction

    let color = db.get(`color_${message.guild.id}`)
    if (color == null) color = client.config.color

    let pf = '/'

    const row = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId('help')
        .setPlaceholder(`Help Menu`)
        .addOptions([
          {
            label: 'Accueil',
            emoji: '🏘️',
            value: 'accueille',
          },
          {
            label: 'Configuration',
            emoji: '⚙️',
            value: 'config',
          },
          {
            label: 'Info',
            emoji: 'ℹ️',
            value: 'info',
          },
          {
            label: 'Modération',
            emoji: '🔨',
            value: 'mod',
          },
          {
            label: 'Permission',
            emoji: '📙',
            value: 'perm',
          }
        ])
    )

    //Embed Help

    const Help = new MessageEmbed()
      .setTitle(`Commandes de ModBot`)
      .setDescription(`Clique [ici](https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=1101659111432&scope=applications.commands%20bot) pour inviter le bot sur ton serveur.
      
      [Support](https://discord.gg/rqA47zef5B)
      `)
      .setColor(color)
      .setFooter({ text: `Pour configurez les permissions du bot il vous suffit juste d'aller dans les parametres d'intégration de votre serveur`, iconURL: client.user.displayAvatarURL() })


    //Embed               
    const funnyconfig = new MessageEmbed()
      .setTitle(":gear: Configuration")
      .setDescription(`

            \`${pf}modlogs\`
            __*Description:*__ configuré le salon des logs de modération

    `)
      .setFooter({ text: `Pour configurez les permissions du bot il vous suffit juste d'aller dans les parametres d'intégration de votre serveur`, iconURL: client.user.displayAvatarURL() })
      .setColor(color)

    //Embed 

    const funnyuti = new MessageEmbed()
      .setTitle(":information_source: Utilitaire")
      .setDescription(`
      
      **\`${pf}botinfo\`**
      __*Description:*__ Donne les informations du bot

      **\`${pf}help\`**
      __*Description:*__ Affiche une liste de toutes les commandes disponible

      **\`${pf}ping\`**
      __*Description:*__ pour affiché le ping du bot

      **\`${pf}support\`**
      __*Description:*__ Donne le support du bot.

      **\`${pf}userinfo\`**
      __*Description:*__ Affiche les informations utilisateur de la cible spécifiée.

`)
      .setFooter({ text: `Pour configurez les permissions du bot il vous suffit juste d'aller dans les parametres d'intégration de votre serveur`, iconURL: client.user.displayAvatarURL() })
      .setColor(color)

    //Embed 

    const funnymod = new MessageEmbed()
      .setTitle(":hammer: Modération")
      .setDescription(`

      **\`${pf}addrole\`**
      __*Description:*__ ajoute le rôle spécifié à l’utilisateur fourni

      **\`${pf}ban\`**
      __*Description:*__ ban un membre

      **\`${pf}clear\`**
      __*Description:*__ supprimé les messages

      **\`${pf}lock\`**
      __*Description:*__ Bloquer les messages d'un salon

      **\`${pf}nickname\`**
      __*Description:*__ Change le nickname

      **\`${pf}removerole\`**
      __*Description:*__ supprime le rôle spécifié de l’utilisateur fourni

      **\`${pf}timeout\`**
      __*Description:*__ exclu quelqu'un temporairement

      **\`${pf}unban\`**
      __*Description:*__ unban un membre de votre serveur

      **\`${pf}unlock\`**
      __*Description:*__ unlock un salon

      **\`${pf}unwarn\`**
      __*Description:*__ unwarn un membre de votre serveur

      **\`${pf}warn\`**
      __*Description:*__ warn un membre de votre serveur

      **\`${pf}warnings\`**
      __*Description:*__ afficher tous les avertissements d’un utilisateur

`)
      .setFooter({ text: `Pour configurez les permissions du bot il vous suffit juste d'aller dans les parametres d'intégration de votre serveur`, iconURL: client.user.displayAvatarURL() })
      .setColor(color)


    //Embed 

    const funnyperm = new MessageEmbed()
      .setTitle("Utilitaire")
      .setDescription(`

      **\`${pf}dero\`**
      __*Description:*__ Création d'un role dérogation

      **\`${pf}padmin\`**
      __*Description:*__ désactive les permissions administrateur du serveur

      **\`${pf}pall\`**
      __*Description:*__ désactive les permissions dangeureuse du serveur

      **\`${pf}pban\`**
      __*Description:*__ désactive les permissions administrateur du serveur

      **\`${pf}peveryone\`**
      __*Description:*__ désactive les permissions administrateur du serveur

      **\`${pf}prole\`**
      __*Description:*__ désactive les permissions MANAGE_ROLES du serveur

      **\`${pf}pserveur\`**
      __*Description:*__ désactive les permissions MANAGE_GUILD du serveur

      **\`${pf}pviewc\`**
      __*Description:*__ désactive les permissions VIEW_CHANNEL du serveur

      **\`${pf}pvoc\`**
      __*Description:*__ désactive les permissions vocal du serveur

      **\`${pf}pwebhooks\`**
      __*Description:*__ désactive les permissions MANAGE_WEBHOOKS du serveur

`)
      .setFooter({ text: `Pour configurez les permissions du bot il vous suffit juste d'aller dans les parametres d'intégration de votre serveur`, iconURL: client.user.displayAvatarURL() })
      .setColor(color)

    message.reply({ allowedMentions: { repliedUser: false }, embeds: [Help], components: [row] }).then(async msg => {

      const collector = interaction.channel.createMessageComponentCollector({
        time: '350000'
      });

      collector.on("collect", async (collected) => {
        collected.deferUpdate()
        const value = collected.values[0];

        if (value === "accueille") {
          collected.message.edit({ embeds: [Help], components: [row] });
        }
        if (value === "config") {
          collected.message.edit({ embeds: [funnyconfig], components: [row] });
        }
        if (value === "info") {
          collected.message.edit({ embeds: [funnyuti], components: [row] });
        }
        if (value === "mod") {
          collected.message.edit({ embeds: [funnymod], components: [row] });
        }
        if (value === "perm") {
          collected.message.edit({ embeds: [funnyperm], components: [row] });
        }
      })
    })

  }
}