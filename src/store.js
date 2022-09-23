import Character from "./model/Character.js";

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
  characters: {
    dealer: new Character('dealer'),
    bot1: new Character('bot'),
    bot2: new Character('bot2'),
    player: new Character('player'),
  }
}

function gameReducer(state = initialState, action){
  switch(action.type){
    case 'UPDATE_DECK':
      return state = {...state, deck: action.payload.deck}
    case 'UPDATE_CHARACTER':
      const newCharacters = {...state.characters}
      newCharacters[action.payload.id] = action.payload.character;
      return state = {...state, characters: newCharacters}
    default:
      return state;
  }
}

const store = new Store(gameReducer);
export default store;


