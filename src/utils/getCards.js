import DeckComponent from "../components/DeckComponent.js";
import store from "../store.js";
import { div_deck } from "../view.js";
import { BASE_URL_DECK_API } from "./constants.js";


export default async function getCards(count){
  const response = await fetch(`${BASE_URL_DECK_API}/deck/${store.state.deck.deck_id}/draw/?count=${count}`)
  if(!response.ok) throw new Error('Bad card fetching')
  const data = await response.json(); 
  displayDeck(data.remaining)
  return data.cards;
}

function displayDeck(remainingCards){
  store.dispatch({
    type:'PATCH_DECK', 
    payload: {
      deck:{
        remaining: remainingCards
      }
    }
  })
  div_deck.innerHTML = DeckComponent(store.state.deck)
}