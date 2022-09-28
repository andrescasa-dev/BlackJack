import Character from "./Character.js";

export default class Contender extends Character {
  #chips
  constructor(){
    super();
    this.#chips = []
  }

  bet(){
    this.#chips.push('one');
  }

  hit(card){
    this.cards.push(card)
  }

  get chips(){
    return [...this.#chips]
  }
}