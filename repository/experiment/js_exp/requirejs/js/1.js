define(function(){
	var word;
	var setWord=function(w){
		word=w;
	}
	var getWord=function(w){
		return word;
	}
	var say=function(){
		console.log("i am  say:"+word);
	}
	return {
		setWord:setWord,
		say:say,
		getWord:getWord
	}
});