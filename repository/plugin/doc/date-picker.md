##日期选择器组件

###调用方法：
首先引入date-picker.js插件和common.css

	var DatePicker=require("./date-picker");//如果使用了seajs，否则去掉
	var datePicker=new DatePicker("#datePicker",".test-input",$);
	datePicker.init(); 
其中#datePicker是日期选择器面板，.test-input为日期输入框;$为jquery类似库。
###dem演示：
 [查看链接](../datepicker.html)

###说明
插件基于jquery类似库，若使用seajs则引入类jquery并传递进函数或者在全局使用script标签引入（ps:jquery库在seajs之前）。