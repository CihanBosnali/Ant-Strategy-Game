import { Tile } from "./tile.js";

class Ant extends Tile {
	constructor (x, y, hdg) {
		super(x, y);
		this.hdg = hdg;
	}


	move(){
		const way = this.hdg;
		const BoxCoord = [this.x, this.y];
		var nextBoxCoord = BoxCoord;

		if (way == 0) {
			nextBoxCoord[1] += 1;

		} else if (way == 1) {
			nextBoxCoord[0] += 1;

		} else if (way == 2) {
			nextBoxCoord[1] -= 1;

		} else if (way == 3) {
			nextBoxCoord[0] -= 1;
		}

		this.x = nextBoxCoord[0];
		this.y = nextBoxCoord[1];
	}

	turnRight(){
		this.hdg += 1;
	}

	turnLeft(){
		this.hdg -= 1;
	}

	renderFunc(game) {
		const antimage = (new Image()).baseURI = "assets/ant.png";
		game.canvas
		.ctx.drawImage(
			antimage,
			game.settings.tilesize*this.pos.x+2,
			game.settings.tilesize*this.pos.y+2,
			game.settings.tilesize - 2,
			game.settings.tilesize - 2
		);
	}
}

export default Ant;