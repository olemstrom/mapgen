class Room {
	constructor(width, height, x = 0, y = 0) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	position(x, y) {
		this.x = x;
		this.y = y;
	}

	randomPosition(xMax, yMax) {
		let x = Math.floor(Math.random()*xMax),
			y = Math.floor(Math.random()*yMax);

		this.x = x;
		this.y = y;
	}
}

export { Room };