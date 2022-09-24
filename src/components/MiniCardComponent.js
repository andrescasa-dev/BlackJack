export default function MiniCardComponent(card){
  const {code} = card
  return `
  <div class="flex justify-center items-center rounded-md border border-black bg-gray-100 h-10 w-14">
    <span class="text-black ">${code}</span>
  </div>
  `
}