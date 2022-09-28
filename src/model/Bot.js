import { div_bot } from "../view.js";
import Contender from "./Contender.js";

export default class Bot extends Contender{
  #index;
  constructor(index){
    super();
    this.#index = index
  }
  get index(){
    return this.#index;
  }

  hit(card){
    console.log("bot's hit");
    this.cards.push(card)
  }
}
