import Character from "./Character.js";

export default class Dealer extends Character{
  constructor(){
    super();
  }

  placeCards(cards){
    this.cards = [...this.cards, ...cards]
  }

  revealCard(){
    return false
  }
}