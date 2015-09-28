;
var f=function() {
	//产生1-33之间的不重复的随机数
	lottery_in = {
			N: 5,
			win_num: [1, 4, 25, 2, 18, 33, 26],
			buy_num: [
				[11, 22, 33, 1, 2, 6, 9],
				[9, 7, 5, 4, 23, 32, 21],
				[10, 23, 30, 21, 22, 15, 14],
				[27, 8, 19, 10, 25, 30, 1],
				[32, 14, 5, 46, 4, 8, 11]
			]
		}
		//遍历购买的彩票并比对中奖张数
	var N = lottery_in.N,
		l = lottery_in.win_num.length,
		win_num = lottery_in.win_num,
		buy_num=lottery_in.buy_num,
		n = 0,
		set = [],
		result = [];
	while (n < l + 1) {
		result.push(0);
		n++;
	}

	for (var i = 0; i < N; i++) {
		var item = buy_num[i];
		var count = 0;
		for (var j = 0; j < l; j++) {
			var one = item[j];
			for (var k = 0; k < l; k++) {
				if (one === win_num[k]) {
					count++;
					break;
				}
			}

		}
		set[i] = count;
		result[l-count]++;
	}
	//中奖张数：count！=0
	//1~6等奖的中奖张数：1----count==1的个数，；2--count=2的个数  。。。
	console.log("特等奖中奖张数：" + (result[0]));
	for (var i = 1; i < l; i++) {
		console.log(i + "等奖中奖张数：" + (result[i]));
	};
};
f();