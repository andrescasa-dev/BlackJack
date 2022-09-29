import { BASE_URL_DECK_API } from "./constants.js";

export default async function getDeck(){
  const url = `${BASE_URL_DECK_API}/deck/new/shuffle/`
  console.log({url});
  const response = await fetch(url)
  if(!response.ok) throw new Error('Bad deck fetching')
  const data = await response.json();
  return data
}