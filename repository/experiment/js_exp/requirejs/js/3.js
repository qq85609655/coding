define(["jquery"],function($){
	var sayhi=function(){
		$.setWord("requirejsworld")
		$.say();
		console.log($.getWord()+" haha!")
	}
	return {
		sayhi:sayhi
	}
});