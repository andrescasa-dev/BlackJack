import Bot from "./model/Bot.js";
import Dealer from "./model/Dealer.js";
import Player from "./model/Player.js";

class Store{
  #reducer;
  constructor(reducer){
    this.#reducer = reducer;
    this.state;
  }
  dispatch(action){
    this.state = this.#reducer(this.state, action);
  }
}

const initialState = {
  deck:{
    deck_id: undefined,
    remaining: undefined,
  },
  characters: [
    new Dealer('dealer'),
    new Bot('bot', 1),
    new Bot('bot', 2),
    new Player('player'),
  ]
}

function gameReducer(state = initialState, action){
  switch(action.type){
    case 'UPDATE_DECK':
      return state = {...state, deck: action.payload.deck}
    case 'PATCH_DECK':
      return state = {...state, deck: {...state.deck, ...action.payload.deck}}
    case 'UPDATE_CHARACTER':
      const newCharacter = action.payload.character
      const index = state.characters.findIndex(character => character.id === newCharacter.id)
      const characters = [...state.characters.slice(0,index), newCharacter, ...state.characters.slice(index + 1)]
      return state = {...state, characters}
    default:
      return state;
  }
}

const store = new Store(gameReducer);
export default store;


