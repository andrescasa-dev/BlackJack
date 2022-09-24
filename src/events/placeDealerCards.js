import store from "../store";
import getCards from "../utils/getCards";

export default async function showDealerCard(){
  try {
    const {cards} = await getCards(2);
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