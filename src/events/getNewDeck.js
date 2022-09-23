import CardComponent from "../components/CardComponent.js";
import DealerComponent from "../components/DealerComponent.js";
import DeckComponent from "../components/DeckComponent.js";
import store from "../store.js";
import { BASE_URL_DECK_API } from "../utils/constants.js"
import getTotalScore from "../utils/getTotalScore.js";
import { div_deck, div_dealer } from "../view.js";

export default  async function getNewDeck(){
  try {
    const {deck_id, remaining} = await getDeck()
    store.dispatch({type: 'UPDATE_DECK', payload:{deck:{deck_id, remaining}}})
    div_deck.innerHTML = DeckComponent(store.state.deck);
    showDealerCard();
  } catch (error) {
    console.error(error);
  }
}

async function showDealerCard(){
  try {
    const {cards} = await getCards(store.state.deck.deck_id, 2);
    const dealer = store.state.characters['dealer']
    const newDealer = {
      ...dealer,
      cards: cards.map((card, i) => CardComponent({...card, i, dealerHold: i === 1? true: false})).join(''),
      score: getTotalScore(cards)
    }
    store.dispatch({type: 'UPDATE-CHARACTER', payload:{id:'dealer', character: newDealer}})
    div_dealer.innerHTML = DealerComponent(newDealer);
  } catch (error) {
    console.error(error)
  }
}

async function getCards(deck_id, count){
  const response = await fetch(`${BASE_URL_DECK_API}/deck/${deck_id}/draw/?count=${count}`)
  if(!response.ok) throw new Error('Bad card fetching')
  const data = await response.json();
  return data;
}

async function getDeck(){
  const response = await fetch(`${BASE_URL_DECK_API}/deck/new/shuffle/`)
  if(!response.ok) throw new Error('Bad deck fetching')
  const data = await response.json();
  return data
}