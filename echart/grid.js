function createData(num){
    let dataUnit = [["o_time","m_time","num"]],
        data = [];
    for(let i = 0;i < num;i++){
        data = timeComplexTest(PriorityQueue,"enqueue_o","enqueue_m",10000);
        data.push(i)
        dataUnit.push(data);
    }
    return dataUnit;
}
var myChart = echarts.init(document.getElementById('grid'));

        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '算法耗时对比'
            },
            tooltip: {
                formatter(p){
                    return  p.seriesName + "<br>"+ p.value[p.seriesIndex];
                }
            },
            legend: {
            },
            dataset:{
                source:[]
            },
            xAxis: {
            },
            yAxis: {},
            series: [
                {
                    name: 'other',
                    type: 'line',
                    encode:{
                        x:"num",
                        y:"o_time"
                    }
                },
                {
                    name: 'my',
                    type: 'line',
                    encode:{
                        x:"num",
                        y:"m_time"
                    }
                }
        ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

class VisualData{

    constructor(domObj){

        this.box = domObj;

    }
    organizeData(){
        
    }

}