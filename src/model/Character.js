export default class Character{
  #status
  #score
  constructor(){
    this.#score = 0;
    this.cards = []
    this.#status = 'free';
  }

  addCard(card){
    this.cards.push(card)
  }

  async hit(card, delay){
    this.addCard(card)
    await this.display(delay)
  }

  get score(){
    const numValues = this.cards.map(({value})=>{
      let number;
      if(isNaN(value)){
        number = value === 'ACE' ? 11 : 10;
      }
      else{
        number = Number(value);
      } 
      return number;
    })
    if(this.#status === 'hidden') return numValues[0];
    const noAces = numValues.filter(value => value < 11);
    const aces = numValues.filter(value => value === 11);
    let sum = noAces.reduce((acc, curr) => { return acc + curr},0);
    if(sum < 11 && aces.length > 0) sum += 11;
    return sum;
  }

  get status(){
    if(this.#status === 'hidden') return this.#status
    if(this.score === 21) this.#status = 'full'
    if(this.score > 21) this.#status = 'bust'
    return this.#status
  }

  set status(newStatus){
    this.#status = newStatus;
  }
}