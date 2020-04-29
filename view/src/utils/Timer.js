function Timer(fn, t) {
	var timerObj = setInterval(fn, t);

	this.stop = function() {
		if (timerObj) {
			clearInterval(timerObj);
			timerObj = null;
		}
		return this;
	};

	// start timer using current settings (if it's not already running)
	this.start = function() {
		if (!timerObj) {
			this.stop();
			timerObj = setInterval(fn, t);
		}
		return this;
	};

	// start with new or original interval, stop current interval
	this.reset = function(newT = t) {
		t = newT;
		return this.stop().start();
	};
}

export default Timer;
