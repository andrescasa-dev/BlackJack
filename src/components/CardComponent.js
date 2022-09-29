export default function CardComponent({image, i, backFace}){
  const margin = i > 0 ? 'mr-[-6.5rem]' : ''
  const reverse = '../../assets/pngwing.com.png'
  return`
  <div class="max-w-[8rem] ${margin}">
    <img class="rounded-lg" src="${backFace ? reverse : image}"></img>
  </div>
  `
}