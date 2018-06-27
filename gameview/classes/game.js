import { Ant } from "./ant.js";
import { Tile } from "./tile.js";
import { Player } from "./player.js";

export class Game {
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

		this.turn = 0;
	}

	get canvasId() {
		return this.canvas.id;
	}

	set canvasId(canvasid) {
		const canv = document.getElementById(canvasid);
		this.canvas = {
			dom: canv,
			ctx: canv.getContext("2d"),
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

	turnAnt(){	
		const nextTile = this.tiles[this.ant.y][this.ant.x];
				
		if (nextTile.state == 1) {
			this.ant.turnRight();
		} else if (nextTile.state == 3) {
			this.ant.turnLeft();
		}
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
			res(game);
		});
	}

	addPlayer(color) {
		if(this.players && this.players.length === 1) {
			this.players[1] = new Player(color, 1);
		} else if(!this.players) {
			this.players = [
				new Player(color, 0)
			];
		} else {
			throw Error("there are already 2 players");
		}
	}

	initGame(canvasid) {
		this.canvasId = canvasid;
		this.ant = new Ant((this.tileShape.w / 2), (this.tileShape.h/2), 0);
	}

	render() {
		this.tiles.forEach(row => {row.forEach(tile => {tile.render(this);});});
		this.ant.render();
		this.players.forEach(player => player.render());
	}

	getTileClicked(ev) {
		//do some maths to get which tile was clicked;
		let x = 0;
		let y = 0;
		x -= this.canvas.pos.x;
		y -= this.canvas.pos.y;
	
		const row = Math.round(y/this.shape.h - 0.5);
		const column = Math.round(x/this.shape.w - 0.5);

		return this.tiles[row][column];
	}

	playTurn() {

		// do some magic to get player to click the tiles and then 
		const clickedTile = this.getTileClicked(ev);
		if (this.turn == 1) {
			clickedTile.state = 1;
		} else if (this.turn == 2) {
			clickedTile.state = 3;
		}

		if (this.turn == 2){
			this.ant.move();
			this.turnAnt();
		}

		this.turn = (this.turn+1)%2;
	}
}