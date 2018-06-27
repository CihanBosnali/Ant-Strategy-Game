import { Tile } from "./tile.js";
import { Game } from "./game.js";

class Ant extends Tile {
	constructor (x, y, hdg) {
		super(x, y);
		this.hdg = hdg;
	}


	move(){
		const way = this.hdg;
		const BoxCoord = [this.x, this.y];
		var nextBoxCoord = BoxCoord;

		// It is a Tile object but JS don't rocognize it...
		var nextTile;

		if (way == 0) {
			nextBoxCoord[1] += 1;

		} else if (way == 1) {
			nextBoxCoord[0] += 1;

		} else if (way == 2) {
			nextBoxCoord[1] -= 1;

		} else if (way == 3) {
			nextBoxCoord[0] -= 1;
		}

		nextTile = Game.tiles[( nextBoxCoord[1] - 1 * Game.tileShape.w) + nextBoxCoord[0]];
		
		this.x = nextBoxCoord[0];
		this.y = nextBoxCoord[1];
		
		if nextTile.state == 1{
			this.hdg += 1;
		} else if nextTile.state == 3 {
			this.hdg -= 1;
		}
	}

	renderFunc(game) {

	}
}

export default Ant;