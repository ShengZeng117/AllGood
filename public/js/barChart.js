var chart = Highcharts.chart('fst',{
    chart: {
        type: 'column'
    },
    title: {
        text: 'Bar char of daliy usage in a week'
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        categories: [
            'Monday','Tuesday ','Wednesday','Thursday','Friday','Saturday','Sunday'
        ],
        crosshair: true
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Usage(Kwh)'
        }
    },
    tooltip: {
        // head + 每个 point + footer 拼接成完整的 table
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            borderWidth: 0
        }
    },
    series: [{
        name: 'Electricity',
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6]
    }]
});