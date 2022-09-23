export default function DeckComponent({remaining}){
  const image = '<img class="rounded-lg" src="../assets/pngwing.com.png"></img>'
  return `
<div class="max-w-[8rem]">
  ${remaining > 1? image: ''}
</div>
<span class="absolute inset-center bg-white text-red-400 p-2 rounded-lg" id="remaining">${remaining}</span>`
}