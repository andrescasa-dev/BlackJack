import PlayerComponent from "../components/PlayerComponent.js";
import timeout from "../utils/timeout.js";
import { div_player } from "../view.js";
import Contender from "./Contender.js";

export default class Player extends Contender{
  constructor(){
    super();
  }

  async display(delay = 0){
    div_player.innerHTML = PlayerComponent(this);
    await timeout(delay)
  }
}