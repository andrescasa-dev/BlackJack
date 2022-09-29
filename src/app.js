import BotComponent from "./components/BotComponent.js";
import DealerComponent from "./components/DealerComponent.js";
import DeckComponent from "./components/DeckComponent.js";
import PlayerComponent from "./components/PlayerComponent.js";
import { executeBotsTurn, executePlayerTurn } from "./events/executeRound.js";
import Bot from "./model/Bot.js";
import Dealer from "./model/Dealer.js";
import Deck from "./model/Deck.js";
import Player from "./model/Player.js";
import fetchDeck from "./utils/fetchDeck.js";
import timeout from "./utils/timeout.js";
import {div_bot, div_dealer, div_deck, div_player, player_btns} from "./view.js";

class App{
  constructor(){
    this.bindings();
    this.listeners();
    this.start();
  }
  async start(){
    this.deck = new Deck( await fetchDeck());
    this.dealer = new Dealer();
    this.contenders = [new Player(), new Bot(2), new Bot(1)]
    
    div_deck.innerHTML = DeckComponent(this.deck);
    this.dealer.placeCards(await this.deck.getCardsAsync(2));
    div_dealer.innerHTML = DealerComponent(this.dealer);
    const cards = await this.deck.getCardsAsync(this.contenders.length);

    const player = this.contenders[0]
    player.hit(cards.pop())
    div_player.innerHTML = PlayerComponent(player)
    
    this.contenders.slice(1).forEach(bot =>{
      bot.hit(cards.pop())
      div_bot[bot.index-1].innerHTML = BotComponent(bot)
    });
    
  }

  listeners(){
    document.addEventListener('click', async (event)=>{
      const {target} = event;
      if(target.matches('#btn_hit')){
        player_btns.forEach(btn => btn.disabled = true)
        await this.executePlayerTurn(1000);
        await this.executeBotsTurn(1000);
        player_btns.forEach(btn => btn.disabled = false)
      }

      if(target.matches('#btn_stay')){
        await this.executeBotsTurn(1000);
      }
    })
  }

  bindings(){
    this.executePlayerTurn = executePlayerTurn.bind(this)
    this.executeBotsTurn = executeBotsTurn.bind(this)
  }

  async displayPlayer(delay = 0){
    div_player.innerHTML = PlayerComponent(this.contenders[0]);
    await timeout(delay)
  }
  
  async displayDeck(delay = 0){
    div_deck.innerHTML = DeckComponent(this.deck)
    await timeout(delay)
  }

  async displayBot(bot, delay = 0){ //Promise.all could be necessary
    div_bot[bot.index - 1].innerHTML = BotComponent(bot)
    await timeout(delay)
  }
  
}
new App();