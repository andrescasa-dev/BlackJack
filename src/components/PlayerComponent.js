import CardComponent from "./CardComponent.js";
import ChipComponent from "./ChipComponent.js";

export default function PlayerComponent(player){
  const {cards, chips, score, status} = player
  const cardsHTML = cards.map((card, i) => CardComponent({...card, i})).join('')
  const chipsHTML = chips.map(chip => ChipComponent(chip)).join('');
  return `
  <div class="flex justify-center">
    ${chipsHTML}
  </div>
  <div>
    <span>${score} : ${status}</span>
  </div>
  <div class="cards flex flex-row-reverse justify-center " >
    ${cardsHTML}
  </div>  
  `
}