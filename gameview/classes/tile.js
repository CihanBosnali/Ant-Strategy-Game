class Tile {
	constructor(gridX, gridY) {
		this.pos = {x: gridX, y: gridY, 0: gridX, 1: gridY};
		this.state = this.prototype[0];

	}

	render(renderFunc) {
		renderFunc(this.x, this.y);
	}
}

Tile.prototype.STATES = {
	0: "blank",
	1: "p1"
}