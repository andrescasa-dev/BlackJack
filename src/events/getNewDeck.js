import DeckComponent from "../components/DeckComponent.js";
import store from "../store.js";
import { BASE_URL_DECK_API } from "../utils/constants.js"
import { deck } from "../view.js";

export default  async function getNewDeck(){
  const {deck_id, remaining} = await getDeck()
  store.dispatch({type: 'UPDATE_DECK', payload:{deck:{deck_id, remaining}}})
  deck.innerHTML = DeckComponent(store.state.deck);
}

function showDealerCard(){

}

async function getCards(deck_id, count){
  const response = fetch(`${BASE_URL_DECK_API}/deck/${deck_id}/draw/?count=${count}`)
}

async function getDeck(){
  const response = await fetch(`${BASE_URL_DECK_API}/deck/new/shuffle/`)
  if(!response.ok) throw new Error('Bad deck fetching')
  const data = response.json();
  return data
}