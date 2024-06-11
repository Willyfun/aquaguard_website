const gaugeOptions = {
    chart: {
        type: 'solidgauge'
    },

    title: null,

    pane: {
        center: ['50%', '85%'],
        size: '140%',
        startAngle: -90,
        endAngle: 90,
        background: {
            backgroundColor:
                Highcharts.defaultOptions.legend.backgroundColor || '#fafafa',
            borderRadius: 5,
            innerRadius: '60%',
            outerRadius: '100%',
            shape: 'arc'
        }
    },

    exporting: {
        enabled: false
    },

    tooltip: {
        enabled: false
    },

    // the value axis
    yAxis: {
        stops: [
            [0.1, '#55BF3B'], // green
            [0.5, '#DDDF0D'], // yellow
            [0.9, '#DF5353'] // red
        ],
        lineWidth: 0,
        tickWidth: 0,
        minorTickInterval: null,
        tickAmount: 2,
        title: {
            y: -70
        },
        labels: {
            y: 16
        }
    },

    plotOptions: {
        solidgauge: {
            borderRadius: 3,
            dataLabels: {
                y: 5,
                borderWidth: 0,
                useHTML: true
            }
        }
    }
};

const chartTemp = Highcharts.chart(
    'container-temperature', Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 100,
        },

        credits: {
            enabled: false
        },

        series: [{
            name: 'Temperature',
            data: [40],
            dataLabels: {
                format:
                '<div style="text-align:center">' +
                '<span style="font-size:25px">{y}</span><br/>' +
                '<span style="font-size:12px;opacity:0.4">&#8451;</span>' +
                '</div>'
            },
            tooltip: {
                valueSuffix: '°C'
            }
        }]

    })
);

const chartTurbidity = Highcharts.chart(
    'container-turbidity', Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 1000,
        },
        
        credits: {
            enabled: false
        },
        
        series: [{
            name: 'Temperature',
            data: [0.5],
            dataLabels: {
                format:
                '<div style="text-align:center">' +
                '<span style="font-size:25px">{y}</span><br/>' +
                '<span style="font-size:12px;opacity:0.4">NTUs</span>' +
                '</div>'
            },
            tooltip: {
                valueSuffix: 'NTUs'
            }
        }]
        
    })
);
        
const chartPH = Highcharts.chart(
    'container-ph', Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 14,
        },
        
        credits: {
            enabled: false
        },
        
        series: [{
            name: 'Temperature',
            data: [7],
            dataLabels: {
                format:
                '<div style="text-align:center">' +
                '<span style="font-size:25px">{y}</span><br/>' +
                '<span style="font-size:12px;opacity:0.4"></span>' +
                '</div>'
            },
        }]
        
    })
);   

