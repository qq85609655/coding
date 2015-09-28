var DOMSRC = {
	"基本信息": {
		type: "cell",
		fields: {
			"姓名": "王训训",
			"性别": "男",
			"民族": "汉",
			"出生年月": "男",
			"籍贯": "山东枣庄",
			"学历": "本科",
			"专业": "通信工程",
			"毕业院校": "青岛科技大学",
			"邮箱": "745926676@qq.com",
			"联系电话": "15588483320"
		}
	},
	"求职意向": {
		type: "article",
		fields: {
			"目标岗位": "前端开发工程师"
		}
	},
	"工作经历": {
		type: "article",
		fields: {
			"1:": "2013、7-2014、10  威海北洋电气集团 软件开发工程师",
			"2:": "2015、2至今  浪潮软件   webapp开发工程师"
		}
	},
	"项目经历": {
		type: "article",
		fields: {
			"1:": "威海北洋电气集团时期：所属为身份核查项目组，主要进行公安相关软件的开发，主要参与了两个项目的开发<br/>&nbsp;&nbsp;a、2013年9月，参与警务移动核查系统的全栈开发，使用jsp+jquery+spring+mybatis+oracle技术进行web应用系统的开发<br/>&nbsp;&nbsp;b、2014年2月，参与社区警务项目的全栈开发，主要包括BS系统和webapp部分，独自负责相关业务系统的bs和webapp对应模块的开发",
			"2:": "浪潮软件：所属部门为政府信息化政法事业部，主要从事政法警务相关业务的开发<br/>&nbsp;&nbsp;a、使用浪潮移动开发平台（IMP），即采用移动开发混合模式进行警务云搜app版的开发，涉及技术有css3、html5、js（app framework 前端框架)、Android，实现app应用的快速开发"
		}
	},
	"掌握技能": {
		type: "article",
		fields: {
			"1:": "擅长webapp前端开发以及移动应用混合模式研发，熟练使用html、js、 css；了解前端新技术，包括less，后台nodejs",
			"2:": "熟悉web后台开发、java、Android的项目开发"
		}
	},
	"自我评价和期望": {
		type: "article",
		fields: {
			"&nbsp;": "本人工作积极主动，对于工作认真严谨，热爱前端新技术，喜欢学习钻研技术并学以致用，希望在前端开发的方向上坚持下去，成为一名优秀的前端代码设计师。在移动互联网前端技术日新月异的现在，前端作为产品与用户之间的桥梁必将承担更多的责任，我相信我能胜任也乐于胜任。"
		}
	}
}



var domid;
var widththreshold=1000; 
function init() {
	domid = document.getElementById("contain");
	var domStr = "";
	for (var key in DOMSRC) {
		if (DOMSRC[key]["type"] == "cell") {
			if (window.screen.width > widththreshold) {
				domStr +=
					"<section class='section_s_p'>" +
					"<div class = 'div_t_header' > " + key + " </div>" +
					"<div class = 'div_t_borderline' ><div class = 'div_t_borderline_left' ></div><div class = 'div_t_borderline_right' ></div></div>" +
					"<div class = 'div_t_body' >" +
					"<div class = 'div_t_body_left' >";
				var fields = DOMSRC[key]["fields"];
				var i = 0;
				for (var field in fields) {
					if (i % 2 == 0) {
						domStr += "<ul class = 'ul_f_contian' >";
					}
					domStr += "<li class = 'li_f_item' > &nbsp;" + field + "：" + fields[field] + " </li>";
					if (i % 2 == 1) {
						domStr += "</ul>";
					}
					i++;
				}
				domStr += "</div> " +
					"<div class = 'div_t_body_right' >" +
					"</div>" +
					"</section>";
			} else {
				domStr +=
					"<section class='section_s_p'>" +
					"<div class = 'div_t_header' > " + key + " </div>" +
					"<div class = 'div_t_borderline' ><div class = 'div_t_borderline_left' ></div><div class = 'div_t_borderline_right' ></div></div>" +
					"<div class = 'div_t_body' >" +
					"<div class = 'div_t_body_left' >";
				var fields = DOMSRC[key]["fields"];
				var i = 0;
				for (var field in fields) {
					if (i < 6) {
						if (i % 2 == 0) {
							domStr += "<ul class = 'ul_f_contian' >";
						}
						domStr += "<li class = 'li_f_item' > &nbsp;" + field + "：" + fields[field] + " </li>";
						if (i % 2 == 1) {
							domStr += "</ul>";
						}
					} else if (i == 6) {
						domStr += "</div> " +
							"<div class = 'div_t_body_right' ></div></div>" ;
					} else {
						domStr +="<div class = 'div_t_body_down' >  &nbsp;" + field + "：" + fields[field] +
							"</div>" ;
					}

					i++;
				}
				domStr +="</section>";

			}
		} else if (DOMSRC[key]["type"] == "article") {
			domStr +=
				"<section class='section_s_p'>" +
				"<div class = 'div_t_header' > " + key + " </div>" +
				"<div class = 'div_t_borderline' ><div class = 'div_t_borderline_left' ></div><div class = 'div_t_borderline_right' ></div></div>" +
				"<div class = 'div_t_body_desc' >";
			var fields = DOMSRC[key]["fields"];
			for (var field in fields) {
				domStr += "<div class = 'div_f_item' > &nbsp;" + field + fields[field] + " </div>";
			}
			domStr += "</div> " +
				"</section>";
		}
	};
	domid.innerHTML = domStr;
}