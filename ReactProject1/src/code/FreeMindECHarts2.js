import React, {Component} from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/tree';
import $ from  'jquery'

class FreeMindECHarts2 extends Component{
    componentDidMount(){
        var myChart = echarts.init(document.getElementById('freemindcharts2'));
        myChart.showLoading();
        $.get('data/asset/data/flare.json', function (data) {
            let option = null;
            myChart.hideLoading();
            echarts.util.each(data.children, function (datum, index) {
                index % 2 === 0 && (datum.collapsed = true);
            });
            myChart.setOption(option = {
                tooltip: {
                    trigger: 'item',
                    triggerOn: 'mousemove'
                },
                series: [
                    {
                        type: 'tree',

                        data: [data],

                        top: '1%',
                        left: '7%',
                        bottom: '1%',
                        right: '20%',

                        symbolSize: 7,

                        label: {
                            normal: {
                                position: 'left',
                                verticalAlign: 'middle',
                                align: 'right',
                                fontSize: 9
                            }
                        },

                        leaves: {
                            label: {
                                normal: {
                                    position: 'right',
                                    verticalAlign: 'middle',
                                    align: 'left'
                                }
                            }
                        },

                        expandAndCollapse: true,
                        animationDuration: 550,
                        animationDurationUpdate: 750
                    }
                ]
            });
        })
    }
    render() {
        return (
            <div id="freemindcharts2" style={{width: 600, height: 600}}></div>
        );
    }
}
export default FreeMindECHarts2