import DeckComponent from "../components/DeckComponent.js";
import store from "../store.js";
import { BASE_URL_DECK_API } from "../utils/constants.js"
import { div_deck } from "../view.js";

export default  async function getNewDeck(){
  try {
    const {deck_id, remaining} = await getDeck()
    store.dispatch({
      type: 'UPDATE_DECK',
      payload:{
        deck:{deck_id, remaining}
      }
    })
    div_deck.innerHTML = DeckComponent(store.state.deck);
  } catch (error) {
    console.error(error);
  }
}

async function getDeck(){
  const response = await fetch(`${BASE_URL_DECK_API}/deck/new/shuffle/`)
  if(!response.ok) throw new Error('Bad deck fetching')
  const data = await response.json();
  return data
}