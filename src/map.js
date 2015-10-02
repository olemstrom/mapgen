import * as Roomgen from "./roomgen.js";
class Map {
	rooms = [];
	constructor(width=200, height=200) {
		this.width = width;
		this.height = height;
	}
	addRoom(room) {
		console.log("Room added: ", room);
		this.rooms.push(room);
	}

	generateRooms(roomCount) {
		for(let generatedRooms = 0; generatedRooms < roomCount; generatedRooms++) {
			let room = Roomgen.room(50, 50);
			room.randomPosition(this.width, this.height);

			this.addRoom(room);
		}
	}
	draw() {
		let canvas = document.querySelector("canvas"),
			context = canvas.getContext("2d");

		canvas.width = this.width;
		canvas.height = this.height;

		context.clearRect(0, 0, this.width, this.height);

		this.rooms.forEach(function(room){
			context.fillRect(room.x, room.y, room.width, room.height);
		});


	}
}

export { Map };