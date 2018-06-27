import { Tile } from "./tile.js";

class Player extends Tile {
	constructor(clr, id) {
		this.id = id;
		this.color = clr;
	}

	renderFunc(game) {

	}
}

export default Player;