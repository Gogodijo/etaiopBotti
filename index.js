const Discord = require('discord.js')
const client = new Discord.Client()
require('dotenv').config()
const csv = require('csvtojson')
const roles = require("./commands/giveRoles")
const moveRoles = require("./commands/moveallRole")
const moveFrom = require("./commands/movefrom")
const roleReaction = require("./commands/roles")
const info = require("./commands/info")


/*csv tieodston lukeminen on asynkroninen operaatio. Siksi wrapattu run funktioon mikä
käynnistetään ohjelman lopussa. await keywordia ei voi käyttää async funktion ulkopuolella,
muuten olisi pitänyt tehdä callbackeillä vastaava.
*/
async function run() {
  const jsonArray = await csv().fromFile("./data.csv");
  const channelID = "823644106051289129"
  client.once('ready', () => {
    console.log("Hello =)")
    const guilds = client.guilds.cache
  })

  client.on('message', async message => {
    if (message.channel.id == channelID && message.mentions.has(client.user.id) && (message.content.split(" ").length > 1)) {
      roles.roles(message, jsonArray)
      return
    }
    if (message.member.roles.cache.some(role => role.name.toLowerCase() === 'matkamarsalkka' || role.name.toLowerCase() === "matkaopas")) {
      if (message.content.startsWith("!")) {
        if (message.content.split(" ")[0].toLowerCase() == "!siirrä") {
          moveRoles.roles(message)
          return
        }
        if (message.content.split(" ")[0].toLowerCase() == "!siirräjostain") {
          moveFrom.move(message)
          return
        }
        if (message.content.toLowerCase() == "!roolit") {
          roleReaction.messageAndReactions(message)
          return
        }
      }

    }
    return
  })

  client.login(process.env.DISCORD_CODE)
}

run()