import { Tile } from "./tile.js";

class Ant extends Tile {
	constructor (x, y, hdg) {
		super(x, y);
		this.hdg = hdg;
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