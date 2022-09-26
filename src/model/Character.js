import store from "../store.js"
import getCards from "../utils/getCards.js"


export default class Character{
  constructor(id){
    this.id = id
    this.cards = []
    this.chips = []
    this.score;
  }
  async pushCard(){
    const cards = await getCards(1)
    this.cards = [...this.cards, cards[0]]
  }
  get score(){
    return this.cards.reduce((score, card)=>{
      let {value} = card
      value = Number(value)
      return score + (Number.isNaN(value) ? 10 : value);
    },0)
  }
}