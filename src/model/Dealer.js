import DealerComponent from "../components/DealerComponent.js";
import timeout from "../utils/timeout.js";
import { div_dealer } from "../view.js";
import Character from "./Character.js";

export default class Dealer extends Character{
  constructor(){
    super();
    this.reveal = false;
  }

  display(delay){
    div_dealer.innerHTML = DealerComponent(this);
    timeout(delay)
  }
}