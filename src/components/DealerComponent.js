import CardComponent from "./CardComponent.js";

export default function DealerComponent(dealer){
  const {score, cards} = dealer;
  const htmlCards = cards.map((card, i) => CardComponent({
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
    <span>${score}</span>
  </div> 
  `
}