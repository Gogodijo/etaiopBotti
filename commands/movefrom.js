const move = (msg) => {
  const commandArgs = msg.content.match(/(?:[^\s"]+|"[^"]*")+/g)
  if(commandArgs.length == 1) {
    msg.channel.send("Anna komento seuraavasti: !siirräJostain \"roolin nimi\" \" vanhan kanavan nimi\" \"Uuden kanavan nimi\" \n" +
    "Jos kanavassa ei ole välilyöntejä hipsukat voi jättää pois, mutta ei haittaa vaikka ne siellä on.")
    return
  }
  if(commandArgs.length > 4) {
    msg.channel.send("Annettu liikaa argumentteja. Unohditko kenties \"\" merkit roolin ja kanavan ympäriltä, jos niissä on välilyöntejä.\n" +
    "Olen niin tyhmä botti, että osaan jakaa argumentit vain välilyöntien perusteella. Jos argumentissa on välilyönti laita se \"\" sisään, kiitos =)")
    return
  }
  if(commandArgs[1].toLowerCase() == "everyone"){
    commandArgs[1] = "@everyone"
  }
  const roleName = commandArgs[1].replace(/^"(.*)"$/, '$1').toLowerCase()
  const previousChannelName = commandArgs[2].replace(/^"(.*)"$/, '$1').toLowerCase()
  const newChannelName = commandArgs[3].replace(/^"(.*)"$/, '$1').toLowerCase()

  let newChannel = null
  let usersWithRole = []

  msg.guild.channels.cache.forEach( channel => {
    if(channel.type == 'voice' && channel.name.toLowerCase().includes(newChannelName)){
      newChannel = channel
    }
    if(channel.type == 'voice' && channel.name.toLowerCase().includes(previousChannelName)){
      channel.members.forEach( member => {
        if(member.roles.cache.some(role => role.name.toLowerCase() === roleName)){
          usersWithRole.push(member)
        }
      })
    }
  })
  if(!newChannel){
    msg.channel.send("Uutta kanavaa ei löytynyt")
    return
  }
  if(usersWithRole.length == 0){
    msg.channel.send("Ei löytynyt käyttäjiä. Tarkista rooli / uusi kanava")
    return
  }
  usersWithRole.forEach( user => {
    user.voice.setChannel(newChannel)
  })

}

module.exports = {
  move
}