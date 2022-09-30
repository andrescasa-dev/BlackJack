import CardComponent from "./CardComponent.js";

export default function DealerComponent(dealer){
  const {score, cards, status} = dealer;
  const htmlCards = cards.map((card, i) => CardComponent({
    ...card,
    isBackwards: i === 1 && !dealer.reveal,
  })).join('');

  return  `
  <h2 class="text-2xl font-normal">Dealer</h2>
  <div class="cards_container" >
    ${htmlCards}
  </div>
  <div class="flex justify-center">
    <p><span class="font-semibold">${score}</span> ${status}</p>
  </div> 
  `
}