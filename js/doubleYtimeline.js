
//恩施市骑龙公司茶叶收购统计

var myChart = echarts.init(document.getElementById('doubleYtimeline'));
var doubleYtimelineShow = function(){
    var myChart = echarts.init(document.getElementById('doubleYtimeline'));
    $.ajax({
        type: "post",
        dataType: "json",
        url: "./js/doubleYtimeline.json",
        // data: dataurl,
        success: function (res){
            if(res.code == 'N01'){
                //console.log(res.contents);
                var dataMap = {};

                function dataFormatter(obj) {
                    var pList = ['一芽二叶','一芽叶','芽头','一芽三叶'];
                    var temp;
                    for (var month = 1; month <= 12; month++) {
                        temp = obj[month];
                        var l = temp.length;
                        for (var i = 1; i < l; i++) {
                            obj[month][i] = {
                                name : pList[i],
                                value : temp[i]
                            }
                        }
                    }
                    return obj;
                }
                //将ProductNmae\Purchase和Price分别放到三个空白的数组中，0-11

                var arrProductName=[];
                var arrPurchaseWeight=[];
                var arrPurchasePrice=[];
                // console.log(res.contents.list.length);
                // console.log(res.contents.list[1]);
                for(var i=0;i<res.contents.size;++i){
                    var arr_productN=[];
                    var arr_weight=[];
                    var arr_price=[];
                    //console.log('数组长度'+i+res.contents.list[i].data.length);
                    for(var j=0;j<res.contents.list[i].data.length;++j){

                        arr_productN.push(res.contents.list[i].data[j].product_name);
                        arr_weight.push(res.contents.list[i].data[j].purchase_total_weight);
                        arr_price.push(res.contents.list[i].data[j].purchase_total_price);
                    }
                    //console.log(arr_price);
                    arrProductName.push(arr_productN);
                    arrPurchaseWeight.push(arr_weight);
                    arrPurchasePrice.push(arr_price);

                }
                // console.log(arrProductName[0]);
                // console.log(arrPurchasePrice[0]);

                dataMap.dataPurchase = dataFormatter({
                    //max : 60000, 
                    // 12:[84.11,89.91,64.05,215.19],   //测试假数据                  
                    12:arrPurchaseWeight[11],
                    11:arrPurchaseWeight[10],
                    10:arrPurchaseWeight[9],
                    9:arrPurchaseWeight[8],
                    8:arrPurchaseWeight[7],
                    7:arrPurchaseWeight[6],
                    6:arrPurchaseWeight[5],
                    5:arrPurchaseWeight[4],
                    4:arrPurchaseWeight[3],
                    3:arrPurchaseWeight[2],
                    2:arrPurchaseWeight[1],
                    1:arrPurchaseWeight[0]
                });

                dataMap.dataPrice = dataFormatter({
                    //max : 4000,
                    // 12:[30,41,36,68],                  //测试假数据
                    12:arrPurchasePrice[11],
                    11:arrPurchasePrice[10],
                    10:arrPurchasePrice[9],
                    9:arrPurchasePrice[8],
                    8:arrPurchasePrice[7],
                    7:arrPurchasePrice[6],
                    6:arrPurchasePrice[5],
                    5:arrPurchasePrice[4],
                    4:arrPurchasePrice[3],
                    3:arrPurchasePrice[2],
                    2:arrPurchasePrice[1],
                    1:arrPurchasePrice[0]
                });

                option7 = {
                    baseOption: {
                        timeline: {
                            show:'false',
                            axisType: 'category', //类目轴，适用于离散的类目数据
                            autoPlay: true,      //自动播放
                            playInterval: 1000,
                            // lineStyle:{
                            //     color:'white'
                            // },
                            data: [
                                '1','2','3','4','5','6','7', '8','9','10','11','12',
                            ],
                            label: {
                                formatter : function(s) {
                                    return (new Date(s)).getMonth()+1;
                                },
                                    textStyle: {
                                        color: 'white'
                                }
                            }
                        },
                        legend: {
                            x: '70%',
                            top: '5%',
                            data: ['收购量','单价']
                        },
                        tooltip : {
                            trigger: 'axis',
                            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                            }
                        },
                        calculable : true,
                        grid: {
                            top: 100,
                            bottom: 70,
                            tooltip: {
                                trigger: 'axis',
                                axisPointer: {
                                    type: 'shadow',
                                    label: {
                                        show: true,
                                        formatter: function (params) {
                                            return params.value.replace('\n', '');
                                        }
                                    }
                                }
                            }
                        },
                        xAxis: [
                            {
                                'type':'category',
                                // 'data':[
                                //     '一芽二叶**','一芽叶','芽头','一芽三叶'
                                // ],
                                'data':[
                                    '','','',''
                                ],
                                axisLabel: {
                                    textStyle:{
                                        color:'#adadad'
                                    }
                                },
                                splitLine: {show: false}
                            },
                        ],
                        yAxis: [
                            {
                                //第一个y轴信息
                                type: 'value',
                                position: 'left',
                                axisLabel : {
                                    show : true,
                                    //修改轴线色彩
                                    textStyle:{
                                        color:'#adadad'
                                    },
                                    nameTextStyle:{
                                        color:'#adadad'
                                    }
                                },
                                nameTextStyle:{
                                    color:'#adadad'
                                },
                                name: '斤'
                            },                    
                            {
                                type: 'value',
                                position: 'right',
                                yAxisIndex:1,
                                axisLabel : {
                                    show : true,
                                    textStyle:{
                                        color:'#adadad'
                                    }
                                },
                                nameTextStyle:{
                                    color:'#adadad'
                                },
                                // min: 0,
                                // max: 100,
                                // interval: 20,
                                name: '元'
                            }
                        ],
                        series: [
                            {name: '收购量', type: 'bar'},
                            {name: '单价', type: 'bar'}
                        ]
                    },
                    options: [
                        {
                            title: {
                                text:'恩施市骑龙公司茶叶收购统计',
                                x:'center',
                                subtext: '1月收购量/单价统计',
                                subtextStyle:{
                                    color: '#adadad'
                                }
                                // subtextStyle: {
                                //     color: '#aaa'          // 副标题文字颜色
                                // }
                            },


                            //x轴坐标名
                            // xAxis:[{'data':['11','21','31','41']}], 
                            xAxis:[{'data':arrProductName[0]}],
                            series: [
                                {data: dataMap.dataPurchase['1']},
                                {
                                    yAxisIndex: 1,
                                    data: dataMap.dataPrice['1']
                                }
                            ]
                        },
                        {
                            title : {subtext: '2月收购量/单价统计'},
                            // xAxis:[data:['11','22','33','44']],
                            // xAxis:[{'data':['11','22','33','44']}],
                            // xAxis:[{'data':['12','22','32','42']}],
                            xAxis:[{'data':arrProductName[1]}],
                            series : [
                                {data: dataMap.dataPurchase['2']},
                                {data: dataMap.dataPrice['2']}
                            ]
                        },
                        {
                            title : {subtext: '3月收购量/单价统计'},
                            // xAxis:[{'data':['13','23','33','43']}],
                            xAxis:[{'data':arrProductName[2]}],
                            series : [
                                {data: dataMap.dataPurchase['3']},
                                {data: dataMap.dataPrice['3']}
                            ]
                        },
                        {
                            title : {subtext: '4月收购量/单价统计'},
                            // xAxis:[{'data':['14','24','34','44']}],
                            xAxis:[{'data':arrProductName[3]}],
                            series : [
                                {data: dataMap.dataPurchase['4']},
                                {data: dataMap.dataPrice['4']}
                            ]
                        },
                        {
                            title : {subtext: '5月收购量/单价统计'},
                            // xAxis:[{'data':['1xx','2xx','3xx','4xx']}],
                            xAxis:[{'data':arrProductName[4]}],
                            series : [
                                {data: dataMap.dataPurchase['5']},
                                {data: dataMap.dataPrice['5']}
                            ]
                        },
                        {
                            title : {subtext: '6月收购量/单价统计'},
                            // xAxis:[{'data':['16','26','36','46']}],
                            xAxis:[{'data':arrProductName[5]}],
                            series : [
                                {data: dataMap.dataPurchase['6']},
                                {data: dataMap.dataPrice['6']}
                            ]
                        },
                        {
                            title : {subtext: '7月收购量/单价统计'},
                            // xAxis:[{'data':['17','27','37','47']}],
                            xAxis:[{'data':arrProductName[6]}],
                            series : [
                                {data: dataMap.dataPurchase['7']},
                                {data: dataMap.dataPrice['7']}
                            ]
                        },
                        {
                            title : {subtext: '8月收购量/单价统计'},
                            // xAxis:[{'data':['18','28','38','48']}],
                            xAxis:[{'data':arrProductName[7]}],
                            series : [
                                {data: dataMap.dataPurchase['8']},
                                {data: dataMap.dataPrice['8']}
                            ]
                        },
                        {
                            title : {subtext: '9月收购量/单价统计'},
                            // xAxis:[{'data':['19','29','39','49']}],
                            xAxis:[{'data':arrProductName[8]}],
                            series : [
                                {data: dataMap.dataPurchase['9']},
                                {data: dataMap.dataPrice['9']}
                            ]
                        },
                        {
                            title : {subtext: '10月收购量/单价统计'},
                            // xAxis:[{'data':['110','210','310','410']}],
                            xAxis:[{'data':arrProductName[9]}],
                            series : [
                                {data: dataMap.dataPurchase['10']},
                                {data: dataMap.dataPrice['10']}

                            ]
                        },
                        {
                            title : {subtext: '11月收购量/单价统计'},
                            // xAxis:[{'data':['111','211','311','411']}],
                            xAxis:[{'data':arrProductName[10]}],
                            series : [
                                {data: dataMap.dataPurchase['11']},
                                {data: dataMap.dataPrice['11']}
                            ]
                        },
                        {
                            title : {subtext: '12月收购量/单价统计'},
                            // xAxis:[{'data':['112','212','312','412']}],
                            xAxis:[{'data':arrProductName[10]}],
                            series : [
                                {data: dataMap.dataPurchase['12']},
                                {data: dataMap.dataPrice['12']}
                            ]
                        }
                    ]
                };
                myChart.setOption(option7);
            }
            else if(data.code == 'E01'){
                alert(data.message);
            }
        },
        error:function(XMLHttpRequest,textStatus,errorThrown){
            // console.log(XMLHttpRequest);
            console.log(textStatus);
            console.log(errorThrown);
        }
    })

}
doubleYtimelineShow();
                    
