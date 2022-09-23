export default function DealerComponent({score, cards}){
  //cards.map(card => Card(card)).join('');
  return `
<h2>Dealer</h2>
<div class="cards flex flex-row-reverse justify-center " >
  <div class="max-w-[8rem] ">
    <img class="rounded-lg" src="https://deckofcardsapi.com/static/img/2S.png"></img>
  </div>
  <div class="max-w-[8rem] mr-[-6.5rem]">
    <img class="rounded-lg" src="https://deckofcardsapi.com/static/img/2S.png"></img>
  </div>
</div>
<div class="flex justify-center">
  <span>${score}</span>
</div> 
`
}