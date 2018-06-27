export class Tile {
	constructor(gridX, gridY) {
		this.pos = {x: gridX, y: gridY, 0: gridX, 1: gridY};
		this.STATES = {
			0: "blank",
			1: "p1",
			2: "?",
			3: "p2"
		};
		this.state = this.STATES[0];
	}

	render(game) {

		const tilesize = game.settings.tilesize;

		game.canvas.ctx.style = "#000000";
		game.canvas.ctx.rect(
			tilesize * this.pos.x + 1,
			tilesize * this.pos.y + 1,
			tilesize - 1, tilesize - 1);
		game.canvas.ctx.stroke();

		this.renderFunc(game);
	}

	renderFunc() {
		return;
	}
}