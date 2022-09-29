export async function executePlayerTurn(delay){
  const player = this.contenders[0]
  const card = await this.deck.getCardAsync();
  player.hit(card)
  await this.displayDeck();
  await this.displayPlayer(delay)
}

export async function executeBotsTurn(delay){
  const bots = this.contenders.slice(1);
  for (const bot of bots) {
    bot.hit(await this.deck.getCardAsync())
    await this.displayDeck();
    await this.displayBot(bot, delay)
  }
}