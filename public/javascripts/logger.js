function Logger() {
	this.enabled = true;
}

Logger.prototype.setEnabled = function(value) {
	this.enabled = value;
	console.log("Logger.enabled set to "+this.enabled+".");
}

Logger.prototype.log = function(message) {
	if (this.enabled && console.log) {
		console.log(message);
	}
}