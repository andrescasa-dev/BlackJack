import CardComponent from "./CardComponent.js";
import ChipComponent from "./ChipComponent.js";
import MiniCardComponent from "./MiniCardComponent.js";

export default function BotComponent(bot){
  const {cards, chips, score, index, status} = bot
  const miniCardsHTML = cards.map(card => MiniCardComponent(card)).join('');
  const cardsHTML = cards.map((card, i) => CardComponent({...card, i})).join('');
  const chipsHTML = chips.map(chip => ChipComponent()).join('');
  return `
  <div class="flex justify-center ${index % 2 === 0 ? 'flex-row-reverse' : ''} gap-2">
    <div class="md:hidden cards grid">
      ${miniCardsHTML}
    </div>
    <div class="hidden cards md:flex rotate-90 flex-row-reverse justify-center " >
     ${cardsHTML}
    </div>
    <div class="chips flex flex-col  justify-center items-center">
      ${chipsHTML}
    </div>
  </div>
  <div class="score flex justify-center ">
    <span>${score} : ${status}</span>
  </div>
  `
}