export default function CardComponent({image, isBackwards, isRotated}){
  
  const reverse = isBackwards && '<img class="card" src="../../assets/backward.png" alt="">'

  const rotateCardHTML = isRotated && `
  <div class="card-rotate before:bg-[url(${image})]">
  </div>
  `
  const normalCard = `
  <img class="card" src="${image}" alt="">
  `
  const html = reverse || rotateCardHTML || normalCard;
  return html
}