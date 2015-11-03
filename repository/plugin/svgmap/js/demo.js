$(function() {
	var data = {
		"weihai": {
			"value": "30.05%",
			"index": "1",
			"stateInitColor": "0"
		},
		"jinan": {
			"value": "19.77%",
			"index": "2",
			"stateInitColor": "0"
		},
		"zaozhuang": {
			"value": "10.85%",
			"index": "3",
			"stateInitColor": "0"
		},
		"jining": {
			"value": "10.02%",
			"index": "4",
			"stateInitColor": "0"
		},
		"zibo": {
			"value": "8.46%",
			"index": "5",
			"stateInitColor": "1"
		},
		"qingdao": {
			"value": "4.04%",
			"index": "6",
			"stateInitColor": "1"
		},
		"yantai": {
			"value": "3.66%",
			"index": "7",
			"stateInitColor": "1"
		},
		"weifang": {
			"value": "2.56%",
			"index": "8",
			"stateInitColor": "2"
		},
		"dezhou": {
			"value": "2.47%",
			"index": "9",
			"stateInitColor": "2"
		},
		"binzhou": {
			"value": "2.3%",
			"index": "10",
			"stateInitColor": "2"
		},
		"laiwu": {
			"value": "1.48%",
			"index": "11",
			"stateInitColor": "2"
		},
		"taian": {
			"value": "0.99%",
			"index": "12",
			"stateInitColor": "3"
		},
		"rizhao": {
			"value": "0.78%",
			"index": "13",
			"stateInitColor": "3"
		},
		"linyi": {
			"value": "0.7%",
			"index": "14",
			"stateInitColor": "3"
		},
		"liaocheng": {
			"value": "0.44%",
			"index": "15",
			"stateInitColor": "3"
		},
		"dongying": {
			"value": "0.34%",
			"index": "16",
			"stateInitColor": "4"
		},
		"heze": {
			"value": "0.27%",
			"index": "17",
			"stateInitColor": "4"
		}
	};
	var mapRegion = $('#RegionMap').SVGMap({
		external: true,
		mapName: 'shandong',
		stateData: data,
		mapTipHtml: function(mapData, obj) {
			var _value = mapData[obj.id].value;
			var _idx = mapData[obj.id].index;
			var active = '';
			_idx < 4 ? active = 'active' : active = '';
			var tipStr = '<div class="mapInfo"><i class="' + active + '">' + _idx + '</i><span>' + obj.name + '</span><b>' + _value + '</b></div>';
			return tipStr;
		}
	});
});