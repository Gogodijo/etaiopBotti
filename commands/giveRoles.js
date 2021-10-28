const roles = async (msg, data) => {
  //Muista varmistaa, että data on muodossa {Discord_username: ..., Lippu: ...}
  const nickName = msg.author
  const hasRoles = msg.member.roles.cache.some( role => {
    return role.name == "Matkaaja" || role.name == "VIP-matkaaja"
  })
  if(hasRoles){
    msg.channel.send(`Sulla näyttäis olevan lippu jo, ${nickName}`)
    return
  }


  const normiViestit = [
    `Tässä lippunne ${nickName}, hyvää matkaa!`,
    `Terve ${nickName}, tässä lippu!`,
    `Heloust heloust, et sä mittä lippuu haluis ${nickName}? No ot täst.`,
    `Terve ${nickName}, hauskaa matkaa. Ota täst viel lippu hei!`,
    `Onneksi olkoon Mikko ${nickName} Forsman. Tässä lippu.`,
    `Teretulemast Narnianmatkoje lennol Jykylää ${nickName}.`,
    `Hei ${nickName}. Onko tullattavaa? Nesteet pääsee mukaan sisäisesti. `,
    `Welcome ${nickName}, här is your tikeet!`,
    `${nickName}, juu kaik o kunnos. Hyvää matkaa vaa!`,
    `Oikke aurinkoist päivää ${nickName}. Täs ois sul lippu, toivottavast nautit!`,
    `Heippuli. Tässä lippusi. Oikeen kivaa matkaa ${nickName}.`,
    `Hei, ${nickName}... Tässä lippu... ;)`,
    `Moooi, tästä laitetaan sulle lippu noooin olkaathyvä. Hyvää matkaan ${nickName}!`,
  ]

  const vippiViestit = [
    `Jaa, ei rahvaiden seura kelpaa. No ota tästä VIP-lippu, ${nickName}.`,
    `Jahas, massikeisari ${nickName} taas täällä. Noh tervetuloa, tuossa VIP-lippunne.`,
    `Vee. Iii. Pee. Halvempi ei riittänyt vai ${nickName}?`,
    `Jaa, ostit sitte virtuaalijatkeen kun ei riittäny rahat bemmiin? Onneks olkoon ${nickName}!`,
    `Nopat tais jäädä ${nickName}, mut onneks on fyffee. Tai siis oli.`,
    `Muista ${nickName}, että vipit ei automaattisesti pääse 10 kerhoon. ;) `,
    `Ne keilaa joilla on palloi. ${nickName} ot täst libu.`,
    `Menisit ${nickName} oikeisiin töihin ni ei tarvis leveillä fyrkalla. Tässä tää preemium lippus, lusmu.`,
    `${nickName}, Eikö rahvaiden seura kiinnosta vai hä? Täs sun VIPPI lippus`,
  ]


  const username = msg.author.username
  const user = data.find(dsuser => {
    const saidUser = dsuser.Discord_username
    return saidUser.split("#")[0].toLowerCase().trim() == username.toLowerCase()
  })
  if(!user){
    msg.channel.send(`En löytänyt lippuasi ${nickName}. Ota yhteyttä matkan järjestäjiin, jos olet ostanut lipun`)
  }
  if (user) {
    const role = msg.guild.roles.cache.find(role => {
      return role.name == user.Lippu
    })
    if (role) {
      await msg.member.roles.add(role)
      if (user.Lippu == "Matkaaja") {
        msg.channel.send(normiViestit[Math.floor(Math.random() * normiViestit.length)])
      }
      if (user.Lippu == "VIP-matkaaja") {
        msg.channel.send(vippiViestit[Math.floor(Math.random() * vippiViestit.length)])
      }
    }
  }
}
module.exports = {
  roles
}