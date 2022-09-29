import Character from "./Character.js";

export default class Contender extends Character {
  #chips
  constructor(){
    super();
    this.#chips = []
  }

  bet(chips){
    this.#chips = [...this.#chips, ...chips];
  }

  loseBet(){
    this.#chips = [];
  }

  addCard(card){
    this.cards.push(card)
  }

  get chips(){
    return [...this.#chips]
  }
}