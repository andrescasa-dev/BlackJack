import { BASE_URL_DECK_API } from "./constants.js";

export default async function getCardFromDeck(id, count){
  console.log(`${BASE_URL_DECK_API}/deck/${id}/draw/?count=${count}`);
  const response = await fetch(`${BASE_URL_DECK_API}/deck/${id}/draw/?count=${count}`)
  if(!response.ok) throw new Error('Bad card fetching')
  const data = await response.json();
  return data.cards;
}