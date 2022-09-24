import store from "../store.js"
import getCards from "../utils/getCards.js"


export default class Character{
  constructor(id){
    this.id = id
    this.cards = []
    this.chips = []
    this.score = 0
  }
  async pushCard(){
    const cards = await getCards(1)
    this.cards = [...this.cards, cards[0]]
  }
  
}