import CardComponent from "./CardComponent.js";
import ChipComponent from "./ChipComponent.js";

export default function PlayerComponent(player){
  const {cards, chips, score, status} = player
  const cardsHTML = cards.map(card => CardComponent(card)).join('')
  const chipsHTML = chips.map(chip => ChipComponent(chip)).join('');
  return `
  <div class="flex justify-center">
    ${chipsHTML}
  </div>
  <div>
    <p><span class="font-semibold">${score}</span> ${status}</p>
  </div>
  <div class="cards_container" >
    ${cardsHTML}
  </div>  
  `
}