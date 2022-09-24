import CardComponent from "../components/CardComponent.js";
import store from "../store.js";
import getCards from "../utils/getCards.js";
import { div_dealer } from "../view.js";
import Character from "./Character.js";

export default class Dealer extends Character{
  #HTMLem
  constructor(id){
    super(id);
    this.#HTMLem = div_dealer
  }
  async placeCards(){
    const newCards = await getCards(2)
    this.cards = [...this.cards, ...newCards]
  }
  #component(){
    const htmlCards = this.cards.map((card, i) => CardComponent({
      ...card,
      i,
      dealerHold: i === 1 || false
    })).join('');
    return  `
    <h2>Dealer</h2>
    <div class="cards flex flex-row-reverse justify-center" >
      ${htmlCards}
    </div>
    <div class="flex justify-center">
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