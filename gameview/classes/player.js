class Player {
	constructor(clr, id) {
		this.id = id;
		this.color = clr;
	}

	set goal(pos) {
		this.goal = {
			x: pos.x,
			y: pos.y,
			0: pos.x,
			1: pos.y
		};
	}
}