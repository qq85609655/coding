//该为amd规范定义的插件编写方法
define(["jquery"],function($){
	var add=function(x,y){
		return x+y;
	};
	var minus=function(x,y){
		return x-y;
	};

	var fun={
		add:add,
		minus:minus
	}
	$.add=add;
	$.minus=minus;
	return $;
});