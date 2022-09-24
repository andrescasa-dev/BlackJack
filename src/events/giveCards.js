import store from "../store.js";
import getCards from "../utils/getCards.js";

export default async function giveCard(character, count){
  //1. get Card
  debugger;
  const cards = await getCards(count);
  
  //give to the bot1 the card
}

function displayCards(cards){
  
}