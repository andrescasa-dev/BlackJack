import CardComponent from "../components/CardComponent.js";
import ChipComponent from "../components/ChipComponent.js";
import MiniCardComponent from "../components/MiniCardComponent.js";
import store from "../store.js";
import { div_bot } from "../view.js";
import Character from "./Character.js";

export default class Bot extends Character{
  #HTMLem;
  #index;
  constructor(id, index){
    super(`${id}${index}`);
    this.#HTMLem = div_bot[index - 1];
    this.#index = index
  }

  #component(){
    const miniCardsHTML = this.cards.map(card => MiniCardComponent(card))
    const cardsHTML = this.cards.map((card, i) => CardComponent({...card, i}));
    const chipsHTML = this.chips.map(chip => ChipComponent());
    return `
    <div class="flex justify-center ${this.#index % 2 === 0 ? 'flex-row-reverse' : ''} gap-2">
      <div class="md:hidden cards grid">
        ${miniCardsHTML}
      </div>
      <div class="hidden cards md:flex rotate-90 flex-row-reverse justify-center " >
       ${cardsHTML}
      </div>
      <div class="chips flex flex-col  justify-center items-center">
        ${chipsHTML}
      </div>
    </div>
    <div class="score flex justify-center ">
      <span>${this.score}</span>
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