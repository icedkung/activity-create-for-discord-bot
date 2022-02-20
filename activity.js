const Discord = require(`discord.js`);
const { MessageEmbed } = require(`discord.js`);
const systemmanager = require(`${process.cwd()}/handlers/systemmanager`); //your handle system
const { ickhandle, errorlogs } = require(`${process.cwd()}/handlers/ickfunctions`); //your handle system

const fetch = require('node-fetch') //for activity

/** 
   * @param {Client} client 
   * @param {Message} message 
   * @param {String[]} args 
   */

module.exports = {
  name: `activity-open`,
  category: `add-on`,
  description: `create activity-together`,
  usage: `activity-open`,
  playerrequire: {
    "type": "functional",
    "nowplaying": false
  },
  options: [
    {
      "StringChoices": {
        name: "activity", description: "What activity do you want open?", required: true,
        choices: [
          ["Awkword", "awkword"],
          ["Betrayal.io", "betrayal"],
          ["Chess in the Park", "chessinthepark"],
          ["Checkers in the Park", "checkersinthepark"],
          ["Fishington.io", "fishington"],
          ["Letter League", "letterleague"],
          ["Poker Night", "pokernight"],
          ["Sketch Heads", "metal"],
          ["SpellCast", "spellcast"],
          ["Watch-Together", "watchtogether"],
          ["Word Snacks", "wordsnack"],
          ["Youtube-Together", "youtubetogether"]
        ]
      }
    },
  ],

  run: async (client, interaction, message) => {

    let channel = message.member.voice.channel;
    if (!channel) {
      return interaction.reply(
        new Discord.MessageEmbed()
          .setDescription("please join vc") // if player != vc
          .setColor("#ff0000")
      )
    }

    try {
      let act = "755600276941176913"; //default activity
      let args = [interaction.options.getString("activity")]
      let acName = "";
      let acLevel = "";
      if (args[0]) {
        //ncs | no copyrighted music
        if (args[0].toLowerCase().startsWith("a")) { act = "879863881349087252"; acName = "Awkword"; acLevel = " __[Server Boots LV1 Require!]__"; }
        if (args[0].toLowerCase().startsWith("b")) { act = "773336526917861400"; acName = "Betrayal.io"; acLevel = ""; }
        if (args[0].toLowerCase().startsWith("chess")) { act = "832012774040141894"; acName = "Chess in the Park"; acLevel = " __[Server Boots LV1 Require!]__"; }
        if (args[0].toLowerCase().startsWith("check")) { act = "832013003968348200"; acName = "Checkers in the Park"; acLevel = " __[Server Boots LV1 Require!]__"; }
        if (args[0].toLowerCase().startsWith("f")) { act = "814288819477020702"; acName = "Fishington.io"; acLevel = ""; }
        if (args[0].toLowerCase().startsWith("l")) { act = "879863686565621790"; acName = "Letter League"; acLevel = " __[Server Boots LV1 Require!]__"; }
        if (args[0].toLowerCase().startsWith("p")) { act = "755827207812677713"; acName = "Poker Night"; acLevel = " __[Server Boots LV1 Require!]__"; }
        if (args[0].toLowerCase().startsWith("sk")) { act = "902271654783242291"; acName = "Sketch Heads"; acLevel = " __[Server Boots LV1 Require!]__"; }
        if (args[0].toLowerCase().startsWith("sp")) { act = "852509694341283871"; acName = "SpellCast"; acLevel = " __[Server Boots LV1 Require!]__"; }
        if (args[0].toLowerCase().startsWith("wa")) { act = "880218394199220334"; acName = "Watch-Together"; acLevel = ""; }
        if (args[0].toLowerCase().startsWith("wo")) { act = "879863976006127627"; acName = "Word Snacks"; acLevel = ""; }
        if (args[0].toLowerCase().startsWith("y")) { act = "880218394199220334"; acName = "Youtube-Together"; acLevel = "__[Server Boots LV1 Require!]__"; }

      }

      //fetch activity
      fetch(`https://discord.com/api/v8/channels/${message.member.voice.channel.id}/invites`, {
        method: "POST",
        body: JSON.stringify({
          max_age: 86400,
          max_uses: 0,
          target_application_id: act,
          target_type: 2,
          temporary: false,
          validate: null
        }),
        headers: {
          "Authorization": `Bot ${client.token}`,
          "Content-Type": "application/json"
        }
      }).then(res => res.json()).then(invite => {
        if (!invite.code) return interaction.reply(
          new Discord.MessageEmbed()
            .setDescription(`Can't create ${args} in  ${channel} please try again`)
            .setColor("#ff0000")
        )
        interaction.reply(`Click to join ${acName} in ${channel}  \n**Activity** : ${acName} \n**Level Req** : ${acLevel} \n**Join** : https://discord.com/invite/${invite.code} `)
      })

    } catch (e) {
      console.log(String(e.stack).dim.bgRed)
      interaction.reply(new Discord.MessageEmbed()
        .setDescription("Error please try again")
        .setColor("#ff0000"))
    }
  }
};
