import getNewDeck from "./events/getNewDeck.js";
import store from "./store.js";

class App{
  constructor(){
   this.start();
  }
  async start(){
    await getNewDeck();
    const dealer = findCharacter('dealer');
    await dealer.placeCards();
    dealer.display();
    const bot1 = findCharacter('bot1')
    const bot2 = findCharacter('bot2')
    const player = findCharacter('player')
    await game(bot1)
    await game(player)
    await game(bot2)
    
  }
}

function findCharacter (characterName){
  return store.state.characters.find(character => character.id === characterName)
}

async function game(character){
  await character.pushCard();
  character.display();
}

new App();