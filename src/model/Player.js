import CardComponent from "../components/CardComponent.js";
import ChipComponent from "../components/ChipComponent.js";
import store from "../store.js";
import { div_player } from "../view.js";
import Character from "./Character.js";

export default class Player extends Character{
  #HTMLem
  constructor(id){
    super(id);
    this.#HTMLem = div_player;
  }
  #component(){
    const cardsHTML = this.cards.map((card, i) => CardComponent({...card, i}))
    const chipsHTML = this.chips.map(chip => ChipComponent());
    return `
    <div class="flex justify-center">
      ${chipsHTML}
    </div>
    <div>
      <span>${this.score}</span>
    </div>
    <div class="cards flex flex-row-reverse justify-center " >
      ${cardsHTML}
    </div>  
    `
  }
  display(){
    this.#HTMLem.innerHTML = this.#component()
    store.dispatch({
      type:'SAVE_CHARACTER',
      payload: {
        character: this
      }
    })
  }
}