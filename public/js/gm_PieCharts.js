function getpie(departname, usage_array){
    var departPercent = new Array();
    for(let i = 0; i < departname.length; i++){
        departPercent.push({
                name: departname[i],
                y: usage_array[i]
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
                        text: 'Bar chart of weekly usage of different departments'
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
                        data: departPercent
                        }]
            });
}
