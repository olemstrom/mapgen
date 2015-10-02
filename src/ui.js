let generateFunctions = [];
function bind() {
	let button = document.querySelector(".gen");
	button.addEventListener("click", function(){
		let count = document.querySelector("[name=roomCount]").value;
		generateFunctions.forEach((callback) => callback(count));
	});

}

function onGenerate(callback) {
	generateFunctions.push(callback);
}

bind();

export { bind, onGenerate };