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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJFOi9kZXYvbWFwZ2VuL3NyYy9tYWluLmpzIiwiRTovZGV2L21hcGdlbi9zcmMvbWFwLmpzIiwiRTovZGV2L21hcGdlbi9zcmMvcm9vbS5qcyIsIkU6L2Rldi9tYXBnZW4vc3JjL3Jvb21nZW4uanMiLCJFOi9kZXYvbWFwZ2VuL3NyYy91aS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7b0JDQW9CLFNBQVM7O0lBQWpCLEVBQUU7O3FCQUNNLFVBQVU7O0FBRTlCLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBUyxTQUFTLEVBQUM7QUFDaEMsS0FBSSxHQUFHLEdBQUcsZUFBUSxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7QUFDNUIsSUFBRyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM3QixJQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7Q0FDWCxDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozt5QkNQc0IsY0FBYzs7SUFBM0IsT0FBTzs7SUFDYixHQUFHO0FBRUcsVUFGTixHQUFHLEdBRTJCO01BQXZCLEtBQUsseURBQUMsR0FBRztNQUFFLE1BQU0seURBQUMsR0FBRzs7d0JBRjVCLEdBQUc7O09BQ1IsS0FBSyxHQUFHLEVBQUU7O0FBRVQsTUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsTUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7RUFDckI7O2NBTEksR0FBRzs7U0FNRCxpQkFBQyxJQUFJLEVBQUU7QUFDYixVQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNsQyxPQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztHQUN0Qjs7O1NBRVksdUJBQUMsU0FBUyxFQUFFO0FBQ3hC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Q0FBQztDQUN2RDs7UUFFUSxJQUFJLEdBQUosSUFBSTs7Ozs7Ozs7QUNSYixJQUFJLGlCQUFpQixHQUFHLEVBQUUsQ0FBQztBQUMzQixTQUFTLElBQUksR0FBRztBQUNmLEtBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDNUMsT0FBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFVO0FBQzFDLE1BQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFDN0QsbUJBQWlCLENBQUMsT0FBTyxDQUFDLFVBQUMsUUFBUTtVQUFLLFFBQVEsQ0FBQyxLQUFLLENBQUM7R0FBQSxDQUFDLENBQUM7RUFDekQsQ0FBQyxDQUFDO0NBRUg7O0FBRUQsU0FBUyxVQUFVLENBQUMsUUFBUSxFQUFFO0FBQzdCLGtCQUFpQixDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUNqQzs7QUFFRCxJQUFJLEVBQUUsQ0FBQzs7UUFFRSxJQUFJLEdBQUosSUFBSTtRQUFFLFVBQVUsR0FBVixVQUFVIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCAqIGFzIHVpIGZyb20gXCIuL3VpLmpzXCI7XHJcbmltcG9ydCB7IE1hcCB9IGZyb20gXCIuL21hcC5qc1wiO1xyXG5cclxudWkub25HZW5lcmF0ZShmdW5jdGlvbihyb29tQ291bnQpe1xyXG5cdGxldCBtYXAgPSBuZXcgTWFwKDMwMCwgMzAwKTtcclxuXHRtYXAuZ2VuZXJhdGVSb29tcyhyb29tQ291bnQpO1xyXG5cdG1hcC5kcmF3KCk7XHJcbn0pOyIsImltcG9ydCAqIGFzIFJvb21nZW4gZnJvbSBcIi4vcm9vbWdlbi5qc1wiO1xyXG5jbGFzcyBNYXAge1xyXG5cdHJvb21zID0gW107XHJcblx0Y29uc3RydWN0b3Iod2lkdGg9MjAwLCBoZWlnaHQ9MjAwKSB7XHJcblx0XHR0aGlzLndpZHRoID0gd2lkdGg7XHJcblx0XHR0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuXHR9XHJcblx0YWRkUm9vbShyb29tKSB7XHJcblx0XHRjb25zb2xlLmxvZyhcIlJvb20gYWRkZWQ6IFwiLCByb29tKTtcclxuXHRcdHRoaXMucm9vbXMucHVzaChyb29tKTtcclxuXHR9XHJcblxyXG5cdGdlbmVyYXRlUm9vbXMocm9vbUNvdW50KSB7XHJcblx0XHRmb3IobGV0IGdlbmVyYXRlZFJvb21zID0gMDsgZ2VuZXJhdGVkUm9vbXMgPCByb29tQ291bnQ7IGdlbmVyYXRlZFJvb21zKyspIHtcclxuXHRcdFx0bGV0IHJvb20gPSBSb29tZ2VuLnJvb20oNTAsIDUwKTtcclxuXHRcdFx0cm9vbS5yYW5kb21Qb3NpdGlvbih0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcblxyXG5cdFx0XHR0aGlzLmFkZFJvb20ocm9vbSk7XHJcblx0XHR9XHJcblx0fVxyXG5cdGRyYXcoKSB7XHJcblx0XHRsZXQgY2FudmFzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImNhbnZhc1wiKSxcclxuXHRcdFx0Y29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIik7XHJcblxyXG5cdFx0Y2FudmFzLndpZHRoID0gdGhpcy53aWR0aDtcclxuXHRcdGNhbnZhcy5oZWlnaHQgPSB0aGlzLmhlaWdodDtcclxuXHJcblx0XHRjb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcblxyXG5cdFx0dGhpcy5yb29tcy5mb3JFYWNoKGZ1bmN0aW9uKHJvb20pe1xyXG5cdFx0XHRjb250ZXh0LmZpbGxSZWN0KHJvb20ueCwgcm9vbS55LCByb29tLndpZHRoLCByb29tLmhlaWdodCk7XHJcblx0XHR9KTtcclxuXHJcblxyXG5cdH1cclxufVxyXG5cclxuZXhwb3J0IHsgTWFwIH07IiwiY2xhc3MgUm9vbSB7XHJcblx0Y29uc3RydWN0b3Iod2lkdGgsIGhlaWdodCwgeCA9IDAsIHkgPSAwKSB7XHJcblx0XHR0aGlzLnggPSB4O1xyXG5cdFx0dGhpcy55ID0geTtcclxuXHRcdHRoaXMud2lkdGggPSB3aWR0aDtcclxuXHRcdHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xyXG5cdH1cclxuXHJcblx0cG9zaXRpb24oeCwgeSkge1xyXG5cdFx0dGhpcy54ID0geDtcclxuXHRcdHRoaXMueSA9IHk7XHJcblx0fVxyXG5cclxuXHRyYW5kb21Qb3NpdGlvbih4TWF4LCB5TWF4KSB7XHJcblx0XHRsZXQgeCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp4TWF4KSxcclxuXHRcdFx0eSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSp5TWF4KTtcclxuXHJcblx0XHR0aGlzLnggPSB4O1xyXG5cdFx0dGhpcy55ID0geTtcclxuXHR9XHJcbn1cclxuXHJcbmV4cG9ydCB7IFJvb20gfTsiLCJpbXBvcnQgeyBSb29tIH0gZnJvbSBcIi4vcm9vbS5qc1wiO1xyXG5mdW5jdGlvbiByb29tKG1heFdpZHRoLCBtYXhIZWlnaHQpIHtcclxuXHRsZXQgd2lkdGggID0gTWF0aC5tYXgoTWF0aC5yYW5kb20oKSptYXhXaWR0aCwgbWF4V2lkdGgvNSksXHJcblx0XHRoZWlnaHQgPSBNYXRoLm1heChNYXRoLnJhbmRvbSgpKm1heEhlaWdodCwgbWF4SGVpZ2h0LzUpO1xyXG5cclxuXHRyZXR1cm4gbmV3IFJvb20oTWF0aC5mbG9vcih3aWR0aCksIE1hdGguZmxvb3IoaGVpZ2h0KSk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IHJvb20gfTsiLCJsZXQgZ2VuZXJhdGVGdW5jdGlvbnMgPSBbXTtcclxuZnVuY3Rpb24gYmluZCgpIHtcclxuXHRsZXQgYnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nZW5cIik7XHJcblx0YnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbigpe1xyXG5cdFx0bGV0IGNvdW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIltuYW1lPXJvb21Db3VudF1cIikudmFsdWU7XHJcblx0XHRnZW5lcmF0ZUZ1bmN0aW9ucy5mb3JFYWNoKChjYWxsYmFjaykgPT4gY2FsbGJhY2soY291bnQpKTtcclxuXHR9KTtcclxuXHJcbn1cclxuXHJcbmZ1bmN0aW9uIG9uR2VuZXJhdGUoY2FsbGJhY2spIHtcclxuXHRnZW5lcmF0ZUZ1bmN0aW9ucy5wdXNoKGNhbGxiYWNrKTtcclxufVxyXG5cclxuYmluZCgpO1xyXG5cclxuZXhwb3J0IHsgYmluZCwgb25HZW5lcmF0ZSB9OyJdfQ==
