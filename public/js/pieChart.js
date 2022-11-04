function getpie(percent_array){
    console.log(percent_array);
    var title = ['Monday','Tuesday ','Wednesday','Thursday','Friday','Saturday','Sunday'];
    var dailyPercent = new Array();
    for(let i = 0; i < percent_array.length; i++){
        dailyPercent.push({
            name: title[i],
            y: percent_array[i]
        });
    }
        Highcharts.chart('sec', {
                chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie'
                },
                title: {
                        text: 'Pie chart of usage in a week'
                },
                tooltip: {
                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                        pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                        enabled: false
                                },
                                showInLegend: true
                        }
                },
                series: [{
                        name: 'Ratio',
                        colorByPoint: true,
                        data: dailyPercent
                        }]
            });
}

