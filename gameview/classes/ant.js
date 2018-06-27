import { Tile } from "./tile.js";

class Ant extends Tile {
	constructor (x, y, hdg) {
		super(x, y);
		this.hdg = hdg;
	}

	renderFunc(game) {

	}
}

export default Ant;