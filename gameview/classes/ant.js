import { Tile } from "./tile.js";

export class Ant extends Tile {
	constructor (x, y, hdg) {
		super(x, y);
		this.hdg = hdg;
	}


	move(sizex, sizey){
		switch (this.hdg) {
			case 0:
				this.pos.y--;
				break;
			case 1:
				this.pos.x++;
				break;
			case 2:
				this.pos.y++;
				break;
			case 3:
				this.pos.x--;
				break;
		}
		this.pos.x = (sizex + this.pos.x) % sizex;
		this.pos.y = (sizey + this.pos.y) % sizey;
	}

	turnRight(){
		this.hdg += 1;
		this.hdg = this.hdg%4;
		console.log(this.hdg);
	}

	turnLeft(){
		this.hdg -= 1;
		console.log(this.hdg);
		this.hdg = (this.hdg+4);
		console.log(this.hdg);
		this.hdg = this.hdg % 4;
		console.log(this.hdg);
	}

	renderFunc(game) {
		const antimage = (new Image()); antimage.src = `assets/ant${this.hdg}.png`;
		antimage.onload = _ => game.canvas
		.ctx.drawImage(
			antimage,
			game.settings.tilesize*this.pos.x+2,
			game.settings.tilesize*this.pos.y+2,
			game.settings.tilesize - 2,
			game.settings.tilesize - 2
		);
	}
}