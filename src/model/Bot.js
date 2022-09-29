import BotComponent from "../components/BotComponent.js";
import timeout from "../utils/timeout.js";
import { div_bot } from "../view.js";
import Contender from "./Contender.js";

export default class Bot extends Contender{
  #index;
  constructor(index){
    super();
    this.#index = index
  }
  get index(){
    return this.#index;
  }



  async display(delay = 0){
    div_bot[this.index - 1].innerHTML = BotComponent(this)
    await timeout(delay)
  }
}
