#scroll-emulate-jq插件使用文档
###使用说明
为了实现滚动效果的跨浏览器一致性，同时项目中遇到了设计的新样式，所以进行了该插件的编码。
代码基于jquery框架，兼容ie6+以及chrome。

###应用代码

html代码：
    
    <div class="scroll-emulate">
		<div class="scroll-emulate-area">
			<div class="scroll-container">
				<div class="scroll-contain-title">
					 
				</div>
				<div class="scroll-area">
					<div class="scroll-contain-body">
						滚动内容区
					</div>
				</div>
			</div>
		</div>
		<div class="scroll-bar">
			<div class="scroll-bg">
				<div class="scroll-bar-up"></div>
			</div>
		</div>
	</div> 
js代码：

	new Scroll($(".scroll-emulate")).init();

参数：传入滚动区dom节点

ps：界面为了实现半封装，所以未封装html代码的生成渲染。

###demo演示

[scroll-emulate-jq.html](../scroll-emulate-jq.html)