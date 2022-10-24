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
            data: [{
                    name: 'Electricity',
                    y: 55,
                    sliced: true,
                    selected: true
            }, {
                    name: 'Water',
                    y: 45
            }, {
                    name: 'Natural Gase',
                    y: 30
            }, {
                    name: 'Hydrogen',
                    y: 4.18
            }, {
                name: 'Other',
						y: 7.05
				}]
		}]
});