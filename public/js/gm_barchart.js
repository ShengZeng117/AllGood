function barcharts(departname, usage_array){
    chart = Highcharts.chart('fst',{
        chart: {
            type: 'column'
        },
        title: {
            text: 'Bar chart of weekly usage of different departments'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: departname,
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
            '<td style="padding:0"><b>{point.y:.1f} kWh</b></td></tr>',
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
            data: usage_array
        }]
    });
}