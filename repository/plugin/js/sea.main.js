define(function(require){
	var DatePicker=require("./date-picker");
	var datePicker=new DatePicker("#datePicker",".test-input");
	datePicker.init(); 
});