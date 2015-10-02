(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

var _uiJs = require("./ui.js");

var ui = _interopRequireWildcard(_uiJs);

var _mapJs = require("./map.js");

ui.onGenerate(function (roomCount) {
	var map = new _mapJs.Map(300, 300);
	map.generateRooms(roomCount);
	map.draw();
});

},{"./map.js":2,"./ui.js":5}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj["default"] = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _roomgenJs = require("./roomgen.js");

var Roomgen = _interopRequireWildcard(_roomgenJs);

var Map = (function () {
	function Map() {
		var width = arguments.length <= 0 || arguments[0] === undefined ? 200 : arguments[0];
		var height = arguments.length <= 1 || arguments[1] === undefined ? 200 : arguments[1];

		_classCallCheck(this, Map);

		this.rooms = [];
		this.connections = [];

		this.width = width;
		this.height = height;
	}

	_createClass(Map, [{
		key: "addRoom",
		value: function addRoom(room) {
			console.log("Room added: ", room);
			this.rooms.push(room);
		}
	}, {
		key: "generateRooms",
		value: function generateRooms(roomCount) {
			for (var generatedRooms = 0; generatedRooms < roomCount; generatedRooms++) {
				var room = Roomgen.room(50, 50);
				room.randomPosition(this.width, this.height);
				this.addRoom(room);
			}

			this.addConnections();
		}
	}, {
		key: "addConnections",
		value: function addConnections() {
			var rooms = this.rooms;
			rooms.forEach(function (room) {
				var closestUnconnected = room.closestUnconnected(rooms);
				if (closestUnconnected) room.connect(closestUnconnected);
			});

			this.connectRoomsets(this.getRoomsets());
		}
	}, {
		key: "connectRoomsets",
		value: function connectRoomsets(roomsets) {
			roomsets.forEach(function (roomset, roomsetIndex) {
				if (roomsetIndex == roomsets.length - 1) return; // last roomset

				var roomIndex1 = Math.floor(Math.random() * roomset.length),
				    roomIndex2 = Math.floor(Math.random() * roomset.length),
				    room1 = roomset[roomIndex1],
				    room2 = roomsets[roomsetIndex + 1][roomIndex2];

				room1.connect(room2);
			});
		}
	}, {
		key: "getRoomsets",
		value: function getRoomsets() {
			var roomsets = [],
			    allFound = [];
			var rooms = this.rooms;
			while (rooms.length > 0) {
				findRooms(rooms[0]);
				// remove all found rooms from the total roomlist
				rooms = rooms.filter(function (room) {
					return allFound.indexOf(room) === -1;
				});
				roomsets.push(allFound);
				allFound = [];
			}

			function findRooms(room) {
				room.connections.forEach(function (connection) {
					if (allFound.indexOf(connection) === -1) {
						allFound.push(connection);
						findRooms(connection);
					}
				});
			}

			console.log("Roomset", roomsets);
			return roomsets;
		}
	}, {
		key: "draw",
		value: function draw() {
			var canvas = document.querySelector("canvas"),
			    context = canvas.getContext("2d");

			canvas.width = this.width;
			canvas.height = this.height;

			context.clearRect(0, 0, this.width, this.height);

			this.rooms.forEach(function (room) {
				context.fillRect(room.x, room.y, room.width, room.height);
				room.connections.forEach(function (connection) {
					var roomCoord = room.getCenter(),
					    conCoord = connection.getCenter();

					context.beginPath();
					context.moveTo(roomCoord.x, roomCoord.y);
					context.lineTo(conCoord.x, conCoord.y);
					context.stroke();
				});
			});
		}
	}]);

	return Map;
})();

exports.Map = Map;

},{"./roomgen.js":4}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Room = (function () {
	function Room(width, height) {
		var x = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
		var y = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];

		_classCallCheck(this, Room);

		this.connections = [];

		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}

	_createClass(Room, [{
		key: "position",
		value: function position(x, y) {
			this.x = x;
			this.y = y;
		}
	}, {
		key: "randomPosition",
		value: function randomPosition(xMax, yMax) {
			var x = Math.floor(Math.random() * xMax),
			    y = Math.floor(Math.random() * yMax);

			this.x = x;
			this.y = y;
		}
	}, {
		key: "closestUnconnected",
		value: function closestUnconnected(roomArray) {
			var _this = this;

			var unconnected = roomArray.filter(function (room) {
				return room.connections.length === 0 && room != _this;
			}),
			    closest = undefined,
			    closestDistance = Infinity;

			unconnected.forEach(function (room) {
				if (!closest) closest = room;else {
					var a = Math.abs(this.x - room.x),
					    b = Math.abs(this.y - room.y),
					    distance = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

					if (closestDistance > distance) {
						closest = room;
						closestDistance = distance;
					}
				}
			}, this);

			return closest;
		}
	}, {
		key: "connect",
		value: function connect(room) {
			if (!this.connections.indexOf(room) !== -1 && room != this) {
				this.connections.push(room);
				room.connections.push(this);
			}
		}
	}, {
		key: "getCenter",
		value: function getCenter() {
			var x = Math.floor(this.width / 2) + this.x,
			    y = Math.floor(this.height / 2) + this.y;

			return {
				x: x,
				y: y
			};
		}
	}]);

	return Room;
})();

exports.Room = Room;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _roomJs = require("./room.js");

function room(maxWidth, maxHeight) {
	var width = Math.max(Math.random() * maxWidth, maxWidth / 5),
	    height = Math.max(Math.random() * maxHeight, maxHeight / 5);

	return new _roomJs.Room(Math.floor(width), Math.floor(height));
}

exports.room = room;

},{"./room.js":3}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var generateFunctions = [];
function bind() {
	var button = document.querySelector(".gen");
	button.addEventListener("click", function () {
		var count = document.querySelector("[name=roomCount]").value;
		generateFunctions.forEach(function (callback) {
			return callback(count);
		});
	});
}

function onGenerate(callback) {
	generateFunctions.push(callback);
}

bind();

exports.bind = bind;
exports.onGenerate = onGenerate;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJFOi9kZXYvbWFwZ2VuL3NyYy9tYWluLmpzIiwiRTovZGV2L21hcGdlbi9zcmMvbWFwLmpzIiwiRTovZGV2L21hcGdlbi9zcmMvcm9vbS5qcyIsIkU6L2Rldi9tYXBnZW4vc3JjL3Jvb21nZW4uanMiLCJFOi9kZXYvbWFwZ2VuL3NyYy91aS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7b0JDQW9CLFNBQVM7O0lBQWpCLEVBQUU7O3FCQUNNLFVBQVU7O0FBRTlCLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBUyxTQUFTLEVBQUM7QUFDaEMsS0FBSSxHQUFHLEdBQUcsZUFBUSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDNUIsSUFBRyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM3QixJQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7Q0FDWCxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozt5QkNQc0IsY0FBYzs7SUFBM0IsT0FBTzs7SUFDYixHQUFHO0FBSUcsVUFKTixHQUFHLEdBSTJCO01BQXZCLEtBQUsseURBQUMsR0FBRztNQUFFLE1BQU0seURBQUMsR0FBRzs7d0JBSjVCLEdBQUc7O09BQ1IsS0FBSyxHQUFHLEVBQUU7T0FDVixXQUFXLEdBQUcsRUFBRTs7QUFHZixNQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQixNQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztFQUNyQjs7Y0FQSSxHQUFHOztTQVFELGlCQUFDLElBQUksRUFBRTtBQUNiLFVBQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2xDLE9BQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQ3RCOzs7U0FFWSx1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c291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0ICogYXMgdWkgZnJvbSBcIi4vdWkuanNcIjtcclxuaW1wb3J0IHsgTWFwIH0gZnJvbSBcIi4vbWFwLmpzXCI7XHJcblxyXG51aS5vbkdlbmVyYXRlKGZ1bmN0aW9uKHJvb21Db3VudCl7XHJcblx0bGV0IG1hcCA9IG5ldyBNYXAoMzAwLCAzMDApO1xyXG5cdG1hcC5nZW5lcmF0ZVJvb21zKHJvb21Db3VudCk7XHJcblx0bWFwLmRyYXcoKTtcclxufSk7IiwiaW1wb3J0ICogYXMgUm9vbWdlbiBmcm9tIFwiLi9yb29tZ2VuLmpzXCI7XHJcbmNsYXNzIE1hcCB7XHJcblx0cm9vbXMgPSBbXTtcclxuXHRjb25uZWN0aW9ucyA9IFtdO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcih3aWR0aD0yMDAsIGhlaWdodD0yMDApIHtcclxuXHRcdHRoaXMud2lkdGggPSB3aWR0aDtcclxuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cdH1cclxuXHRhZGRSb29tKHJvb20pIHtcclxuXHRcdGNvbnNvbGUubG9nKFwiUm9vbSBhZGRlZDogXCIsIHJvb20pO1xyXG5cdFx0dGhpcy5yb29tcy5wdXNoKHJvb20pO1xyXG5cdH1cclxuXHJcblx0Z2VuZXJhdGVSb29tcyhyb29tQ291bnQpIHtcclxuXHRcdGZvcihsZXQgZ2VuZXJhdGVkUm9vbXMgPSAwOyBnZW5lcmF0ZWRSb29tcyA8IHJvb21Db3VudDsgZ2VuZXJhdGVkUm9vbXMrKykge1xyXG5cdFx0XHRsZXQgcm9vbSA9IFJvb21nZW4ucm9vbSg1MCwgNTApO1xyXG5cdFx0XHRyb29tLnJhbmRvbVBvc2l0aW9uKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuXHRcdFx0dGhpcy5hZGRSb29tKHJvb20pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuYWRkQ29ubmVjdGlvbnMoKTtcclxuXHR9XHJcblxyXG5cdGFkZENvbm5lY3Rpb25zKCkge1xyXG5cdFx0bGV0IHJvb21zID0gdGhpcy5yb29tcztcclxuXHRcdHJvb21zLmZvckVhY2goZnVuY3Rpb24ocm9vbSl7XHJcblx0XHRcdGxldCBjbG9zZXN0VW5jb25uZWN0ZWQgPSByb29tLmNsb3Nlc3RVbmNvbm5lY3RlZChyb29tcyk7XHJcblx0XHRcdGlmKGNsb3Nlc3RVbmNvbm5lY3RlZCkgcm9vbS5jb25uZWN0KGNsb3Nlc3RVbmNvbm5lY3RlZCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLmNvbm5lY3RSb29tc2V0cyh0aGlzLmdldFJvb21zZXRzKCkpO1xyXG5cdH1cclxuXHJcblx0Y29ubmVjdFJvb21zZXRzKHJvb21zZXRzKSB7XHJcblx0XHRyb29tc2V0cy5mb3JFYWNoKGZ1bmN0aW9uKHJvb21zZXQsIHJvb21zZXRJbmRleCl7XHJcblx0XHRcdGlmKHJvb21zZXRJbmRleCA9PSByb29tc2V0cy5sZW5ndGggLSAxKSByZXR1cm47IC8vIGxhc3Qgcm9vbXNldFxyXG5cclxuXHRcdFx0bGV0IHJvb21JbmRleDEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqcm9vbXNldC5sZW5ndGgpLFxyXG5cdFx0XHRcdHJvb21JbmRleDIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqcm9vbXNldC5sZW5ndGgpLFxyXG5cdFx0XHRcdHJvb20xID0gcm9vbXNldFtyb29tSW5kZXgxXSxcclxuXHRcdFx0XHRyb29tMiA9IHJvb21zZXRzW3Jvb21zZXRJbmRleCArIDFdW3Jvb21JbmRleDJdO1xyXG5cclxuXHRcdFx0cm9vbTEuY29ubmVjdChyb29tMik7XHJcblx0XHR9KTtcclxuXHR9XHJcblxyXG5cdGdldFJvb21zZXRzKCkge1xyXG5cdFx0bGV0IHJvb21zZXRzID0gW10sXHJcblx0XHRcdGFsbEZvdW5kID0gW107XHJcblx0XHRsZXQgcm9vbXMgPSB0aGlzLnJvb21zO1xyXG5cdFx0d2hpbGUocm9vbXMubGVuZ3RoID4gMCkge1xyXG5cdFx0XHRmaW5kUm9vbXMocm9vbXNbMF0pO1xyXG5cdFx0XHQvLyByZW1vdmUgYWxsIGZvdW5kIHJvb21zIGZyb20gdGhlIHRvdGFsIHJvb21saXN0XHJcblx0XHRcdHJvb21zID0gcm9vbXMuZmlsdGVyKChyb29tKSA9PiBhbGxGb3VuZC5pbmRleE9mKHJvb20pID09PSAtMSk7XHJcblx0XHRcdHJvb21zZXRzLnB1c2goYWxsRm91bmQpO1xyXG5cdFx0XHRhbGxGb3VuZCA9IFtdO1xyXG5cdFx0fVxyXG5cdFx0XHJcblxyXG5cdFx0ZnVuY3Rpb24gZmluZFJvb21zKHJvb20pIHtcclxuXHRcdFx0cm9vbS5jb25uZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGNvbm5lY3Rpb24pe1xyXG5cdFx0XHRcdGlmKGFsbEZvdW5kLmluZGV4T2YoY29ubmVjdGlvbikgPT09IC0xKSB7XHJcblx0XHRcdFx0XHRhbGxGb3VuZC5wdXNoKGNvbm5lY3Rpb24pO1xyXG5cdFx0XHRcdFx0ZmluZFJvb21zKGNvbm5lY3Rpb24pO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblxyXG5cdFx0Y29uc29sZS5sb2coXCJSb29tc2V0XCIsIHJvb21zZXRzKTtcclxuXHRcdHJldHVybiByb29tc2V0cztcclxuXHR9XHJcblxyXG5cdGRyYXcoKSB7XHJcblx0XHRsZXQgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhc1wiKSxcclxuXHRcdFx0Y29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG5cdFx0Y2FudmFzLndpZHRoID0gdGhpcy53aWR0aDtcclxuXHRcdGNhbnZhcy5oZWlnaHQgPSB0aGlzLmhlaWdodDtcclxuXHJcblx0XHRjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcblxyXG5cdFx0dGhpcy5yb29tcy5mb3JFYWNoKGZ1bmN0aW9uKHJvb20pe1xyXG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0KHJvb20ueCwgcm9vbS55LCByb29tLndpZHRoLCByb29tLmhlaWdodCk7XHJcblx0XHRcdHJvb20uY29ubmVjdGlvbnMuZm9yRWFjaChmdW5jdGlvbihjb25uZWN0aW9uKXtcclxuXHRcdFx0XHRsZXQgcm9vbUNvb3JkID0gcm9vbS5nZXRDZW50ZXIoKSxcclxuXHRcdFx0XHRcdGNvbkNvb3JkID0gY29ubmVjdGlvbi5nZXRDZW50ZXIoKTtcclxuXHJcblx0XHRcdFx0Y29udGV4dC5iZWdpblBhdGgoKTtcclxuXHRcdFx0XHRjb250ZXh0Lm1vdmVUbyhyb29tQ29vcmQueCwgcm9vbUNvb3JkLnkpO1xyXG5cdFx0XHRcdGNvbnRleHQubGluZVRvKGNvbkNvb3JkLngsIGNvbkNvb3JkLnkpO1xyXG5cdFx0XHRcdGNvbnRleHQuc3Ryb2tlKCk7XHJcblx0XHRcdH0pO1xyXG5cdFx0fSk7XHJcblxyXG5cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCB7IE1hcCB9OyIsImNsYXNzIFJvb20ge1xyXG5cdGNvbm5lY3Rpb25zID0gW107XHJcblx0Y29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgeCA9IDAsIHkgPSAwKSB7XHJcblx0XHR0aGlzLnggPSB4O1xyXG5cdFx0dGhpcy55ID0geTtcclxuXHRcdHRoaXMud2lkdGggPSB3aWR0aDtcclxuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cdH1cclxuXHJcblx0cG9zaXRpb24oeCwgeSkge1xyXG5cdFx0dGhpcy54ID0geDtcclxuXHRcdHRoaXMueSA9IHk7XHJcblx0fVxyXG5cclxuXHRyYW5kb21Qb3NpdGlvbih4TWF4LCB5TWF4KSB7XHJcblx0XHRsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp4TWF4KSxcclxuXHRcdFx0eSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp5TWF4KTtcclxuXHJcblx0XHR0aGlzLnggPSB4O1xyXG5cdFx0dGhpcy55ID0geTtcclxuXHR9XHJcblxyXG5cdGNsb3Nlc3RVbmNvbm5lY3RlZChyb29tQXJyYXkpIHtcclxuXHRcdGxldCB1bmNvbm5lY3RlZCA9IHJvb21BcnJheS5maWx0ZXIoIChyb29tKSA9PiByb29tLmNvbm5lY3Rpb25zLmxlbmd0aCA9PT0gMCAmJiByb29tICE9IHRoaXMpLFxyXG5cdFx0XHRjbG9zZXN0LFxyXG5cdFx0XHRjbG9zZXN0RGlzdGFuY2UgPSBJbmZpbml0eTtcclxuXHJcblx0XHR1bmNvbm5lY3RlZC5mb3JFYWNoKGZ1bmN0aW9uKHJvb20pe1xyXG5cdFx0XHRpZighY2xvc2VzdCkgY2xvc2VzdCA9IHJvb207XHJcblx0XHRcdGVsc2Uge1xyXG5cdFx0XHRcdGxldCBhID0gTWF0aC5hYnModGhpcy54IC0gcm9vbS54KSxcclxuXHRcdFx0XHRcdGIgPSBNYXRoLmFicyh0aGlzLnkgLSByb29tLnkpLFxyXG5cdFx0XHRcdFx0ZGlzdGFuY2UgPSBNYXRoLnNxcnQoIE1hdGgucG93KGEsIDIpICsgTWF0aC5wb3coYiwgMikgKTtcclxuXHJcblx0XHRcdFx0aWYoY2xvc2VzdERpc3RhbmNlID4gZGlzdGFuY2UpIHtcclxuXHRcdFx0XHRcdGNsb3Nlc3QgPSByb29tO1xyXG5cdFx0XHRcdFx0Y2xvc2VzdERpc3RhbmNlID0gZGlzdGFuY2U7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblx0XHR9LCB0aGlzKTtcclxuXHJcblx0XHRyZXR1cm4gY2xvc2VzdDtcclxuXHR9XHJcblxyXG5cdGNvbm5lY3Qocm9vbSkge1xyXG5cdFx0aWYoIXRoaXMuY29ubmVjdGlvbnMuaW5kZXhPZihyb29tKSAhPT0gLTEgJiYgcm9vbSAhPSB0aGlzKSB7XHJcblx0XHRcdHRoaXMuY29ubmVjdGlvbnMucHVzaChyb29tKTtcclxuXHRcdFx0cm9vbS5jb25uZWN0aW9ucy5wdXNoKHRoaXMpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0Z2V0Q2VudGVyKCkge1xyXG5cdFx0bGV0IHggPSBNYXRoLmZsb29yKHRoaXMud2lkdGggLyAyKSArIHRoaXMueCxcclxuXHRcdFx0eSA9IE1hdGguZmxvb3IodGhpcy5oZWlnaHQgLyAyKSArIHRoaXMueTtcclxuXHJcblx0XHRyZXR1cm4ge1xyXG5cdFx0XHR4OiB4LFxyXG5cdFx0XHR5OiB5XHJcblx0XHR9XHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgeyBSb29tIH07IiwiaW1wb3J0IHsgUm9vbSB9IGZyb20gXCIuL3Jvb20uanNcIjtcclxuZnVuY3Rpb24gcm9vbShtYXhXaWR0aCwgbWF4SGVpZ2h0KSB7XHJcblx0bGV0IHdpZHRoICA9IE1hdGgubWF4KE1hdGgucmFuZG9tKCkqbWF4V2lkdGgsIG1heFdpZHRoLzUpLFxyXG5cdFx0aGVpZ2h0ID0gTWF0aC5tYXgoTWF0aC5yYW5kb20oKSptYXhIZWlnaHQsIG1heEhlaWdodC81KTtcclxuXHJcblx0cmV0dXJuIG5ldyBSb29tKE1hdGguZmxvb3Iod2lkdGgpLCBNYXRoLmZsb29yKGhlaWdodCkpO1xyXG59XHJcblxyXG5leHBvcnQgeyByb29tIH07IiwibGV0IGdlbmVyYXRlRnVuY3Rpb25zID0gW107XHJcbmZ1bmN0aW9uIGJpbmQoKSB7XHJcblx0bGV0IGJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2VuXCIpO1xyXG5cdGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oKXtcclxuXHRcdGxldCBjb3VudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJbbmFtZT1yb29tQ291bnRdXCIpLnZhbHVlO1xyXG5cdFx0Z2VuZXJhdGVGdW5jdGlvbnMuZm9yRWFjaCgoY2FsbGJhY2spID0+IGNhbGxiYWNrKGNvdW50KSk7XHJcblx0fSk7XHJcblxyXG59XHJcblxyXG5mdW5jdGlvbiBvbkdlbmVyYXRlKGNhbGxiYWNrKSB7XHJcblx0Z2VuZXJhdGVGdW5jdGlvbnMucHVzaChjYWxsYmFjayk7XHJcbn1cclxuXHJcbmJpbmQoKTtcclxuXHJcbmV4cG9ydCB7IGJpbmQsIG9uR2VuZXJhdGUgfTsiXX0=
