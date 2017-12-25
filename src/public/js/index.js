
// 地图
var map = echarts.init(document.getElementById('map'),'dark');
var a = echarts.init(document.getElementById('a'),'dark');
var b = echarts.init(document.getElementById('b'),'dark');
var c = echarts.init(document.getElementById('c'),'dark');
var d = echarts.init(document.getElementById('d'),'dark');
var e = echarts.init(document.getElementById('e'),'dark');
var f = echarts.init(document.getElementById('f'),'dark');
var g = echarts.init(document.getElementById('g'),'dark');
var h = echarts.init(document.getElementById('h'),'dark');

//设置子表格标题大小
var titleFontSize = '14';
var allList;
var dataTime;
var multiple = 5;
window.addEventListener("resize",function(){
    map.resize();
     a.resize();
     b.resize();
     c.resize();
     d.resize();
     e.resize();
     f.resize();
     g.resize();
     h.resize();
});

map.showLoading();
a.showLoading();
b.showLoading();
c.showLoading();
d.showLoading();
e.showLoading();
f.showLoading();
g.showLoading();
h.showLoading();

//map
function mapCharts(data){
    map.hideLoading();
var convertData = function (data) {
    var res = [];
    for (var i in data) {
            res.push({
                id:data[i].id,
                name: data[i].device_sn,
                value: [data[i].device_lng,data[i].device_lat]
            });
    }
    return res;
};

allList = convertData(data);

map.setOption(option = {
     backgroundColor:'#313745',
    tooltip : {
        trigger: 'item'
    },
    geo: {
        map: 'china',
         zoom: 1.2,
        roam: true,
        scaleLimit:{
            min:1.2
        },
        label: {
            emphasis: {
                show: false
            }
        },
        itemStyle: {
            normal: {
                areaColor: '#323c48',
                borderColor: '#111'
            },
            emphasis: {
                areaColor: '#323c48',
                //borderColor: '#2a333d'
            }
        }
    },
    series : [
        {
            name: '充电桩点',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: convertData(data),
            symbolSize: 6,
            tooltip : {
                formatter: '{a}: {b}<br />坐标: {c}'
            }
        }
    ]
});
}

function mapChartsShow(id){
var showData = function(id){
     var data = allList;
    for(var i in data)
    {
        if(data[i].id==id)
        {
            return data.slice(i, i*1+1);
        }
    }
}

var option = {

    series : [
        {
            name: '充电桩点',
            type: 'scatter',
            coordinateSystem: 'geo',
            data: allList,
            symbolSize: 6,
            tooltip : {
                formatter: '{a}: {b}<br />坐标: {c}'
            }
        },
        {
            name: '活动点',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            data: showData(id),
            symbolSize: 20,
            showEffectOn: 'render',
            rippleEffect: {
                brushType: 'stroke',
                period:2
            },
            hoverAnimation: true,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                }
            },
            tooltip : {
                formatter: '{a}: {b}<br />坐标: {c}'
            },
            itemStyle: {
            normal: {
                color: '#3dcae6'
            }
            }
        }
    ]
}

map.setOption(option);

var showTimer = setTimeout(function(){
    if(option.series[1].data!==undefined){
     option.series[1].data.shift(); 
     map.setOption(option);
    }
     clearTimeout(showTimer);
},1000);

}

function aCharts(data) {
    var xData = [];
    var yData = [];
    for(var i in data)
    {
        var xInfo = {'date':data[i].dateStr};
        xData.push(xInfo);
        var yInfo = {'num':data[i].count*multiple};
        yData.push(yInfo);
    }
    
    a.hideLoading();
    a.setOption(option = {
        backgroundColor:'#313745',
        grid: {
            top:'10%',
            left: '1%',
            bottom: '1%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                animation: false,
                label: {
                    backgroundColor: '#ccc',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    shadowBlur: 0,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    textStyle: {
                        color: '#222'
                    }
                }
            },
            formatter: '日期: {b}<br />订单量: {c}'
        },
        xAxis: {
        type: 'category',
        data: xData.map(function (item) {
            return item.date;
        }),
        axisLine:{
            show:false
        },
        axisLabel: {
            show:true,
            formatter: function (val) {
                return val;
            }
        },
        splitLine: {
            show:true,
            lineStyle: {
                color:'rgba(70, 77, 92, 1)',
                type: 'dashed'
            }
        },
        boundaryGap: false
    },
    yAxis: {
        type : 'value',
        axisLine:{
            show:false
        },
        splitLine: {
            lineStyle: {
                color:'rgba(70, 77, 92, 1)',
                type: 'dashed'
            }
        },
        axisLabel:{
            show:true,
            fontSize:10
        },
        splitNumber: 3
    },
        series: [{
            type: 'line',
            data: yData.map(function (item) {
                return item.num;
            }),
            hoverAnimation: false,
            showSymbol: true,
            symbol:'circle',
            symbolSize:10
        }]
    });
};

function bCharts(data) {
    var xData = [];
    var yData = [];
    for(var i in data)
    {
        var xInfo = {'date':data[i].dateStr};
        xData.push(xInfo);
        var yInfo = {'num':data[i].countAmount/100*multiple};
        yData.push(yInfo);
    }
    xData.reverse();
    yData.reverse(); 
    b.hideLoading();
    b.setOption(option = {
        backgroundColor:'#313745',
        grid: {
            top:'10%',
            left: '1%',
            bottom: '1%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                animation: false,
                label: {
                    backgroundColor: '#ccc',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    shadowBlur: 0,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    textStyle: {
                        color: '#222'
                    }
                }
            },
            formatter: '日期: {b}<br />金额: {c} 元'
        },
        xAxis: {
        type: 'category',
        data: xData.map(function (item) {
            return item.date;
        }),
         axisLine:{
            show:false
        },
        axisLabel: {
            show:true,
            formatter: function (val) {
                return val;
            }
        },
        splitLine: {
            show:true,
            lineStyle: {
                color:'rgba(70, 77, 92, 1)',
                type: 'dashed'
            }
        },
        boundaryGap: false
    },
    yAxis: {
        splitNumber: 3,
        axisLine:{
            show:false
        },
        splitLine: {
            lineStyle: {
                color:'rgba(70, 77, 92, 1)',
                type: 'dashed'
            }
        },
        axisLabel:{
            show:true,
            fontSize:10
        }
    },
        series: [{
            type: 'line',
            data: yData.map(function (item) {
                return item.num;
            }),
            hoverAnimation: false,
            showSymbol: true,
            symbol:'circle',
            symbolSize:10
        }]
    });
};

function cCharts(data) {
    var xData = [];
    var yData = [];
    for(var i in data)
    {
        var xInfo = {'date':data[i].dateStr};
        xData.push(xInfo);
        var yInfo = {'num':data[i].countElectricity*multiple};
        yData.push(yInfo);
    }
    xData.reverse();
    yData.reverse(); 
    c.hideLoading();
    c.setOption(option = {
        backgroundColor:'#313745',
        grid: {
            top:'10%',
            left: '1%',
            bottom: '1%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                animation: false,
                label: {
                    backgroundColor: '#ccc',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    shadowBlur: 0,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    textStyle: {
                        color: '#222'
                    }
                }
            },
            formatter: '日期: {b}<br />充电量: {c} (kwh)'
        },
        xAxis: {
        type: 'category',
        data: xData.map(function (item) {
            return item.date;
        }),
        axisLine:{
            show:false
        },
        axisLabel: {
            show:true,
            formatter: function (val) {
                return val;
            }
        },
        splitLine: {
            show:true,
            lineStyle: {
                color:'rgba(70, 77, 92, 1)',
                type: 'dashed'
            }
        },
        boundaryGap: false
    },
    yAxis: {
        splitNumber: 3,
        axisLine:{
            show:false
        },
        splitLine: {
            lineStyle: {
                color:'rgba(70, 77, 92, 1)',
                type: 'dashed'
            }
        },
        axisLabel:{
            show:true,
            fontSize:10
        }
    },
        series: [{
            type: 'line',
            data: yData.map(function (item) {
                return item.num;
            }),
            hoverAnimation: false,
            showSymbol: true,
            symbol:'circle',
            symbolSize:10
        }]
    });
};

function dCharts(data) {
    d.hideLoading();
    d.setOption(option = {
        backgroundColor:'#313745',
        tooltip : {
        trigger: 'item',
        formatter: "{a}: {b} <br/>数量: {c} ({d}%)"
        },
        series: [{
            name:'设备类型',
            type:'pie',
            radius : '70%',
            center: ['50%', '50%'],
            data:data.sort(function (a, b) {
                return b.value - a.value;
            }).map(function (item) {
                item.value=item.count*multiple;
                item.name=item.deviceTypeName;
                return item;
             }),
            label: {
                normal: {
                    textStyle: {
                        color: '#eee'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: '#eee'
                    },
                    smooth: 0.2,
                    length: 6,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    color: '#DD6B66',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }]
    });
};

function eCharts(data) {
    var xData = [];
    var yData = [];
    for(var i in data)
    {
        var xInfo = {'date':data[i].dateStr};
        xData.push(xInfo);
        var yInfo = {'num':data[i].count*multiple};
        yData.push(yInfo);  
    }
    //累加计算
    var sumData = [];
    for(var i =0;i< yData.length;i++){
        var sum = 0;
        for(var j = 0;j<i+1;j++)
        {
            sum += yData[j].num*1;
        }
        var sumInfo = {'num':sum};
        sumData.push(sumInfo);
    }

    e.hideLoading();
    e.setOption(option = {
        backgroundColor:'#313745',
        grid: {
            top:'10%',
            left: '1%',
            bottom: '1%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                animation: false,
                label: {
                    backgroundColor: '#ccc',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    shadowBlur: 0,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    textStyle: {
                        color: '#222'
                    }
                }
            },
            formatter: '时间: {b}<br />订单量: {c}'
        },
        xAxis: {
        type: 'category',
        data: xData.map(function (item) {
            return item.date.split(" ")[1];
        }),
        axisLine:{
            show:false
        },
        axisLabel: {
            show:true,
            formatter: function (val) {
                return val;
            }
        },
        splitLine: {
            show:true,
            lineStyle: {
                color:'rgba(70, 77, 92, 1)',
                type: 'dashed'
            }
        },
        interval:1,
        boundaryGap: false
    },
    yAxis: {
        axisLabel: {
            formatter: function (val) {
                return parseInt(val);
            },
            textStyle:{
                fontSize:8
            }

        },
        axisLine:{
            show:false
        },
        splitLine: {
            lineStyle: {
                color:'rgba(70, 77, 92, 1)',
                type: 'dashed'
            }
        },
        splitNumber: 3
        
    },
        series: [{
            type: 'line',
            data: yData.map(function (item) {
                return item.num;
            }),
            hoverAnimation: false,
            showSymbol: true,
            symbol:'circle',
            symbolSize:10
        },{
            type: 'line',
            data: sumData.map(function (item) {
                return item.num;
            }),
            hoverAnimation: false,
            showSymbol: true,
            symbol:'circle',
            symbolSize:8
            
        }]
    });
};

function fCharts(data) {
    var xData = [];
    var yData = [];
    for(var i in data)
    {
        var xInfo = {'date':data[i].dateStr.split(' ')[1]};
        xData.push(xInfo);
        var yInfo = {'num':data[i].countAmount/100*multiple};
        yData.push(yInfo);
    }
    
    //累加计算
    var sumData = [];
    for(var i =0;i< yData.length;i++){
        var sum = 0;
        for(var j = 0;j<i+1;j++)
        {
            sum += yData[j].num*1;
        }
        var sumInfo = {'num':sum};
        sumData.push(sumInfo);
    }

    f.hideLoading();
    f.setOption(option = {
        backgroundColor:'#313745',
        grid: {
            top:'10%',
            left: '1%',
            bottom: '1%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                animation: false,
                label: {
                    backgroundColor: '#ccc',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    shadowBlur: 0,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    textStyle: {
                        color: '#222'
                    }
                }
            },
            formatter: '时间: {b}<br />金额: {c} 元'
        },
        xAxis: {
        type: 'category',
        data: xData.map(function (item) {
            return item.date;
        }),
        axisLine:{
            show:false
        },
        axisLabel: {
            show:true,
            formatter: function (val) {
                return val;
            }
        },
        splitLine: {
            show:true,
            lineStyle: {
                color:'rgba(70, 77, 92, 1)',
                type: 'dashed'
            }
        },
        interval:1,
        boundaryGap: false
    },
    yAxis: { 
        axisLabel: {
            formatter: function (val) {
                return val;
            },
            textStyle:{
                fontSize:8
            }

        },
        axisLine:{
            show:false
        },
        splitLine: {
            lineStyle: {
                color:'rgba(70, 77, 92, 1)',
                type: 'dashed'
            }
        },
        splitNumber: 3
    },
        series: [{
            type: 'line',
            data: yData.map(function (item) {
                return item.num;
            }),
            hoverAnimation: false,
            symbolSize: 6,
            showSymbol: true,
            symbol:'circle',
            symbolSize:10
        },{
            type: 'line',
            data: sumData.map(function (item) {
                return item.num;
            }),
            hoverAnimation: false,
            symbolSize: 6,
            showSymbol: true,
            symbol:'circle',
            symbolSize:8
        }]
    });
};

function gCharts(data) {
    var xData = [];
    var yData = [];
    for(var i in data)
    {
        var xInfo = {'date':data[i].dateStr};
        xData.push(xInfo);
        var yInfo = {'num':data[i].countElectricity*multiple};
        yData.push(yInfo);
    }

    //累加计算
    var sumData = [];
    for(var i =0;i< yData.length;i++){
        var sum = 0;
        for(var j = 0;j<i+1;j++)
        {
            sum += yData[j].num*1;
        }
        var sumInfo = {'num':sum};
        sumData.push(sumInfo);
    }
    g.hideLoading();
    g.setOption(option = {
        backgroundColor:'#313745',
        grid: {
            top:'10%',
            left: '1%',
            bottom: '1%',
            containLabel: true
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                animation: false,
                label: {
                    backgroundColor: '#ccc',
                    borderColor: '#aaa',
                    borderWidth: 1,
                    shadowBlur: 0,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    textStyle: {
                        color: '#222'
                    }
                }
            },
            formatter: '时间: {b}<br />充电量: {c} (kwh)'
        },
        xAxis: {
        type: 'category',
        data: xData.map(function (item) {
            return item.date.split(" ")[1];
        }),
        axisLine:{
            show:false
        },
        axisLabel: {
            show:true,
            formatter: function (val) {
                return val;
            }
        },
        splitLine: {
            show:true,
            lineStyle: {
                color:'rgba(70, 77, 92, 1)',
                type: 'dashed'
            }
        },
        interval:1,
        boundaryGap: false
    },
    yAxis: {
        axisLabel: {
            formatter: function (val) {
                return val;
            },
            textStyle:{
                fontSize:8
            }

        },
        axisLine:{
            show:false
        },
        splitLine: {
            lineStyle: {
                color:'rgba(70, 77, 92, 1)',
                type: 'dashed'
            }
        },
        splitNumber: 3
    },
        series: [{
            type: 'line',
            data: yData.map(function (item) {
                return item.num;
            }),
            hoverAnimation: false,
            showSymbol: true,
            symbol:'circle',
            symbolSize:10
        },{
            type: 'line',
            data: sumData.map(function (item) {
                return item.num;
            }),
            hoverAnimation: false,
            showSymbol: true,
            symbol:'circle',
            symbolSize:8
        }]
    });
};

function hCharts(data) {
    h.hideLoading();
    h.setOption(option = {
        backgroundColor:'#313745',
        tooltip : {
        trigger: 'item',
        formatter: "{a}: {b} <br/>数量: {c} ({d}%)"
        },
        series: [{
            name:'设备类型',
            type:'pie',
            radius : '70%',
            center: ['50%', '50%'],
            data:data.map(function (item) {
                item.value=item.count*multiple;
                item.name=item.deviceTypeName;
            return item;
             }),
            label: {
                normal: {
                    textStyle: {
                        color: '#eee'
                    }
                }
            },
            labelLine: {
                normal: {
                    lineStyle: {
                        color: '#eee'
                    },
                    smooth: 0.2,
                    length: 6,
                    length2: 20
                }
            },
            itemStyle: {
                normal: {
                    color: '#DD6B66',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            },
            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200;
            }
        }]
    });
};

function delRule(ele){
 
}

function delInfo(){

}

function getMsg(data){
   
}

function getMapData(){
  
}

function getMqtt(data){
    delInfo();
    var host = data.ip;
    var port = data.port;
    var topic = data.topic;
    client = mqtt.connect('ws://' + host + ':' + port+ '/mqtt');
    client.on('connect', function () {
            console.log('连接成功')
    });
    client.on("error", function (error) {
            console.log(error.toString());
    });
    client.subscribe(topic);
    client.on("message", function (topic, payload) {
            var data = payload.toString();
            getMsg(data);
    });
}
function getMqttData(){
 
}

function getNowDate(){
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = nowDate.getMonth()+1<10?"0"+(nowDate.getMonth()+1):nowDate.getMonth()+1;
    var day = nowDate.getDate()<10?"0"+nowDate.getDate():nowDate.getDate();
    return  year+"-"+month+"-"+day;
}
function getData(toUrl,toData){
    
}

function getDateType(type,ele,num){

}

function getTwoDate(type,date,fn,url){
    
     $.when(getData(url,toData)).done(function(data){
        var reData = data;
        if(reData.code==0)
        {
            fn(reData.data);
        }
    });
}

function getThreeDate(type,date,url){
  
}

function dateChange(num){
    switch(num){
       
    }
    getDateType(type,ele,num);
}

function starChange(num){
    
}

function getDataTime(){

}

$(document).ready(function(e){

//地图
getMapData();
//表 左边
dateChange(1);
dateChange(2);
dateChange(3);
dateChange(4);

//表 右边
starChange(5);
starChange(6);
starChange(7);
starChange(8);

//获取推送信息
getMqttData();

//定时
getDataTime();

//四个总量
getSumBalance();
getSumElectricity();
countDevice();
countOrder();
});
