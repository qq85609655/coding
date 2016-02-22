define(function() {
	var word;
	var setWord = function(w) {
		word = w;
	}
	var getWord = function() {
		return word;
	}
	var say = function() {
		console.log("in 1.js ,i am  say:" + word);
	}
	 
	return {
		setWord: setWord,
		say: say,
		getWord: getWord
	}
});