import Bot from "./model/Bot.js";
import Dealer from "./model/Dealer.js";
import Deck from "./model/Deck.js";
import Player from "./model/Player.js";
import fetchDeck from "./utils/fetchDeck.js";
import timeout from "./utils/timeout.js";
import {player_btns} from "./view.js";
const DELAY = 100

class App{
  constructor(){
    this.listeners();
    this.start();
  }
  async start(){
    this.deck = new Deck( await fetchDeck());
    this.dealer = new Dealer();
    this.player = new Player()
    this.bot1 = new Bot(1);
    this.bot2 = new Bot(2)

    
    await this.initialBet(DELAY);
    await this.initialCardPlacement(DELAY);

    timeout(DELAY)
    await this.botTurn(this.bot1)

    player_btns.forEach(btn => btn.classList.remove('hidden'));
  }

  listeners(){
    document.addEventListener('click', async (event)=>{
      const {target} = event;
      if(target.matches('#btn_hit')){
        if(this.player.status === 'free'){
          const card = await this.deck.getCardAsync() 
          await this.deck.display(DELAY);
          await this.player.hit(card);
        }
        if(this.player.status !== 'free'){
          player_btns.forEach(btn => btn.disabled = true)
        }
        
        if(this.player.status === 'full'){
          this.player.bet(['one', 'half'])
          this.player.display(DELAY);
          await this.continueTheGame()
        }

        if(this.player.status === 'bust'){
          this.player.loseBet();
          this.player.display(DELAY);
          await this.continueTheGame()
        }
      }

      if(target.matches('#btn_stay')){
        player_btns.forEach(btn => btn.disabled = true)
        await this.continueTheGame()
      }

    })
  }

  async continueTheGame(){
    await this.botTurn(this.bot2);
    await this.dealerReveal();
  }

  async botTurn(bot){
    if(bot.status === 'free'){
      const card = await this.deck.getCardAsync();
        bot.hit(card)
        if(bot.score <= 16) 
          await this.botTurn(bot)
        await this.deck.display(DELAY)
    }
    if(bot.status === 'full'){
      bot.bet(['one', 'half'])
      bot.display(DELAY);
    }
    if(bot.status === 'bust'){
      bot.loseBet();
      bot.display(DELAY);
    }
  }

  async dealerReveal(){
    let winners;
    let losers;
    const remainingContenders = [this.bot1, this.player, this.bot2].filter(contender => contender.status === 'free');

    this.dealer.reveal = true;
    this.dealer.display()

    if(this.dealer.score <= 16){
      const card = await this.deck.getCardAsync();
      this.dealer.hit(card);
      await this.deck.display();
      await this.dealerReveal();
    }
    else{
      if(this.dealer.status === 'bust'){
        winners = remainingContenders;
      }
      else{
        winners = remainingContenders.filter( contender => contender.score > this.dealer.score)   
        losers = remainingContenders.filter( contender => contender.score <= this.dealer.score)
        losers.forEach( loser => loser.loseBet())
      }
      winners.forEach(contender => {
        contender.bet([...contender.chips, ...contender.chips])        
      })
      for (const contender of remainingContenders) {
        await contender.display();
      }
    }
  }
  
  async initialCardPlacement(delay, i = 0){
    const contenders = [this.bot1, this.player, this.bot2, this.dealer]
    i++
    for (const contender of contenders) {
      const card = await this.deck.getCardAsync();
      contender.hit(card);
      await this.deck.display(delay);
    }
    if( i === 1) await this.initialCardPlacement(delay, i)
  }

  async initialBet(delay){ //could test if it works using foreach
    const contenders = [this.bot1, this.player, this.bot2]
    for (const contender of contenders) {
      contender.bet(['one'])
      await contender.display(delay)
    }
  }
}
new App();