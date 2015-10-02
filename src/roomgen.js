import { Room } from "./room.js";
function room(maxWidth, maxHeight) {
	let width  = Math.max(Math.random()*maxWidth, maxWidth/5),
		height = Math.max(Math.random()*maxHeight, maxHeight/5);

	return new Room(Math.floor(width), Math.floor(height));
}

export { room };