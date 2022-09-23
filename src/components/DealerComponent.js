export default function DealerComponent({score, cards}){
  return `
<h2>Dealer</h2>
<div class="cards flex flex-row-reverse justify-center" >
  ${cards}
</div>
<div class="flex justify-center">
  <span>${score}</span>
</div> 
`
}