import { Tile } from "./tile.js";

export class Player extends Tile {
	constructor(clr, id) {
		super(0, 0);
		this.id = id;
		this.color = clr || (function (id) {
			if (id === 0) {
				return "#FF0000";
			} else { return "#0000FF";}
		})(id);
		this.state = this.STATES["2"];
	}

	get start() {
		return this.pos;
	}

	set start(pos) {
		this.pos = {
			x: pos.x,
			y: pos.y
		};
	}

	renderFunc(game) {
		game.canvas.ctx.beginPath();
		game.canvas.ctx.arc(
			game.settings.tilesize * this.pos.x + (game.settings.tilesize / 2) + 1,
			game.settings.tilesize * this.pos.y + (game.settings.tilesize / 2) + 1,
			(game.settings.tilesize - 2) / 2 - 4,
			0, 2 * Math.PI
		);
		game.canvas.ctx.fillStyle = this.color;
	}
}