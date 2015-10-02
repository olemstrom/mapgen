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

		this.connectRoomsets(this.getRoomsets());
	}

	connectRoomsets(roomsets) {
		roomsets.forEach(function(roomset, roomsetIndex){
			if(roomsetIndex == roomsets.length - 1) return; // last roomset

			let roomIndex1 = Math.floor(Math.random()*roomset.length),
				roomIndex2 = Math.floor(Math.random()*roomset.length),
				room1 = roomset[roomIndex1],
				room2 = roomsets[roomsetIndex + 1][roomIndex2];

			room1.connect(room2);
		});
	}

	getRoomsets() {
		let roomsets = [],
			allFound = [];
		let rooms = this.rooms;
		while(rooms.length > 0) {
			findRooms(rooms[0]);
			// remove all found rooms from the total roomlist
			rooms = rooms.filter((room) => allFound.indexOf(room) === -1);
			roomsets.push(allFound);
			allFound = [];
		}
		

		function findRooms(room) {
			room.connections.forEach(function(connection){
				if(allFound.indexOf(connection) === -1) {
					allFound.push(connection);
					findRooms(connection);
				}
			});
		}

		console.log("Roomset", roomsets);
		return roomsets;
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