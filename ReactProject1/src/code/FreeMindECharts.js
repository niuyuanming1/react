import React, {Component} from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
import  'echarts/lib/chart/tree';

class FreeMindECharts extends Component {
    componentDidMount() {
        var myChart = echarts.init(document.getElementById('freemindcharts'));
        let option = null;
        myChart.showLoading();
        var data1 = {
            "name": "面向对象",
            "children": [
                {
                    "name": "三大特征",
                    "children": [
                        {
                            "name": "封装",
                            "children": [
                                {"name": "设计原则",
                                    "children":[
                                        {"name": "分而治之", "value": 721},
                                        {"name": "封装变化", "value": 721},
                                        {"name": "高内聚", "value": 721},
                                        {"name": "低耦合", "value": 721},
                                    ]
                                },
                                {"name": "数据", "value": 721},
                                {"name": "行为", "value": 4294},
                            ]
                        },
                        {
                            "name": "继承",
                             "children":[
                                        {"name": "抽象，统一概念，隔离变化", "value": 3333},
                                    ]
                        },
                        {
                            "name": "多态",
                            "children":[
                                        {"name": "方法名相同，效果不同", "value": 3333},
                                    ]
                        }
                    ]
                },
                {
                    "name": "六大原则",
                    "children": [
                        {"name": "开闭原则",
                         "children":[
                                        {"name": "对扩展开放，对修改关闭", "value": 3333},
                                    ]},
                        {"name": "类的单一职责",
                         "children":[
                                        {"name": "需求的变化只改变一个类", "value": 3333},
                                    ]},
                        {"name": "依赖倒置",
                         "children":[
                                        {"name": "调用父类不调子类", "value": 3333},
                                    ]},
                        {"name": "组合复用",
                         "children":[
                                        {"name": "复用的最佳实现", "value": 3333},
                                    ]},
                        {"name": "里氏替换",
                         "children":[
                                        {"name": "扩展重写不改变原有功能", "value": 3333},
                                    ]},
                        {"name": "迪米特法则",
                         "children":[
                                        {"name": "类与类之间少交互", "value": 3333},
                                    ]}
                    ]
                },
                {
                    "name": "类的基本概念",
                    "children": [
                        {"name": "实例成员",
                            "children":[
                                        {"name": "实例变量", "value": 3333},
                                        {"name": "实例方法", "value": 3333},
                                    ]},
                        {"name": "类成员",
                            "children":[
                                        {"name": "类变量", "value": 3333},
                                        {"name": "类方法", "value": 3333},
                                    ]},
                        {"name": "静态方法", "value": 3333},
                    ]
                },
                {
                    "name": "类与类的关系",
                    "children": [
                        {"name": "泛化（继承）", "value": 1616},
                        {"name": "关联（聚合/组合）", "value": 1027},
                        {"name": "依赖", "value": 3891},
                    ]
                }

            ]
        };

        myChart.hideLoading();
        myChart.setOption(option = {
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            legend: {
                top: '2%',
                left: '3%',
                orient: 'vertical',
                data: [{
                    name: 'tree1',
                    icon: 'rectangle'
                },
                    {
                        name: 'tree2',
                        icon: 'rectangle'
                    }],
                borderColor: '#c23531'
            },
            series: [
                {
                    type: 'tree',
                    name: 'tree1',
                    data: [data1],
                    top: '10%',
                    left: '7%',
                    bottom: '2%',
                    right: '20%',
                    symbolSize: 7,
                    label: {
                        normal: {
                            position: 'left',
                            verticalAlign: 'middle',
                            align: 'right'
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
        })
    }

    render() {
        return (
            <div id="freemindcharts" style={{width: 600, height: 600}}></div>
        );
    }
}

export default FreeMindECharts;