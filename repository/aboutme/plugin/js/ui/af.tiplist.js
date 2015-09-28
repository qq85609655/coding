/**
 * 背景为黑色透明，其他dom不可触控，只显示下拉条件选择栏
 */
(function($) {
	
	$.fn.tiplist = function(options) {
		var opts = $.extend({
			targetChooseDOM: null,//选择数据显示dom区域
			callback:null,// 选中条件以后的触发的刷新函数
			selectFilter:{}, // 过滤不在显示的字段
			tiplistData:{}  // 显示的条件数据，其中包括筛选条件类别数据以及筛选的数据
		}, options);
		var chooseItem = {};
		var targetList=opts.targetDOM||$(this);
		var targetDIV=$(this);//condition dom
		var targetChooseDOM=opts.targetChooseDOM; // choose dom
		var tiplistData=opts.tiplistData;
		var selectFilter=opts.selectFilter;
		var	callback=opts.callback;
		targetDIV&&targetDIV.empty();
		targetChooseDOM&&targetChooseDOM.empty();
		targetDIV.html(createSelectConditionDOM(targetDIV,targetChooseDOM,tiplistData,selectFilter));
		$(".index_select_item_select_right").delegate('span', 'touchstart', function(event) {
			var dataSub=$(this).attr("data-bind");
			var type=$(this).attr("data-type")
			$("body").append(createMaskListDOM(dataSub,type));// 实现阴影后显示选项列表
			var eventTarget = event.target;
			var tarHeight = ~~$(eventTarget).height();
			var tarWidth = ~~$(eventTarget).width();
			var top = eventTarget.offsetTop + tarHeight;
			var left = eventTarget.offsetLeft;
			$(".span_t_list_item").css({
				"top": top,
				"left": left,
				"position": "absolute"
			});
			$(".div_f_mask_select").on("touchstart", function() {
				$(this).remove();
				return false;
			});
			$(".ul_select_list_item").undelegate("li",'touchstart',null);
			$(".choose_my").undelegate(".span_item_choose_one",'touchstart',null);
			$(".ul_select_list_item ").delegate('li', 'touchstart', function(event) {
				console.log($(this).text());
				var type=$(this).attr("data-type");
				var value=$(this).attr("data-value");
				chooseItem[type]=value;
				var fqstr="";
				for(key in chooseItem){
					if (!chooseItem[key]) continue;
					fqstr+=key+"@"+chooseItem[key]+",";
				}
				targetChooseDOM.html(createChooseItem(targetChooseDOM,chooseItem));
				localStorage.setItem("fqInfoStr",fqstr);
				callback&&callback(fqstr);
				// event.stopPropagation();
			});

			$(".choose_my").delegate('.span_item_choose_one', 'touchstart', function(event) {
				var type=$(this).attr("data-type");
				chooseItem[type]&& delete chooseItem[type];
				targetChooseDOM.html(createChooseItem(targetChooseDOM,chooseItem));
				var fqstr="";
				for (key in chooseItem) {
					if (!chooseItem[key]) continue;
					fqstr += key + "@" + chooseItem[key] + ",";
				}
				localStorage.setItem("fqInfoStr",fqstr);
				callback&&callback(fqstr);
				// event.stopPropagation();
			});
		});
	}
/**
 * 创建筛选条件dom
 * @param  {[type]} tiplistData  [description]
 * @param  {[type]} selectFilter [description]
 * @return {[type]}              [description]
 */
	function createSelectConditionDOM(targetDIV,targetChooseDOM,tiplistData,selectFilter){
		if (tiplistData.length == 0) {
			targetDIV&&targetDIV.css({
				border:0
			});
			targetChooseDOM&&targetChooseDOM.css({
				border:0
			});
			return "";
		}
		targetDIV && targetDIV.css({
			border: "1px solid #ccc"
		});
		targetChooseDOM && targetChooseDOM.css({
			border: 0
		});
		var selectDOM=
					"<span class='index_select_item_select_left'>"+
						"条件筛选：</span>"+
					"<span class='index_select_item_select_right'>";
		for (var i = 0; i <tiplistData.length; i++) {
			var obj=tiplistData[i];
			if(selectFilter&&selectFilter[obj.name]) continue;
			selectDOM+="<span class='span_item_select_one'  data-type=\'"+obj.name+"\' data-bind=\'"+obj.result+"\'>"+obj.cnName+"</span>";
		}
		selectDOM+="</span>";
		return selectDOM;
	}	
	/**
	 * 创建阴影窗口的选择条件数据列表
	 * @param  {[type]} dataSub [description]
	 * @param  {[type]} type    [description]
	 * @return {[type]}         [description]
	 */
	function createMaskListDOM(dataSub,type) {
			var selectMaskList=	"<div class='div_f_mask_select'>"+
					"<div class='span_t_list_item'>"+
						"<div class='div_select_list_item'>"+
							"<ul class='ul_select_list_item'>"+
								"<li class='li_select_list_item' data-type=\'"+type+"\' data-value=''>全部</li>";
			dataObjArray=dataSub.replace(/\|@(\d)*,?@?|@/g,"").split(",");
			if(dataObjArray.length==0) return "";
			for (var i = 0; i < dataObjArray.length; i++) {
				if(!dataObjArray[i])continue;
				selectMaskList+="<li class='li_select_list_item' data-type=\'"+type+"\' data-value=\'"+dataObjArray[i]+"\'>"+dataObjArray[i]+"</li>";
			}
			selectMaskList+="</ul>"+
						"</div>"+
					"</div>"+
				"</div>";
			return selectMaskList;
		}
	/**
	 * 显示选中的界面
	 * @param  {[type]} subObj [description]
	 * @return {[type]}        [description]
	 */
	function createChooseItem(targetChooseDOM, subObj) {
	
		targetChooseDOM && targetChooseDOM.css({
			border: 0
		});
		
		if (checkNULL(subObj)) {
			return "";
		}
		var chooseDOM =
			"<span class='index_select_item_choose_left'>" +
			"您的选择：" +
			"</span>" +
			"<span class='index_select_item_choose_right'>";
		for (key in subObj) {
			if (subObj[key] == "") continue;
			chooseDOM += "<span class='span_item_choose_one' data-type=\'" + key + "\'>" + subObj[key] + "</span>";
		}
		chooseDOM += "</span>";
		targetChooseDOM && targetChooseDOM.css({
			border: "1px solid #ccc"
		});
		return chooseDOM;
	}
	/**
	 * 判断实体中字段是否都是为空
	 * @param  {[type]} subObj [description]
	 * @return {[type]}        [description]
	 */
	function checkNULL(subObj) {
		var flag = true;
		for (var key in subObj) {
			if (subObj[key]) {
				flag = false;
				break;
			}
		}
		return flag;
	}
})(af)