import { Ant } from "./ant.js";
import { Tile } from "./tile.js";
import { Player } from "./player.js";

class Game {
	constructor(size, tilesize) {

		if (size%tilesize) {throw new TypeError("Size should be divisible by tilesize!");}

		this.settings = {
			tilesize
		};

		this.shape = {};
		this.shape.w = size;
		this.shape.h = size;

		this.tileShape = {};
		this.tileShape.w = size/tilesize;
		this.tileShape.h = size/tilesize;

		this.tiles = [];
		for (let i = 0; i < size/tilesize; i++) {
			this.tiles.push(new Array(size/tilesize));
		}
	}

	get canvasId() {
		return this.canvas.id;
	}

	set canvasId(canvasid) {
		const canv = document.getElementById(canvasid);
		this.canvas = {
			dom: canv,
			ctx: canv.msGetInputContext("2d"),
			id: canv.id,
			shape: {
				y: canv.style.height,
				x: canv.style.width
			},
			pos: {
				x: canv.offsetLeft,
				y: canv.offsetTop
			}
		};
	}

	initTiles() {
		const game = this;
		return new Promise(function initTiles(res, rej) {
			for (let i = 0; i < game.tiles.length; i++) {
				const tilerow = game.tiles[i];
				for (let j = 0; j < tilerow.length; j ++) {
					tilerow[j] = new Tile(j, i);
				}
			}
		});
	}

	addPlayer(ind, color, name) {
		if(this.players && this.players.length) {
			this.players[1] = new Player();
		} else if(!this.players) {
			this.players = [
				new Player()
			];
		} else {
			throw Error("there are already 2 players");
		}
	}

	initGame(canvasid) {
		this.canvasId = canvasid;
		this.ant = new Ant((this.tileShape.w / 2), (this.tileShape.h/2), Ant.prototype.STATES["0"]);
	}

	render() {
		this.tiles.forEach(row => {row.forEach(tile => {tile.render(this);});});
		this.ant.render();
		this.players.forEach(player => player.render());
	}
}

export default Game;