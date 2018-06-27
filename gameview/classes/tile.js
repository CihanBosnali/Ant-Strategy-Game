export class Tile {
	constructor(gridX, gridY) {
		this.pos = {x: gridX, y: gridY, 0: gridX, 1: gridY};
		this.STATES = {
			0: "blank",
			1: "p1",
			2: "?",
			3: "p2"
		};
		this.state = this.prototype.STATES[0];
	}

	render(game) {

		const tilesize = game.options.tileSize;

		game.canvas.ctx.style("#FFFFFF");
		game.canvas.ctx.rect(
			tilesize * this.pos.x + 1,
			tilesize * this.pos.x + 1,
			tilesize, tilesize);
		game.canvas.ctx.stroke();

		this.renderFunc(game);
	}

	renderFunc() {
		return;
	}
}