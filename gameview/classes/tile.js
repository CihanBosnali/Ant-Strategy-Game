class Tile {
	constructor(gridX, gridY) {
		this.pos = {x: gridX, y: gridY, 0: gridX, 1: gridY};
		this.state = this.prototype.STATES[0];
	}

	render(game) {

		const tilesize = game.options.tileSize;

		game.canvas.ctx.style("#FFFFFF");
		game.canvas.ctx.fillRect(tilesize * this.pos.x + 1, tilesize * this.pos.x + 1, tilesize, tilesize);


		this.renderFunc(game);
	}

	renderFunc() {
		return;
	}
}

Tile.prototype.STATES = {
	0: "blank",
	1: "p1",
	2: "?",
	3: "p2"
};

export default Tile;