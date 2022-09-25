import getNewDeck from "./events/getNewDeck.js";
import store from "./store.js";
import { player_btns } from "./view.js";

class App{
  constructor(){
    this.listeners();
    this.start();
  }
  async start(){
    //deck
    await getNewDeck();
    //dealer
    const dealer = findCharacter('dealer');
    await dealer.placeCards();
    dealer.display();
    //first cards placement
    const contenders = store.state.characters.filter(character => character.id !== 'dealer');
    contenders.forEach(contender => hit(contender));
  }

  listeners(){
    document.addEventListener('click', (event)=>{
      const {target} = event;
      if(target.matches('#btn_hit')){
        player_btns.forEach(btn => btn.disabled = true)
        round(()=> hit(findCharacter('player')))
        .then(()=> player_btns.forEach(btn => btn.disabled = false))
      }
      if(target.matches('#btn_stay')){
        round(()=>{});
      }
    })
  }
}

async function round(cb){
  const bots = store.state.characters.filter(character => /bot[\d]+/.test(character.id))
  cb();
  return Promise.all(bots.map(bot => hit(bot)));
}

function findCharacter(characterName){
  return store.state.characters.find(character => character.id === characterName)
}

async function hit(character){
  await character.pushCard();
  character.display();
}

new App();