export async function executePlayerTurn(delay){
  const card = await this.deck.getCardAsync();
  this.player.hit(card)
  await this.displayDeck();
  await this.displayPlayer(delay)
}

export async function executeBotTurn(bot, delay){
  bot.hit(await this.deck.getCardAsync())
  await this.displayDeck();
  await this.displayBot(bot, delay)
}