Highcharts.chart('container', {

    yAxis: {
        title: {
            text: 'TEMPERATURE'
        }
    },

    xAxis: {
        accessibility: {
            rangeDescription: 'Range: 00 to 24'
        }
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    credits: {
        enabled: false
    },
    
    exporting:{
        enabled: false

    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 0o0
        }
    },

    series: [{
        name: 'Temperature',
        data:[40,45,40.3,44,46,47,43.6,45,42.2,45,44,44,45,46,47,43,42,44,45,43,42,45,46,45,43]
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});
