import { BASE_URL_DECK_API } from "./constants.js";

export default async function getDeck(){
  const response = await fetch(`${BASE_URL_DECK_API}/deck/new/shuffle/`)
  if(!response.ok) throw new Error('Bad deck fetching')
  const data = await response.json();
  return data
}