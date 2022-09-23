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
  characters: [
    new Character('dealer'),
    new Character('bot'),
    new Character('bot2'),
    new Character('player'),
  ]
}

function gameReducer(state = initialState, action){
  switch(action.type){
    case 'UPDATE_DECK':
      return state = {...state, deck: action.payload.deck}
    default:
      return state;
  }
}

const store = new Store(gameReducer);
export default store;


