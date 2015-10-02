class Room {
	connections = [];
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

	closestUnconnected(roomArray) {
		let unconnected = roomArray.filter( (room) => room.connections.length === 0 && room != this),
			closest,
			closestDistance = Infinity;

		unconnected.forEach(function(room){
			if(!closest) closest = room;
			else {
				let a = Math.abs(this.x - room.x),
					b = Math.abs(this.y - room.y),
					distance = Math.sqrt( Math.pow(a, 2) + Math.pow(b, 2) );

				if(closestDistance > distance) {
					closest = room;
					closestDistance = distance;
				}
			}
		}, this);

		return closest;
	}

	connect(room) {
		if(!this.connections.indexOf(room) !== -1 && room != this) {
			this.connections.push(room);
			room.connections.push(this);
		}
	}

	getCenter() {
		let x = Math.floor(this.width / 2) + this.x,
			y = Math.floor(this.height / 2) + this.y;

		return {
			x: x,
			y: y
		}
	}
}

export { Room };