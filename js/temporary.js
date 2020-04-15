let createBarModalChart = (json, chartOptions) => {
    //Function to create the labels
    let labels = json.map(function(e) {
        return e.date;
    });


    //Function to create the data
    let data = json.map(function(e) {
        return e.value;
    });

    let options = {
        plotOptions: {
            bar: {
                horizontal: false,
                endingShape: "rounded",
            },
        },
        chart: {
            width: "100%",
            height: "100%",
            type: "bar",
            background: chartOptions.background,
            toolbar: {
                show: true,
                offsetX: -20,
                offsetY: 20,
                tools: {
                    download: `
                    <div>
                    <span><i class="fas fa-download fa-2x ${chartOptions.class}"></i>
                        </div>`,
                    selection: true,
                    zoom: false,
                    zoomin: `      <div>
                    <span><i class="fas fa-search-plus fa-2x ${chartOptions.class}"></i>
                        </div>`,
                    zoomout:  `      <div>
                    <span><i class="fas fa-search-minus fa-2x ${chartOptions.class}"></i>
                        </div>`,
                    pan:  `      <div>
                    <span><i class="fas fa-hand-paper fa-2x ${chartOptions.class}"></i>
                        </div>`,
                    reset: `
                    <div>
                    <span><i class="fas fa-home fa-2x ${chartOptions.class}"></i>
                        </div>`
                },
            },
            zoom: {
                enabled: true
            }
        },
        series: [{
            name: chartOptions.name,
            data: data,
        }, ],
        fill: {
            colors: chartOptions.barColor,
            opacity: 1,
            type: "solid",
        },
        dataLabels: {
            enabled: false,
        },
        grid: {
            show: true,
            borderColor: '#90A4AE',
            strokeDashArray: 0,
            position: 'back',
            xaxis: {
                lines: {
                    show: false
                }
            },   
            yaxis: {
                lines: {
                    show: true
                }
            },  
            row: {
                colors: undefined,
                opacity: 0.5
            },  
            column: {
                colors: undefined,
                opacity: 0.5
            },  
            padding: {
                top: 30,
                right: 20,
                bottom: 0,
                left: 20,
            },
        },
        xaxis: {
            type: "category",
            categories: labels,
            labels: {
                show: true,
                rotate: -45,
                rotateAlways: true,
                hideOverlappingLabels: true,
                showDuplicates: false,
                trim: false,
                minHeight: undefined,
                maxHeight: 120,
                style: {
                    colors: '#FFFFFF',
                    fontSize: '16px',
                    fontFamily: 'Open Sans',
                    fontWeight: 400,
                },
            },
            axisBorder: {
                show: true,
            },
            axisTicks: {
                show: true,
            },
            crosshairs: {
                show: true,
            },
            tooltip: {
                enabled: false,
            },
            tickPlacement: 'on'
        },
        yaxis: {
            show: true,
            showAlways: true,
            showForNullSeries: true,
            seriesName: undefined,
            opposite: false,
            reversed: false,
            logarithmic: false,
            forceNiceScale: false,
            floating: false,
            decimalsInFloat: undefined,
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: true,
                offsetX: 0,
                offsetY: 0,
            },
            crosshairs: {
                show: true,
            },
            tooltip: {
                enabled: false,
            },
            labels: {
                show: true,
                align: 'right',
                minWidth: 0,
                maxWidth: 160,
                style: {
                    colors: '#FFFFFF',
                    fontSize: '16px',
                    fontFamily: 'Open Sans',
                    fontWeight: 400,
                },
                offsetX: 20,
                offsetY: 0,
            },
            title: {
                text: chartOptions.yaxisTitle,
                offsetX: -20,
                offsetY: 0,
                style: {
                    color: '#FFFFFF',
                    fontSize: '18px',
                    fontFamily: 'Open Sans',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-title',
                },
            },
        },
        tooltip: {
            enabled: true,
            enabledOnSeries: undefined,
            shared: false,
            followCursor: true,
            intersect: false,
            inverseOrder: false,
            custom: undefined,
            fillSeriesColor: false,
            theme: 'dark',
            style: {
                fontSize: "12px",
                fontFamily: "Open Sans",
            },
            onDatasetHover: {
                highlightDataSeries: true,
            },
            x: {
                show: true,
                format: "MM",
            },
            y: {
                formatter: undefined,
                title: {
                    formatter: (seriesName) => seriesName,
                },
            },
            z: {
                formatter: undefined,
                title: "Size: ",
            },
            marker: {
                show: false,
            },
            fixed: {
                enabled: false,
                position: "topLeft",
                offsetX: 0,
                offsetY: 0,
            },
        },
        title: {
            text: chartOptions.title,
            align: "left",
            margin: 10,
            offsetX: 20,
            offsetY: 20,
            floating: false,
            style: {
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: "Open Sans",
                color: "#ffffff ",
            },
        },
        theme: {
            mode: 'light',
            palette: 'palette10',
        }
    };

    var chart = new ApexCharts(
        document.getElementById(chartOptions.div),
        options
    );

    chart.render();

    return chart
}