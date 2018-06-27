function getOffset(el) {
	el = el.getBoundingClientRect();
	return {
		left: el.left + window.scrollX,
		top: el.top + window.scrollY
	};
}


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

		this.playerIndicators = new Array(2);
	}

	//#region gets and sets

	set p1panel(elem) {
		this.playerIndicators[0] = elem;
	}

	get p1panel() {
		return this.playerIndicators[0];
	}
	
	set p2panel(elem) {
		this.playerIndicators[1] = elem;
	}
	
	get p2panel() {
		return this.playerIndicators[1];
	}
	
	set canvasId(canvasid) {
		this.canv = document.getElementById(canvasid);
	}

	get canvas() {
		return {
			dom: this.canv,
			ctx: this.canv.getContext("2d"),
			id: this.canv.id,
			shape: {
				y: this.canv.style.height,
				x: this.canv.style.width
			},
			pos: {
				x: getOffset(this.canv).left,
				y: getOffset(this.canv).top
			}
		};
	}
	
	//#endregion

	moveAnt(){	
		const tile = this.tiles[this.ant.pos.y][this.ant.pos.x];
		
		if (tile.state === new Tile().STATES["1"]) {
			this.ant.turnLeft();
		} else if (tile.state === new Tile().STATES["3"]) {
			this.ant.turnRight();
		}

		this.ant.move(this.tileShape.w, this.tileShape.h);
	}

	//#region init methods
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
		this.canvas.dom.width = this.shape.w;
		this.canvas.dom.height = this.shape.h;
	}

	//#endregion

	render() {
		this.canvas.ctx.fillStyle = "#10FF10";
		this.canvas.ctx.fillRect(0, 0, 1200, 1200);
		this.tiles.forEach(row => {row.forEach(tile => {tile.render(this);});});
		this.players.forEach(player => player.render(this));
		this.ant.render(this);
	}

	getTileClicked(ev) {
		//do some maths to get which tile was clicked;
		console.log(ev);
		const canvasX = ev.pageX - this.canvas.pos.x;
		const canvasY = ev.pageY - this.canvas.pos.y;

		const tilesizenocanvas = this.settings.tilesize/2;

		// TODO: ACTUALLY CALCULATE THE SCALE!!!!!!

		const x = Math.floor(canvasX/tilesizenocanvas);
		const y = Math.floor(canvasY / tilesizenocanvas);

		return {x, y};
	}

	startTurns() {
		this.playerIndicators[this.turn].classList.add("selected");
		this.playerIndicators[(this.turn + 1)%2].classList.remove("selected");
		
		//check if a player won
		// TODO: some magic!
		
		// show the current turn's player
		
		// do some magic to get player to click the tiles
		
		// set click listener on canvas to change a tile
		this.canvas.dom.onclick = ev => {
			
			this.moveAnt();
			while (this.tiles[this.ant.pos.y][this.ant.pos.x].state !== new Tile().STATES["0"]) {
				this.moveAnt();
			}

			if (Object.is(this.ant.pos, this.players[0].pos)) {
				this.canvas.dom.removeEventListener("click");
				//do things
			} else if (Object.is(this.ant.pos, this.players[0].pos)) {
				this.canvas.dom.removeEventListener("click");
				//do things
			}
			const clickedTileCoords = this.getTileClicked(ev);
			const clickedTile = this.tiles[clickedTileCoords.y][clickedTileCoords.x];
			
			if (!(Object.is(clickedTileCoords, this.ant.pos))) {
				if (this.turn === 0) {
					clickedTile.state = new Tile().STATES["1"];
					console.log(clickedTile);
				} else if (this.turn === 1) {
					clickedTile.state = new Tile().STATES["3"];
					console.log(clickedTile);
				}
				this.render();
				this.turn = (this.turn + 1) % 2;
				this.playerIndicators[this.turn].classList.add("selected");
				this.playerIndicators[(this.turn + 1)%2].classList.remove("selected");
			}
		};
	}
}