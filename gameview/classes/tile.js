class Tile {
	constructor(gridX, gridY) {

	}

	render(renderFunc) {
		renderFunc(this.x, this.y);
	}
}