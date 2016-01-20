/**
 * 状态模式定义了状态与行为之间的关系
 * @param  {[type]} light [description]
 * @return {[type]}       [description]
 */
function offLightState(light) {
	this.light = light;
}
offLightState.prototype.buttonWasPressed = function(argument) {
	console.log("弱光");
	this.light.setState(this.light.weakLightState);
}

function weakLightState(light) {
	this.light = light;
}
weakLightState.prototype.buttonWasPressed = function(argument) {
	console.log("强光");
	this.light.setState(this.light.strongLightState);
}

function strongLightState(light) {
	this.light = light;
}
strongLightState.prototype.buttonWasPressed = function(argument) {
	console.log("关灯");
	this.light.setState(this.light.offLightState);
}

function light() {
	this.offLightState = new offLightState(this);
	this.weakLightState = new weakLightState(this);
	this.strongLightState = new strongLightState(this);

}
light.prototype.setState = function(state) {
	this.currState = state;
}
light.prototype.init = function(state) {
	var self = this;
	this.currState = this.offLightState;
	this.button = document.createElement("button");
	this.button.innerHTML = "开关";
	document.body.appendChild(this.button);
	this.button.onclick = function() {
		self.currState.buttonWasPressed();
	}
}

new light().init();