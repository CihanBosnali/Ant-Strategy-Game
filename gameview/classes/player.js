import { Tile } from "./tile.js";

export class Player extends Tile {
	constructor(clr, id) {
		super(0, 0);
		this.id = id;
		this.color = clr;
	}

	get start() {
		return this.pos;
	}

	set start(pos) {
		this.pos = {
			0: pos.x,
			1: pos.y,
			x: pos.x,
			y: pos.y
		};
	}

	renderFunc(game) {
		const ctx = game.canvas.ctx;
		const x = game.settings.tilesize*this.pos.x+2;
		const y = game.settings.tilesize*this.pos.y+2;

		ctx.beginPath();
		ctx.arc(
			game.settings.tilesize * this.pos.x + 2,
			game.settings.tilesize * this.pos.y + 2,
			(game.settings.tilesize - 2) / 2,
			0, 2 * Math.PI
		);
		ctx.fillStyle = this.color;
		ctx.fill();
	}
}