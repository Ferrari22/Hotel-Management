import React from 'react';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Button from 'antd/lib/button';

var ReportForm = React.createClass({

    getInitialState() {
        return {
            data: 0,
        };
    },

    componentDidUpdate() {
        this.showChart()
    },

    componentWillMount() {
        $.get("/financedata", function (data, status) {
            if (status == 'success') {
                this.setState({
                    data: Number(data),
                });
            }
        }.bind(this));
    },

    showChart: function () {
        var myChart = echarts.init(document.getElementById('main'));

        var option = {
            title: {
                text: '月收入统计'
            },
            color: ['#FF7F50'],
            tooltip: {
                trigger: 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '月收入额',
                    type: 'bar',
                    barWidth: '50%',
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1480.0, this.state.data]
                }
            ]
        };
        myChart.setOption(option);
    },

    render: function () {
        return (
            <div>
                <Row>
                    <Col >
                        <div id="main" style={{ width: 700, height: 500 }}></div>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </div>
        )
    }
});

export default ReportForm;