import CardComponent from "./CardComponent.js";
import ChipComponent from "./ChipComponent.js";
import MiniCardComponent from "./MiniCardComponent.js";

export default function BotComponent(bot){
  const {cards, chips, score, index, status} = bot
  const miniCardsHTML = cards.map(card => MiniCardComponent(card)).join('');
  const cardsHTML = cards.map(card => CardComponent({...card, isRotated: true})).join('');
  const chipsHTML = chips.map(chip => ChipComponent(chip)).join('');
  return `
  <div class="min-w-[8rem] flex justify-center ${index % 2 === 0 ? 'flex-row-reverse' : ''} gap-4">
    <div class="md:hidden cards grid">
      ${miniCardsHTML}
    </div>
    <div class="hidden md:flex cards-rotate-container">
     ${cardsHTML}
    </div>
    <div class="chips flex flex-col  justify-center items-center">
      ${chipsHTML}
    </div>
  </div>
  <div class="score flex justify-center ">
    <p><span class="font-semibold">${score}</span> ${status}</p>
  </div>
  `
}