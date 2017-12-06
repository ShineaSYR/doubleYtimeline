doubleYtimeline
=====

该代码主要是动态展示两种信息，使用jQuery、echarts的timeline技术。

###文件结构
文件的结构层次
```
+--	js/
|	+--	doubleYtimeline.js
|	+--	doubleYtimeline.json
|	+--	echarts.min.js
|	+--	jquery-3.2.1.min.js
+--	doubleYtimeline.html
```
####文件说明

__doubleYtimeline.js__该文件为主要的JS文件，在该页面写JS。
__doubleYtimeline.json__该文件为接口调用文件，Json格式。
__echarts.min.js__该文件为echarts的引用包。
__jquery-3.2.1.min.js__该文件为jQuery引用的包。
__doubleYtimeline.html__该文件为页面的主要展示的Html文件。

__注意：__代码中需要注意各个JS文件引用顺序，因为echarts依赖jQuery的包，所以jQuery的包需要在echarts之前，其他具体的可以自行Google。






