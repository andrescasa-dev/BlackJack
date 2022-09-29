export default class Character{
  #status
  #score
  constructor(){
    this.#score = 0;
    this.cards = []
    this.#status = 'full';
  }

  addCard(card){
    this.cards.push(card)
  }

  async hit(card, delay){
    this.addCard(card)
    await this.display(delay)
  }

  get score(){
    return this.cards.reduce((score, {value})=>{
      return score + (isNaN(value) ? 10 : Number(value));
    },0)
  }

  get status(){
    if(this.score === 21) this.#status = 'full'
    if(this.score > 21) this.#status = 'bust'
    return this.#status
  }
}