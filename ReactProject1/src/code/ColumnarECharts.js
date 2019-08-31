//柱状图
import React,{Component} from 'react';
import {message} from 'antd';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import * as constant from "../constants";
import './ColumnarECharts.css';


class ColumnarECharts extends Component{
    componentDidMount() {
        fetch(`${constant.server}/get_columnar_data/`, constant.POSTHeader())
            .then(response => {
                return response.json();
            }).then(json => {
            if (json.status == 200) {
                let Xlist = [];
                let Ylist = [];
                for(var key in json.result){
                    Xlist.push(key)
                    Ylist.push(json.result[key])
                }
                this.func(Xlist,Ylist)

            } else {
                message.success("获取柱状图数据失败！");
            }
        }).catch(err => {
            console.log(err)
        });
    }
    func=(Xlist,Ylist)=>{
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));
        // 绘制图表
        myChart.setOption({
            title: { text: '豆瓣 书评' },
            tooltip: {},
            xAxis: {
                data: Xlist
            },
            yAxis: {},
            series: [{
                name: '评分',
                type: 'bar',
                data: Ylist
            }]
        });
    }
    render() {
        return (
            <div id="main" className="body"></div>
        );
    }

}

export default ColumnarECharts;