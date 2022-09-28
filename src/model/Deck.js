import { BASE_URL_DECK_API } from "../utils/constants.js"

export default class Deck{
  constructor(deck){
    const {deck_id, remaining} = deck;
    this.id = deck_id;
    this.remaining = remaining;
  }

  async getCardAsync(){
    const cards = await this.getCardsAsync(1)
    return cards[0];
  }

  async getCardsAsync(count){
    console.log(`${BASE_URL_DECK_API}/deck/${this.id}/draw/?count=${count}`);
    const response = await fetch(`${BASE_URL_DECK_API}/deck/${this.id}/draw/?count=${count}`)
    if(!response.ok) throw new Error('Bad card fetching')
    const data = await response.json(); 
    this.remaining = data.remaining;
    return data.cards;
  }
}