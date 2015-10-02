import * as ui from "./ui.js";
import { Map } from "./map.js";

ui.onGenerate(function(roomCount){
	let map = new Map(300, 300);
	map.generateRooms(roomCount);
	map.draw();
});