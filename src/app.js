import BotComponent from "./components/BotComponent.js";
import DealerComponent from "./components/DealerComponent.js";
import DeckComponent from "./components/DeckComponent.js";
import PlayerComponent from "./components/PlayerComponent.js";
import Bot from "./model/Bot.js";
import Dealer from "./model/Dealer.js";
import Deck from "./model/Deck.js";
import Player from "./model/Player.js";
import fetchDeck from "./utils/fetchDeck.js";
import {div_bot, div_dealer, div_deck, div_player, player_btns } from "./view.js";

class App{
  constructor(){
    this.listeners();
    this.start();
  }
  async start(){
    this.deck = new Deck( await fetchDeck());
    this.dealer = new Dealer();
    this.contenders = [new Player(), new Bot(1), new Bot(2)]
    
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
        const player = this.contenders[0]
        player_btns.forEach(btn => btn.disabled = true)
        
        const card = await this.deck.getCardAsync();
        div_deck.innerHTML = DeckComponent(this.deck)
        player.hit(card)
        div_player.innerHTML = PlayerComponent(player)
        await this.executeBotsTurn();

        player_btns.forEach(btn => btn.disabled = false)
      }

      if(target.matches('#btn_stay')){
        await this.executeBotsTurn();
      }
    })
  }

  async executeBotsTurn(){
    const bots = this.contenders.slice(1);
    return Promise.all( 
      bots.map(async bot =>{
          setTimeout(async ()=>{
            bot.hit(await this.deck.getCardAsync())
            div_deck.innerHTML = DeckComponent(this.deck)
            div_bot[bot.index - 1].innerHTML = BotComponent(bot)
          }
          ,1000)
      })
    );
  }
}

new App();