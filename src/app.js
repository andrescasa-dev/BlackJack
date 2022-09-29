import Bot from "./model/Bot.js";
import Dealer from "./model/Dealer.js";
import Deck from "./model/Deck.js";
import Player from "./model/Player.js";
import fetchDeck from "./utils/fetchDeck.js";
import timeout from "./utils/timeout.js";
import {player_btns} from "./view.js";

class App{
  constructor(){
    this.listeners();
    this.start();
  }
  async start(){
    this.deck = new Deck( await fetchDeck());
    this.dealer = new Dealer();
    this.player = new Player()
    this.bots = [new Bot(1), new Bot(2)]

    await this.initialBet(1000);
    await this.initialCardPlacement(1000);

    player_btns.forEach(btn => btn.classList.remove('hidden'));
    
    timeout(3000)
    await this.executeBotTurn(this.bots[0], 1000)
    await this.executeBotTurn(this.bots[0], 1000)
    this.bots.pop();
  }

  listeners(){
    document.addEventListener('click', async (event)=>{
      const {target} = event;
      if(target.matches('#btn_hit')){
        if(this.player.status === 'free'){
          const card = await this.deck.getCardAsync() 
          await this.player.hit(card);
          await this.deck.display(1000);
        }
        else player_btns.forEach(btn => btn.disabled = true)

        if(this.player === 'full'){
          this.player.bet(['one', 'half'])
        }
        if(this.player === 'bust'){
          this.player.loseBet();
        }
      }

      if(target.matches('#btn_stay')){
        for (const bot of this.bots) {
          if(bot.status === 'free'){
            const card = await this.deck.getCardAsync() 
            await bot.hit(card)
            await this.deck.display(1000);
          }
          if(bot.status === 'full'){
            bot.bet(['one', 'half'])
          }
          if(bot === 'bust'){
            bot.loseBet();
          }
        }
        this.dealer.reveal = true;
        this.dealer.display()
      }

    })
  }

  async initialCardPlacement(delay, i = 0){
    const contenders = [this.bots[0], this.player, this.bots[1], this.dealer]
    i++
    for (const contender of contenders) {
      const card = await this.deck.getCardAsync();
      contender.hit(card);
      await this.deck.display(delay);
    }
    if( i === 1) await this.initialCardPlacement(delay, i)
  }

  async initialBet(delay){ //could test if it works using foreach
    const contenders = [this.bots[0], this.player, this.bots[1]]
    for (const contender of contenders) {
      contender.bet(['one'])
      await contender.display(delay)
    }
  }
}
new App();