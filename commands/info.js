const info = msg => {
  const a = "Etä IOBotin ohjeet. Botti jakaa Matkaaja ja VIP-Matkaajaa rooleja csv tiedoston mukaan. Katsoo ainoastaan käyttäjän nimeä, eikä numerosarjaa. \n\n"
  const b = "!siirräjostain \"roolin nimi\" \" vanhan kanavan nimi\" \"Uuden kanavan nimi\" siirtää kaikki mainitun roolin omaavat henkilöt uudelle äänikanavalle. Discordin rajapinnan takia voi siirtää vaan 10 henkilöä kerralla, tämän jälkeen tulee noin 10s cooldown jonka jälkeen jatkaa siirtämistä. \n\n"
  const c = " !siirrä \"roolin nimi\" \"kanavan nimi\"  siirtää kaikki roolin omaavat tietylle kanavalle riippumatta siitä missä kanavassa he ovat. "
  msg.reply(a+b+c)
}

module.exports = {
  info
}