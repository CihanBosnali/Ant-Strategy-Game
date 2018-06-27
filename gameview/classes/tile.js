export class Tile {
	constructor(gridX, gridY) {
		this.pos = {x: gridX, y: gridY};
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

	renderFunc(game) {
		const tilesize = game.settings.tilesize;

		if (this.state === this.STATES["1"]) {
			game.canvas.ctx.fillStyle = game.players[0].color;
			game.canvas.ctx.fillRect(
				tilesize * this.pos.x + 8,
				tilesize * this.pos.y + 8,
				tilesize - 16, tilesize - 16);
		} else if (this.state === this.STATES["3"]) {
			game.canvas.ctx.fillStyle = game.players[1].color;
			game.canvas.ctx.fillRect(
				tilesize * this.pos.x + 8,
				tilesize * this.pos.y + 8,
				tilesize - 16, tilesize - 16);
		}
	}
}