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

			console.log("Connected", this.rooms);
		}
	}, {
		key: "addConnection",
		value: function addConnection(room1, room2) {
			var connection = new Connection(room1, room2);
			connections.push(connection);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJFOi9kZXYvbWFwZ2VuL3NyYy9tYWluLmpzIiwiRTovZGV2L21hcGdlbi9zcmMvbWFwLmpzIiwiRTovZGV2L21hcGdlbi9zcmMvcm9vbS5qcyIsIkU6L2Rldi9tYXBnZW4vc3JjL3Jvb21nZW4uanMiLCJFOi9kZXYvbWFwZ2VuL3NyYy91aS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7b0JDQW9CLFNBQVM7O0lBQWpCLEVBQUU7O3FCQUNNLFVBQVU7O0FBRTlCLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBUyxTQUFTLEVBQUM7QUFDaEMsS0FBSSxHQUFHLEdBQUcsZUFBUSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDNUIsSUFBRyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM3QixJQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7Q0FDWCxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozt5QkNQc0IsY0FBYzs7SUFBM0IsT0FBTzs7SUFDYixHQUFHO0FBSUcsVUFKTixHQUFHLEdBSTJCO01BQXZCLEtBQUsseURBQUMsR0FBRztNQUFFLE1BQU0seURBQUMsR0FBRzs7d0JBSjVCLEdBQUc7O09BQ1IsS0FBSyxHQUFHLEVBQUU7T0FDVixXQUFXLEdBQUcsRUFBRTs7QUFHZixNQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQixNQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztFQUNyQjs7Y0FQSSxHQUFHOztTQVFELGlCQUFDLElBQUksRUFBRTtBQUNiLFVBQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2xDLE9BQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQ3RCOzs7U0FFWSx1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SyxHQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDLFFBQVEsRUFBRSxRQUFRLEdBQUMsQ0FBQyxDQUFDO0tBQ3hELE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxTQUFTLEVBQUUsU0FBUyxHQUFDLENBQUMsQ0FBQyxDQUFDOztBQUV6RCxRQUFPLGlCQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0NBQ3ZEOztRQUVRLElBQUksR0FBSixJQUFJOzs7Ozs7OztBQ1JiLElBQUksaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0FBQzNCLFNBQVMsSUFBSSxHQUFHO0FBQ2YsS0FBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM1QyxPQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVU7QUFDMUMsTUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUM3RCxtQkFBaUIsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFRO1VBQUssUUFBUSxDQUFDLEtBQUssQ0FBQztHQUFBLENBQUMsQ0FBQztFQUN6RCxDQUFDLENBQUM7Q0FFSDs7QUFFRCxTQUFTLFVBQVUsQ0FBQyxRQUFRLEVBQUU7QUFDN0Isa0JBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0NBQ2pDOztBQUVELElBQUksRUFBRSxDQUFDOztRQUVFLElBQUksR0FBSixJQUFJO1FBQUUsVUFBVSxHQUFWLFVBQVUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0ICogYXMgdWkgZnJvbSBcIi4vdWkuanNcIjtcclxuaW1wb3J0IHsgTWFwIH0gZnJvbSBcIi4vbWFwLmpzXCI7XHJcblxyXG51aS5vbkdlbmVyYXRlKGZ1bmN0aW9uKHJvb21Db3VudCl7XHJcblx0bGV0IG1hcCA9IG5ldyBNYXAoMzAwLCAzMDApO1xyXG5cdG1hcC5nZW5lcmF0ZVJvb21zKHJvb21Db3VudCk7XHJcblx0bWFwLmRyYXcoKTtcclxufSk7IiwiaW1wb3J0ICogYXMgUm9vbWdlbiBmcm9tIFwiLi9yb29tZ2VuLmpzXCI7XHJcbmNsYXNzIE1hcCB7XHJcblx0cm9vbXMgPSBbXTtcclxuXHRjb25uZWN0aW9ucyA9IFtdO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcih3aWR0aD0yMDAsIGhlaWdodD0yMDApIHtcclxuXHRcdHRoaXMud2lkdGggPSB3aWR0aDtcclxuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cdH1cclxuXHRhZGRSb29tKHJvb20pIHtcclxuXHRcdGNvbnNvbGUubG9nKFwiUm9vbSBhZGRlZDogXCIsIHJvb20pO1xyXG5cdFx0dGhpcy5yb29tcy5wdXNoKHJvb20pO1xyXG5cdH1cclxuXHJcblx0Z2VuZXJhdGVSb29tcyhyb29tQ291bnQpIHtcclxuXHRcdGZvcihsZXQgZ2VuZXJhdGVkUm9vbXMgPSAwOyBnZW5lcmF0ZWRSb29tcyA8IHJvb21Db3VudDsgZ2VuZXJhdGVkUm9vbXMrKykge1xyXG5cdFx0XHRsZXQgcm9vbSA9IFJvb21nZW4ucm9vbSg1MCwgNTApO1xyXG5cdFx0XHRyb29tLnJhbmRvbVBvc2l0aW9uKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuXHRcdFx0dGhpcy5hZGRSb29tKHJvb20pO1xyXG5cdFx0fVxyXG5cclxuXHRcdHRoaXMuYWRkQ29ubmVjdGlvbnMoKTtcclxuXHR9XHJcblxyXG5cdGFkZENvbm5lY3Rpb25zKCkge1xyXG5cdFx0bGV0IHJvb21zID0gdGhpcy5yb29tcztcclxuXHRcdHJvb21zLmZvckVhY2goZnVuY3Rpb24ocm9vbSl7XHJcblx0XHRcdGxldCBjbG9zZXN0VW5jb25uZWN0ZWQgPSByb29tLmNsb3Nlc3RVbmNvbm5lY3RlZChyb29tcyk7XHJcblx0XHRcdGlmKGNsb3Nlc3RVbmNvbm5lY3RlZCkgcm9vbS5jb25uZWN0KGNsb3Nlc3RVbmNvbm5lY3RlZCk7XHJcblx0XHR9KTtcclxuXHJcblx0XHRjb25zb2xlLmxvZyhcIkNvbm5lY3RlZFwiLCB0aGlzLnJvb21zKVxyXG5cdH1cclxuXHJcblx0YWRkQ29ubmVjdGlvbihyb29tMSwgcm9vbTIpIHtcclxuXHRcdGxldCBjb25uZWN0aW9uID0gbmV3IENvbm5lY3Rpb24ocm9vbTEsIHJvb20yKTtcclxuXHRcdGNvbm5lY3Rpb25zLnB1c2goY29ubmVjdGlvbik7XHJcblx0fVxyXG5cclxuXHRkcmF3KCkge1xyXG5cdFx0bGV0IGNhbnZhcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJjYW52YXNcIiksXHJcblx0XHRcdGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpO1xyXG5cclxuXHRcdGNhbnZhcy53aWR0aCA9IHRoaXMud2lkdGg7XHJcblx0XHRjYW52YXMuaGVpZ2h0ID0gdGhpcy5oZWlnaHQ7XHJcblxyXG5cdFx0Y29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xyXG5cclxuXHRcdHRoaXMucm9vbXMuZm9yRWFjaChmdW5jdGlvbihyb29tKXtcclxuXHRcdFx0Y29udGV4dC5maWxsUmVjdChyb29tLngsIHJvb20ueSwgcm9vbS53aWR0aCwgcm9vbS5oZWlnaHQpO1xyXG5cdFx0XHRyb29tLmNvbm5lY3Rpb25zLmZvckVhY2goZnVuY3Rpb24oY29ubmVjdGlvbil7XHJcblx0XHRcdFx0bGV0IHJvb21Db29yZCA9IHJvb20uZ2V0Q2VudGVyKCksXHJcblx0XHRcdFx0XHRjb25Db29yZCA9IGNvbm5lY3Rpb24uZ2V0Q2VudGVyKCk7XHJcblxyXG5cdFx0XHRcdGNvbnRleHQuYmVnaW5QYXRoKCk7XHJcblx0XHRcdFx0Y29udGV4dC5tb3ZlVG8ocm9vbUNvb3JkLngsIHJvb21Db29yZC55KTtcclxuXHRcdFx0XHRjb250ZXh0LmxpbmVUbyhjb25Db29yZC54LCBjb25Db29yZC55KTtcclxuXHRcdFx0XHRjb250ZXh0LnN0cm9rZSgpO1xyXG5cdFx0XHR9KTtcclxuXHRcdH0pO1xyXG5cclxuXHJcblx0fVxyXG59XHJcblxyXG5leHBvcnQgeyBNYXAgfTsiLCJjbGFzcyBSb29tIHtcclxuXHRjb25uZWN0aW9ucyA9IFtdO1xyXG5cdGNvbnN0cnVjdG9yKHdpZHRoLCBoZWlnaHQsIHggPSAwLCB5ID0gMCkge1xyXG5cdFx0dGhpcy54ID0geDtcclxuXHRcdHRoaXMueSA9IHk7XHJcblx0XHR0aGlzLndpZHRoID0gd2lkdGg7XHJcblx0XHR0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuXHR9XHJcblxyXG5cdHBvc2l0aW9uKHgsIHkpIHtcclxuXHRcdHRoaXMueCA9IHg7XHJcblx0XHR0aGlzLnkgPSB5O1xyXG5cdH1cclxuXHJcblx0cmFuZG9tUG9zaXRpb24oeE1heCwgeU1heCkge1xyXG5cdFx0bGV0IHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqeE1heCksXHJcblx0XHRcdHkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqeU1heCk7XHJcblxyXG5cdFx0dGhpcy54ID0geDtcclxuXHRcdHRoaXMueSA9IHk7XHJcblx0fVxyXG5cclxuXHRjbG9zZXN0VW5jb25uZWN0ZWQocm9vbUFycmF5KSB7XHJcblx0XHRsZXQgdW5jb25uZWN0ZWQgPSByb29tQXJyYXkuZmlsdGVyKCAocm9vbSkgPT4gcm9vbS5jb25uZWN0aW9ucy5sZW5ndGggPT09IDAgJiYgcm9vbSAhPSB0aGlzKSxcclxuXHRcdFx0Y2xvc2VzdCxcclxuXHRcdFx0Y2xvc2VzdERpc3RhbmNlID0gSW5maW5pdHk7XHJcblxyXG5cdFx0dW5jb25uZWN0ZWQuZm9yRWFjaChmdW5jdGlvbihyb29tKXtcclxuXHRcdFx0aWYoIWNsb3Nlc3QpIGNsb3Nlc3QgPSByb29tO1xyXG5cdFx0XHRlbHNlIHtcclxuXHRcdFx0XHRsZXQgYSA9IE1hdGguYWJzKHRoaXMueCAtIHJvb20ueCksXHJcblx0XHRcdFx0XHRiID0gTWF0aC5hYnModGhpcy55IC0gcm9vbS55KSxcclxuXHRcdFx0XHRcdGRpc3RhbmNlID0gTWF0aC5zcXJ0KCBNYXRoLnBvdyhhLCAyKSArIE1hdGgucG93KGIsIDIpICk7XHJcblxyXG5cdFx0XHRcdGlmKGNsb3Nlc3REaXN0YW5jZSA+IGRpc3RhbmNlKSB7XHJcblx0XHRcdFx0XHRjbG9zZXN0ID0gcm9vbTtcclxuXHRcdFx0XHRcdGNsb3Nlc3REaXN0YW5jZSA9IGRpc3RhbmNlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cdFx0fSwgdGhpcyk7XHJcblxyXG5cdFx0cmV0dXJuIGNsb3Nlc3Q7XHJcblx0fVxyXG5cclxuXHRjb25uZWN0KHJvb20pIHtcclxuXHRcdGlmKCF0aGlzLmNvbm5lY3Rpb25zLmluZGV4T2Yocm9vbSkgIT09IC0xICYmIHJvb20gIT0gdGhpcykge1xyXG5cdFx0XHR0aGlzLmNvbm5lY3Rpb25zLnB1c2gocm9vbSk7XHJcblx0XHRcdHJvb20uY29ubmVjdGlvbnMucHVzaCh0aGlzKTtcclxuXHRcdH1cclxuXHR9XHJcblxyXG5cdGdldENlbnRlcigpIHtcclxuXHRcdGxldCB4ID0gTWF0aC5mbG9vcih0aGlzLndpZHRoIC8gMikgKyB0aGlzLngsXHJcblx0XHRcdHkgPSBNYXRoLmZsb29yKHRoaXMuaGVpZ2h0IC8gMikgKyB0aGlzLnk7XHJcblxyXG5cdFx0cmV0dXJuIHtcclxuXHRcdFx0eDogeCxcclxuXHRcdFx0eTogeVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IHsgUm9vbSB9OyIsImltcG9ydCB7IFJvb20gfSBmcm9tIFwiLi9yb29tLmpzXCI7XHJcbmZ1bmN0aW9uIHJvb20obWF4V2lkdGgsIG1heEhlaWdodCkge1xyXG5cdGxldCB3aWR0aCAgPSBNYXRoLm1heChNYXRoLnJhbmRvbSgpKm1heFdpZHRoLCBtYXhXaWR0aC81KSxcclxuXHRcdGhlaWdodCA9IE1hdGgubWF4KE1hdGgucmFuZG9tKCkqbWF4SGVpZ2h0LCBtYXhIZWlnaHQvNSk7XHJcblxyXG5cdHJldHVybiBuZXcgUm9vbShNYXRoLmZsb29yKHdpZHRoKSwgTWF0aC5mbG9vcihoZWlnaHQpKTtcclxufVxyXG5cclxuZXhwb3J0IHsgcm9vbSB9OyIsImxldCBnZW5lcmF0ZUZ1bmN0aW9ucyA9IFtdO1xyXG5mdW5jdGlvbiBiaW5kKCkge1xyXG5cdGxldCBidXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdlblwiKTtcclxuXHRidXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKCl7XHJcblx0XHRsZXQgY291bnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW25hbWU9cm9vbUNvdW50XVwiKS52YWx1ZTtcclxuXHRcdGdlbmVyYXRlRnVuY3Rpb25zLmZvckVhY2goKGNhbGxiYWNrKSA9PiBjYWxsYmFjayhjb3VudCkpO1xyXG5cdH0pO1xyXG5cclxufVxyXG5cclxuZnVuY3Rpb24gb25HZW5lcmF0ZShjYWxsYmFjaykge1xyXG5cdGdlbmVyYXRlRnVuY3Rpb25zLnB1c2goY2FsbGJhY2spO1xyXG59XHJcblxyXG5iaW5kKCk7XHJcblxyXG5leHBvcnQgeyBiaW5kLCBvbkdlbmVyYXRlIH07Il19
