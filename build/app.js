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
				room.position(generatedRooms * 50, generatedRooms * 50);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJFOi9kZXYvbWFwZ2VuL3NyYy9tYWluLmpzIiwiRTovZGV2L21hcGdlbi9zcmMvbWFwLmpzIiwiRTovZGV2L21hcGdlbi9zcmMvcm9vbS5qcyIsIkU6L2Rldi9tYXBnZW4vc3JjL3Jvb21nZW4uanMiLCJFOi9kZXYvbWFwZ2VuL3NyYy91aS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7b0JDQW9CLFNBQVM7O0lBQWpCLEVBQUU7O3FCQUNNLFVBQVU7O0FBRTlCLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBUyxTQUFTLEVBQUM7QUFDaEMsS0FBSSxHQUFHLEdBQUcsZUFBUSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDNUIsSUFBRyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM3QixJQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7Q0FDWCxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozt5QkNQc0IsY0FBYzs7SUFBM0IsT0FBTzs7SUFDYixHQUFHO0FBSUcsVUFKTixHQUFHLEdBSTJCO01BQXZCLEtBQUsseURBQUMsR0FBRztNQUFFLE1BQU0seURBQUMsR0FBRzs7d0JBSjVCLEdBQUc7O09BQ1IsS0FBSyxHQUFHLEVBQUU7T0FDVixXQUFXLEdBQUcsRUFBRTs7QUFHZixNQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQixNQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztFQUNyQjs7Y0FQSSxHQUFHOztTQVFELGlCQUFDLElBQUksRUFBRTtBQUNiLFVBQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2xDLE9BQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQ3RCOzs7U0FFWSx1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SyxHQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFDLFFBQVEsRUFBRSxRQUFRLEdBQUMsQ0FBQyxDQUFDO0tBQ3hELE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBQyxTQUFTLEVBQUUsU0FBUyxHQUFDLENBQUMsQ0FBQyxDQUFDOztBQUV6RCxRQUFPLGlCQUFTLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0NBQ3ZEOztRQUVRLElBQUksR0FBSixJQUFJOzs7Ozs7OztBQ1JiLElBQUksaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0FBQzNCLFNBQVMsSUFBSSxHQUFHO0FBQ2YsS0FBSSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUM1QyxPQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVU7QUFDMUMsTUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLEtBQUssQ0FBQztBQUM3RCxtQkFBaUIsQ0FBQyxPQUFPLENBQUMsVUFBQyxRQUFRO1VBQUssUUFBUSxDQUFDLEtBQUssQ0FBQztHQUFBLENBQUMsQ0FBQztFQUN6RCxDQUFDLENBQUM7Q0FFSDs7QUFFRCxTQUFTLFVBQVUsQ0FBQyxRQUFRLEVBQUU7QUFDN0Isa0JBQWlCLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0NBQ2pDOztBQUVELElBQUksRUFBRSxDQUFDOztRQUVFLElBQUksR0FBSixJQUFJO1FBQUUsVUFBVSxHQUFWLFVBQVUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0ICogYXMgdWkgZnJvbSBcIi4vdWkuanNcIjtcclxuaW1wb3J0IHsgTWFwIH0gZnJvbSBcIi4vbWFwLmpzXCI7XHJcblxyXG51aS5vbkdlbmVyYXRlKGZ1bmN0aW9uKHJvb21Db3VudCl7XHJcblx0bGV0IG1hcCA9IG5ldyBNYXAoMzAwLCAzMDApO1xyXG5cdG1hcC5nZW5lcmF0ZVJvb21zKHJvb21Db3VudCk7XHJcblx0bWFwLmRyYXcoKTtcclxufSk7IiwiaW1wb3J0ICogYXMgUm9vbWdlbiBmcm9tIFwiLi9yb29tZ2VuLmpzXCI7XHJcbmNsYXNzIE1hcCB7XHJcblx0cm9vbXMgPSBbXTtcclxuXHRjb25uZWN0aW9ucyA9IFtdO1xyXG5cclxuXHRjb25zdHJ1Y3Rvcih3aWR0aD0yMDAsIGhlaWdodD0yMDApIHtcclxuXHRcdHRoaXMud2lkdGggPSB3aWR0aDtcclxuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cdH1cclxuXHRhZGRSb29tKHJvb20pIHtcclxuXHRcdGNvbnNvbGUubG9nKFwiUm9vbSBhZGRlZDogXCIsIHJvb20pO1xyXG5cdFx0dGhpcy5yb29tcy5wdXNoKHJvb20pO1xyXG5cdH1cclxuXHJcblx0Z2VuZXJhdGVSb29tcyhyb29tQ291bnQpIHtcclxuXHRcdGZvcihsZXQgZ2VuZXJhdGVkUm9vbXMgPSAwOyBnZW5lcmF0ZWRSb29tcyA8IHJvb21Db3VudDsgZ2VuZXJhdGVkUm9vbXMrKykge1xyXG5cdFx0XHRsZXQgcm9vbSA9IFJvb21nZW4ucm9vbSg1MCwgNTApO1xyXG5cdFx0XHRyb29tLnBvc2l0aW9uKGdlbmVyYXRlZFJvb21zKjUwLCBnZW5lcmF0ZWRSb29tcyo1MCk7XHJcblx0XHRcdHRoaXMuYWRkUm9vbShyb29tKTtcclxuXHRcdH1cclxuXHJcblx0XHR0aGlzLmFkZENvbm5lY3Rpb25zKCk7XHJcblx0fVxyXG5cclxuXHRhZGRDb25uZWN0aW9ucygpIHtcclxuXHRcdGxldCByb29tcyA9IHRoaXMucm9vbXM7XHJcblx0XHRyb29tcy5mb3JFYWNoKGZ1bmN0aW9uKHJvb20pe1xyXG5cdFx0XHRsZXQgY2xvc2VzdFVuY29ubmVjdGVkID0gcm9vbS5jbG9zZXN0VW5jb25uZWN0ZWQocm9vbXMpO1xyXG5cdFx0XHRpZihjbG9zZXN0VW5jb25uZWN0ZWQpIHJvb20uY29ubmVjdChjbG9zZXN0VW5jb25uZWN0ZWQpO1xyXG5cdFx0fSk7XHJcblxyXG5cdFx0Y29uc29sZS5sb2coXCJDb25uZWN0ZWRcIiwgdGhpcy5yb29tcylcclxuXHR9XHJcblxyXG5cdGFkZENvbm5lY3Rpb24ocm9vbTEsIHJvb20yKSB7XHJcblx0XHRsZXQgY29ubmVjdGlvbiA9IG5ldyBDb25uZWN0aW9uKHJvb20xLCByb29tMik7XHJcblx0XHRjb25uZWN0aW9ucy5wdXNoKGNvbm5lY3Rpb24pO1xyXG5cdH1cclxuXHJcblx0ZHJhdygpIHtcclxuXHRcdGxldCBjYW52YXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiY2FudmFzXCIpLFxyXG5cdFx0XHRjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcclxuXHJcblx0XHRjYW52YXMud2lkdGggPSB0aGlzLndpZHRoO1xyXG5cdFx0Y2FudmFzLmhlaWdodCA9IHRoaXMuaGVpZ2h0O1xyXG5cclxuXHRcdGNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuXHJcblx0XHR0aGlzLnJvb21zLmZvckVhY2goZnVuY3Rpb24ocm9vbSl7XHJcblx0XHRcdGNvbnRleHQuZmlsbFJlY3Qocm9vbS54LCByb29tLnksIHJvb20ud2lkdGgsIHJvb20uaGVpZ2h0KTtcclxuXHRcdFx0cm9vbS5jb25uZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKGNvbm5lY3Rpb24pe1xyXG5cdFx0XHRcdGxldCByb29tQ29vcmQgPSByb29tLmdldENlbnRlcigpLFxyXG5cdFx0XHRcdFx0Y29uQ29vcmQgPSBjb25uZWN0aW9uLmdldENlbnRlcigpO1xyXG5cclxuXHRcdFx0XHRjb250ZXh0LmJlZ2luUGF0aCgpO1xyXG5cdFx0XHRcdGNvbnRleHQubW92ZVRvKHJvb21Db29yZC54LCByb29tQ29vcmQueSk7XHJcblx0XHRcdFx0Y29udGV4dC5saW5lVG8oY29uQ29vcmQueCwgY29uQ29vcmQueSk7XHJcblx0XHRcdFx0Y29udGV4dC5zdHJva2UoKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IHsgTWFwIH07IiwiY2xhc3MgUm9vbSB7XHJcblx0Y29ubmVjdGlvbnMgPSBbXTtcclxuXHRjb25zdHJ1Y3Rvcih3aWR0aCwgaGVpZ2h0LCB4ID0gMCwgeSA9IDApIHtcclxuXHRcdHRoaXMueCA9IHg7XHJcblx0XHR0aGlzLnkgPSB5O1xyXG5cdFx0dGhpcy53aWR0aCA9IHdpZHRoO1xyXG5cdFx0dGhpcy5oZWlnaHQgPSBoZWlnaHQ7XHJcblx0fVxyXG5cclxuXHRwb3NpdGlvbih4LCB5KSB7XHJcblx0XHR0aGlzLnggPSB4O1xyXG5cdFx0dGhpcy55ID0geTtcclxuXHR9XHJcblxyXG5cdHJhbmRvbVBvc2l0aW9uKHhNYXgsIHlNYXgpIHtcclxuXHRcdGxldCB4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnhNYXgpLFxyXG5cdFx0XHR5ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnlNYXgpO1xyXG5cclxuXHRcdHRoaXMueCA9IHg7XHJcblx0XHR0aGlzLnkgPSB5O1xyXG5cdH1cclxuXHJcblx0Y2xvc2VzdFVuY29ubmVjdGVkKHJvb21BcnJheSkge1xyXG5cdFx0bGV0IHVuY29ubmVjdGVkID0gcm9vbUFycmF5LmZpbHRlciggKHJvb20pID0+IHJvb20uY29ubmVjdGlvbnMubGVuZ3RoID09PSAwICYmIHJvb20gIT0gdGhpcyksXHJcblx0XHRcdGNsb3Nlc3QsXHJcblx0XHRcdGNsb3Nlc3REaXN0YW5jZSA9IEluZmluaXR5O1xyXG5cclxuXHRcdHVuY29ubmVjdGVkLmZvckVhY2goZnVuY3Rpb24ocm9vbSl7XHJcblx0XHRcdGlmKCFjbG9zZXN0KSBjbG9zZXN0ID0gcm9vbTtcclxuXHRcdFx0ZWxzZSB7XHJcblx0XHRcdFx0bGV0IGEgPSBNYXRoLmFicyh0aGlzLnggLSByb29tLngpLFxyXG5cdFx0XHRcdFx0YiA9IE1hdGguYWJzKHRoaXMueSAtIHJvb20ueSksXHJcblx0XHRcdFx0XHRkaXN0YW5jZSA9IE1hdGguc3FydCggTWF0aC5wb3coYSwgMikgKyBNYXRoLnBvdyhiLCAyKSApO1xyXG5cclxuXHRcdFx0XHRpZihjbG9zZXN0RGlzdGFuY2UgPiBkaXN0YW5jZSkge1xyXG5cdFx0XHRcdFx0Y2xvc2VzdCA9IHJvb207XHJcblx0XHRcdFx0XHRjbG9zZXN0RGlzdGFuY2UgPSBkaXN0YW5jZTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH1cclxuXHRcdH0sIHRoaXMpO1xyXG5cclxuXHRcdHJldHVybiBjbG9zZXN0O1xyXG5cdH1cclxuXHJcblx0Y29ubmVjdChyb29tKSB7XHJcblx0XHRpZighdGhpcy5jb25uZWN0aW9ucy5pbmRleE9mKHJvb20pICE9PSAtMSAmJiByb29tICE9IHRoaXMpIHtcclxuXHRcdFx0dGhpcy5jb25uZWN0aW9ucy5wdXNoKHJvb20pO1xyXG5cdFx0XHRyb29tLmNvbm5lY3Rpb25zLnB1c2godGhpcyk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRnZXRDZW50ZXIoKSB7XHJcblx0XHRsZXQgeCA9IE1hdGguZmxvb3IodGhpcy53aWR0aCAvIDIpICsgdGhpcy54LFxyXG5cdFx0XHR5ID0gTWF0aC5mbG9vcih0aGlzLmhlaWdodCAvIDIpICsgdGhpcy55O1xyXG5cclxuXHRcdHJldHVybiB7XHJcblx0XHRcdHg6IHgsXHJcblx0XHRcdHk6IHlcclxuXHRcdH1cclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFJvb20gfTsiLCJpbXBvcnQgeyBSb29tIH0gZnJvbSBcIi4vcm9vbS5qc1wiO1xyXG5mdW5jdGlvbiByb29tKG1heFdpZHRoLCBtYXhIZWlnaHQpIHtcclxuXHRsZXQgd2lkdGggID0gTWF0aC5tYXgoTWF0aC5yYW5kb20oKSptYXhXaWR0aCwgbWF4V2lkdGgvNSksXHJcblx0XHRoZWlnaHQgPSBNYXRoLm1heChNYXRoLnJhbmRvbSgpKm1heEhlaWdodCwgbWF4SGVpZ2h0LzUpO1xyXG5cclxuXHRyZXR1cm4gbmV3IFJvb20oTWF0aC5mbG9vcih3aWR0aCksIE1hdGguZmxvb3IoaGVpZ2h0KSk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHJvb20gfTsiLCJsZXQgZ2VuZXJhdGVGdW5jdGlvbnMgPSBbXTtcclxuZnVuY3Rpb24gYmluZCgpIHtcclxuXHRsZXQgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nZW5cIik7XHJcblx0YnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xyXG5cdFx0bGV0IGNvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltuYW1lPXJvb21Db3VudF1cIikudmFsdWU7XHJcblx0XHRnZW5lcmF0ZUZ1bmN0aW9ucy5mb3JFYWNoKChjYWxsYmFjaykgPT4gY2FsbGJhY2soY291bnQpKTtcclxuXHR9KTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uR2VuZXJhdGUoY2FsbGJhY2spIHtcclxuXHRnZW5lcmF0ZUZ1bmN0aW9ucy5wdXNoKGNhbGxiYWNrKTtcclxufVxyXG5cclxuYmluZCgpO1xyXG5cclxuZXhwb3J0IHsgYmluZCwgb25HZW5lcmF0ZSB9OyJdfQ==
