import * as Roomgen from "./roomgen.js";
class Map {
	rooms = [];
	connections = [];

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

		this.addConnections();
	}

	addConnections() {
		let rooms = this.rooms;
		rooms.forEach(function(room){
			let closestUnconnected = room.closestUnconnected(rooms);
			if(closestUnconnected) room.connect(closestUnconnected);
		});

		console.log("Connected", this.rooms)
	}

	addConnection(room1, room2) {
		let connection = new Connection(room1, room2);
		connections.push(connection);
	}

	draw() {
		let canvas = document.querySelector("canvas"),
			context = canvas.getContext("2d");

		canvas.width = this.width;
		canvas.height = this.height;

		context.clearRect(0, 0, this.width, this.height);

		this.rooms.forEach(function(room){
			context.fillRect(room.x, room.y, room.width, room.height);
			room.connections.forEach(function(connection){
				let roomCoord = room.getCenter(),
					conCoord = connection.getCenter();

				context.beginPath();
				context.moveTo(roomCoord.x, roomCoord.y);
				context.lineTo(conCoord.x, conCoord.y);
				context.stroke();
			});
		});


	}
}

export { Map };