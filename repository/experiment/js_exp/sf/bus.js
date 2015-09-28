var bus;
;(function(){
	//f(a,b)=A(a,b)+MAX(f(a-1,b),f(a,b-1));
	var dataset={
		"0,0":1,
		"2,1":2,
		"4,5":5
	}
bus=pickPassage;
	function pickPassage(x,y){
		if(x===0&&y===0){
			return dataset[x+","+y];
		}else if (x<0||y<0){
			return 0;
		}else{
			var m1=arguments.callee(x-1,y);
			var m2=arguments.callee(x,y-1);
			if(m1>m2){
				return m1+(dataset[x+","+y]?dataset[x+","+y]:0);
			}else{
				return m2+(dataset[x+","+y]?dataset[x+","+y]:0);
			}
		}
	}


	function sortup(arr){
		var tmp;
		for(var i=0;i<arr.length-1;i++){
			for(var j=0;j<arr.length-1-i;j++){
				if(arr[j]>arr[j+1]){
					tmp=arr[j];
					arr[j]=arr[j+1];
					arr[j+1]=tmp;
				}
			}
		}
		return arr;
	}
	function sortdown(arr){
		var tmp;
		for(var i=0;i<arr.length-1;i++){
			for(var j=0;j<arr.length-1-i;j++){
				if(arr[j]<arr[j+1]){
					tmp=arr[j];
					arr[j]=arr[j+1];
					arr[j+1]=tmp;
				}
			}
		}
		return arr;
	}
})();