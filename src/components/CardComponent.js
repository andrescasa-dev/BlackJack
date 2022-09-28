export default function CardComponent({image, i, dealerHold}){
  const margin = i > 0 ? 'mr-[-6.5rem]' : ''
  const reverse = '../../assets/pngwing.com.png'
  return`
  <div class="max-w-[8rem] ${margin}">
    <img class="rounded-lg" src="${dealerHold ? reverse : image}"></img>
  </div>
  `
}