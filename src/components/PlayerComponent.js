import CardComponent from "./CardComponent.js";

export default function PlayerComponent(player){
  const {cards, chips, score, status} = player
  const cardsHTML = cards.map((card, i) => CardComponent({...card, i}))
  const chipsHTML = chips.map(chip => ChipComponent());
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