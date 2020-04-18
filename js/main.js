//Global Variables

let mymap;
let casesLegend;
let deathsLegend;
let geojsonLayer;
let casesBarModalChart;
let deathsBarModalChart;
let casesLineModalChart;
let deathsLineModalChart;
let casesDeathsBarModalChart;
let visualType = "Cases";
let visualPieType = "Cases";
let currentdate = "April 17, 2020";
let casesMax = 7383;
let deathsMax = 546;

document.addEventListener("DOMContentLoaded", function(event) {


    themeColors = {
        cases: '#27DBC3',
        deaths: '#FF715B',
        female: '#A8F9FF',
        male: '#E06292',
        deaths_css: 'rgba(74, 25, 66, 1)',
        cases_css: 'rgba(44, 44, 84, 1)',
        color2a: 'rgba(74, 25, 66, 0.5)',
        color3a: 'rgba(44, 44, 84, 0.5)',
    }

    casesAlternate = {
        cases1: '#E91E63'
    }

    let casesDailyBarChartOptions = {
        div: 'casesDailyBarChart',
        barColor: themeColors.cases,
        title: 'Daily Cases',
        name: 'Cases'
    }

    let deathsDailyBarChartOptions = {
        div: 'deathsDailyBarChart',
        barColor: themeColors.deaths,
        title: 'Daily Deaths',
        name: 'Deaths'
    }

    let createBarChart = (json, chartOptions) => {
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
                sparkline: {
                    enabled: true
                },
                toolbar: {
                    show: false,
                },
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
                show: false,
                padding: {
                    top: 10,
                    right: 25,
                    bottom: 10,
                    left: 25,
                },
            },
            xaxis: {
                type: "category",
                categories: labels,
                labels: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                crosshairs: {
                    show: true,
                },
            },
            yaxis: {
                show: false,
                axisTicks: {
                    show: false,
                },
                crosshairs: {
                    show: false,
                },
                tooltip: {
                    enabled: false,
                },
            },
            tooltip: {
                enabled: true,
                enabledOnSeries: undefined,
                shared: true,
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
                    enabled: true,
                    position: "topLeft",
                    offsetX: 0,
                    offsetY: 50,
                },
            },
            title: {
                text: chartOptions.title,
                align: "center",
                margin: 10,
                offsetX: 0,
                offsetY: 0,
                floating: false,
                style: {
                    fontSize: "20px",
                    fontWeight: "bold",
                    fontFamily: "Open Sans",
                    color: "#FFFFFF",
                },
            },
            theme: {
                // mode: 'dark',
                palette: 'palette10',
            }
        };

        var chart = new ApexCharts(
            document.getElementById(chartOptions.div),
            options
        );

        chart.render();
    };

    let casesDailyModalBarChartOptions = {
        div: 'casesDailyModalBarChart',
        barColor: themeColors.cases,
        title: 'Daily Cases',
        background: themeColors.deaths_css,
        name: 'Cases',
        yaxisTitle: 'Cases',
        class: 'cases-download'
    }

    let deathsDailyModalBarChartOptions = {
        div: 'deathsDailyModalBarChart',
        barColor: themeColors.deaths,
        title: 'Daily Deaths',
        background: themeColors.cases_css,
        name: 'Deaths',
        yaxisTitle: 'Deaths',
        class: 'deaths-download'
    }

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
                        zoomin: false,
                        zoomout: false,
                        pan: false,
                        reset: false
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
                        fontSize: '14px',
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


    let casesDailyLineChartOptions = {
        div: 'casesDailyLineChart',
        barColor: themeColors.cases,
        title: 'Total Cases',
        name: 'Cases'
    }

    let deathsDailyLineChartOptions = {
        div: 'deathsDailyLineChart',
        barColor: themeColors.deaths,
        title: 'Total Deaths',
        name: 'Deaths'
    }

    let createLineChart = (json, chartOptions) => {
        //Function to create the labels
        let labels = json.map(function(e) {
            return e.date;
        });

        //Function to create the data
        let data = json.map(function(e) {
            return e.value;
        });


        let options = {
            chart: {
                width: "100%",
                height: "100%",
                type: "area",
                toolbar: {
                    show: false,
                },
            },
            fill: {
                opacity: [0.25],
                gradient: {
                    inverseColors: false,
                    shade: 'light',
                    type: "vertical",
                    opacityFrom: 0.85,
                    opacityTo: 0.25,
                }
            },
            markers: {
                size: 0,
            },
            series: [{
                name: chartOptions.name,
                data: data,
            }, ],
            colors: [chartOptions.barColor],
            stroke: {
                width: 5
            },
            dropShadow: {
                enabled: false,
                top: 0,
                left: 0,
                blur: 3,
                opacity: 0.5
            },
            dataLabels: {
                enabled: false,
            },
            grid: {
                show: false,
                padding: {
                    top: 10,
                    right: 25,
                    bottom: 10,
                    left: 25,
                },
            },
            xaxis: {
                type: "category",
                categories: labels,
                labels: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                crosshairs: {
                    show: true,
                },
                tooltip: {
                    enabled: false,
                }
            },
            yaxis: {
                show: false,
                axisTicks: {
                    show: false,
                },
                crosshairs: {
                    show: false,
                },
                tooltip: {
                    enabled: false,
                },
            },
            tooltip: {
                enabled: true,
                enabledOnSeries: undefined,
                shared: false,
                followCursor: false,
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
                    enabled: true,
                    position: "topLeft",
                    offsetX: 0,
                    offsetY: 50,
                },
            },
            title: {
                text: chartOptions.title,
                align: "center",
                margin: 10,
                offsetX: 0,
                offsetY: 0,
                floating: false,
                style: {
                    fontSize: "20px",
                    fontWeight: "bold",
                    fontFamily: "Open Sans",
                    color: "#FFFFFF",
                },
            },
        };

        var chart = new ApexCharts(
            document.getElementById(chartOptions.div),
            options
        );

        chart.render();
    }


    let casesDailyModalLineChartOptions = {
        div: 'casesModalLineChart',
        barColor: [themeColors.cases, '#FFF275'],
        background: themeColors.deaths_css,
        title: 'Total Cases',
        nameLine: 'Cases Total',
        nameBar: 'Cases Daily',
        yaxisTitle: 'Cases',
        class: 'cases-download'
    }

    let deathsDailyModalLineChartOptions = {
        div: 'deathsModalLineChart',
        barColor: [themeColors.deaths, '#9D8DF1'],
        background: themeColors.cases_css,
        title: 'Total Deaths',
        nameLine: 'Deaths Total',
        nameBar: 'Deaths Daily',
        yaxisTitle: 'Deaths',
        class: 'deaths-download'
    }

    let createLineModalChart = (jsonLine, jsonBar, chartOptions) => {
        //Function to create the labels
        let labels = jsonLine.map(function(e) {
            return e.date;
        });

        //Function to create the data
        let dataLine = jsonLine.map(function(e) {
            return e.value;
        });

        let dataBar = jsonBar.map(function(e) {
            return e.value;
        });


        let options = {
            chart: {
                width: "100%",
                height: "100%",
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
                        selection: false,
                        zoom: false,
                        zoomin: false,
                        zoomout: false,
                        pan: false,
                        reset: false
                    },
                },
                zoom: {
                    enabled: true
                }
            },
            fill: {
                opacity: [0.25, 1],
                gradient: {
                    inverseColors: false,
                    shade: 'light',
                    type: "vertical",
                    opacityFrom: 0.85,
                    opacityTo: 0.10,
                }
            },
            markers: {
                size: 0,
            },
            series: [{
                name: chartOptions.nameLine,
                type: 'area',
                data: dataLine,
            }, {
                name: chartOptions.nameBar,
                type: 'column',
                data: dataBar,
            }],
            colors: chartOptions.barColor,
            stroke: {
                width: [5, 1]
            },
            dropShadow: {
                enabled: false,
                top: 0,
                left: 0,
                blur: 3,
                opacity: 0.5
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
                        fontSize: '14px',
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
                }
            },
            yaxis: {
                show: true,
                axisBorder: {
                    show: true,
                },
                axisTicks: {
                    show: true,
                },
                crosshairs: {
                    show: false,
                },
                labels: {
                    show: true,
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
                tooltip: {
                    enabled: false,
                },
            },
            tooltip: {
                enabled: true,
                enabledOnSeries: undefined,
                shared: true,
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
                    offsetY: 50,
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

            legend: {
                show: true,
                showForSingleSeries: false,
                showForNullSeries: true,
                showForZeroSeries: true,
                position: 'bottom',
                horizontalAlign: 'center',
                floating: false,
                fontSize: '14px',
                fontFamily: 'Open Sans',
                fontWeight: 400,
                formatter: undefined,
                inverseOrder: false,
                width: undefined,
                height: undefined,
                tooltipHoverFormatter: undefined,
                offsetX: 0,
                offsetY: 0,
                labels: {
                    colors: ['#ffffff'],
                    useSeriesColors: false
                },
                markers: {
                    width: 12,
                    height: 12,
                    strokeWidth: 0,
                    strokeColor: '#fff',
                    fillColors: undefined,
                    radius: 12,
                    customHTML: undefined,
                    onClick: undefined,
                    offsetX: 0,
                    offsetY: 0
                },
                itemMargin: {
                    horizontal: 5,
                    vertical: 1
                },
                onItemClick: {
                    toggleDataSeries: true
                },
                onItemHover: {
                    highlightDataSeries: true
                },
            },
        };

        var chart = new ApexCharts(
            document.getElementById(chartOptions.div),
            options
        );

        chart.render();

        return chart
    }

    createBarChart(state_cases_daily_breakdown, casesDailyBarChartOptions);

    createBarChart(state_deaths_daily_breakdown, deathsDailyBarChartOptions);

    createLineChart(state_cases_daily, casesDailyLineChartOptions);

    createLineChart(state_deaths_daily, deathsDailyLineChartOptions);


    // Modal Behavior

    let casesBarModalBtn = document.getElementById("casesBarModalBtn");
    let casesBarModal = document.getElementById("casesBarModal")
    let deathsBarModalBtn = document.getElementById("deathsBarModalBtn");
    let deathsBarModal = document.getElementById("deathsBarModal")
    let casesLineModalBtn = document.getElementById("casesLineModalBtn");
    let casesLineModal = document.getElementById("casesLineModal")
    let deathsLineModalBtn = document.getElementById("deathsLineModalBtn")
    let deathsLineModal = document.getElementById("deathsLineModal")
    let casesdeathsBarModalBtn = document.getElementById("casesdeathsBarModalBtn")
    let casesdeathsBarModal = document.getElementById("casesdeathsBarModal")
    let closeCasesBarModal = document.querySelector(".casesBar")
    let closeDeathsBarModal = document.querySelector(".deathsBar")
    let closeCasesLineModal = document.querySelector(".casesLine")
    let closeDeathsLineModal = document.querySelector(".deathsLine")
    let closeCasesDeathsBarModal = document.querySelector(".casesdeathsBar")



    casesBarModalBtn.addEventListener("click", function(event) {
        casesBarModal.style.display = 'block'
        casesBarModalChart = createBarModalChart(
            state_cases_daily_breakdown,
            casesDailyModalBarChartOptions
        );
    });

    deathsBarModalBtn.addEventListener("click", function(event) {
        deathsBarModal.style.display = 'block'
        deathsBarModalChart = createBarModalChart(
            state_deaths_daily_breakdown,
            deathsDailyModalBarChartOptions
        );
    })

    casesLineModalBtn.addEventListener("click", function(event) {
        casesLineModal.style.display = 'block'
        casesLindModalChart = createLineModalChart(
            state_cases_daily,
            state_cases_daily_breakdown,
            casesDailyModalLineChartOptions
        )
    })

    deathsLineModalBtn.addEventListener("click", function(event) {
        deathsLineModal.style.display = 'block'
        deathsLindModalChart = createLineModalChart(
            state_deaths_daily,
            state_deaths_daily_breakdown,
            deathsDailyModalLineChartOptions
        )
    })

    closeCasesBarModal.addEventListener("click", function(event) {
        casesBarModal.style.display = 'none';
        casesBarModalChart.destroy();
    })

    closeDeathsBarModal.addEventListener("click", function(event) {
        deathsBarModal.style.display = 'none';
        deathsBarModalChart.destroy();
    })

    closeCasesLineModal.addEventListener("click", function(event) {
        casesLineModal.style.display = 'none'
        casesLindModalChart.destroy();
    })

    closeDeathsLineModal.addEventListener("click", function(event) {
        deathsLineModal.style.display = 'none'
        deathsLindModalChart.destroy();
    })

    //Pie Chart - Second Row
    let pieOptions = {
        chart: {
            type: 'pie',
            width: "100%",
            height: "100%",
            toolbar: {
                show: false,
                tools: {
                    download: true,
                    selection: true,
                    zoom: true,
                    zoomin: true,
                    zoomout: true,
                    pan: true,
                    reset: true
                },
            },
        },
        series: [45, 54, 1],
        labels: ['Male', 'Female', 'Unknown'],
        colors: [themeColors.female, themeColors.male, '#FFF275'],
        dataLabels: {
            enabled: true,
            formatter: function(val) {
                let value = Math.floor(val)
                return `${value}%`
            },
            style: {
                fontSize: '16px',
                fontFamily: 'Open Sans',
                fontWeight: 'bold',
                colors: ['#ffffff']
            },
        },
        title: {
            text: 'Cases by Sex',
            align: "center",
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: "Open Sans",
                color: "#ffffff",
            },
        },
        tooltip: {
            enabled: true,
            theme: 'light',
            y: {
                formatter: function(val) {
                    let value = Math.floor(val)
                    return `${value}%`
                },
            },
        },

        legend: {
            show: true,
            showForSingleSeries: false,
            showForNullSeries: true,
            showForZeroSeries: true,
            position: 'bottom',
            horizontalAlign: 'left',
            floating: false,
            fontSize: '14px',
            fontFamily: 'Open Sans',
            fontWeight: 400,
            formatter: undefined,
            inverseOrder: false,
            width: undefined,
            height: undefined,
            tooltipHoverFormatter: undefined,
            offsetX: 0,
            offsetY: 0,
            labels: {
                colors: ['#ffffff'],
                useSeriesColors: false
            },
            markers: {
                width: 12,
                height: 12,
                strokeWidth: 0,
                strokeColor: '#fff',
                fillColors: undefined,
                radius: 12,
                customHTML: undefined,
                onClick: undefined,
                offsetX: 0,
                offsetY: 0
            },
            itemMargin: {
                horizontal: 5,
                vertical: 1
            },
            onItemClick: {
                toggleDataSeries: true
            },
            onItemHover: {
                highlightDataSeries: true
            },
        },
        stroke: {
            show: false,
        }

    }

    let chartPie = new ApexCharts(document.getElementById("pieChart"), pieOptions);

    chartPie.render();


    const checkboxPie = document.getElementById("fs-pie");

    checkboxPie.addEventListener("change", (event) => {



        if (event.target.checked) {
            let mapTag = document.getElementById('pieChartContainer')
            visualType = "Cases";
            mapTag.style.backgroundColor = themeColors.deaths_css

            function reset() {
                chartPie.w.globals.initialConfig.title.text = 'Cases by Sex'
                return pieOptions.series
            }

            chartPie.updateSeries(reset())

        } else {

            let mapTag = document.getElementById('pieChartContainer')
            visualType = "Deaths";
            mapTag.style.backgroundColor = themeColors.cases_css

            function appendData() {
                chartPie.w.globals.initialConfig.title.text = 'Deaths by Sex'
                var arr = chartPie.w.globals.series.slice()
                arr = [54, 44, 2]
                return arr;
            }

            chartPie.updateSeries(appendData())
        }
    });


    //Stacked Comparison Chart - Thrid Row
    let stackedChartoptions = {
        series: [{
            name: '% of Cases',
            data: [1, 9, 13, 16, 20, 18, 13, 10]
        }, {
            name: '% of Deaths',
            data: [0, 1, 1, 4, 10, 19, 27, 37]
        }],

        chart: {
            type: 'bar',
            height: '100%',
            width: '100%',
            toolbar: {
                show: false,
            },
        },
        colors: [themeColors.cases, themeColors.deaths],
        plotOptions: {
            bar: {
                horizontal: true,
                endingShape: "rounded",
                dataLabels: {
                    position: 'top',
                },
            }
        },
        grid: {
            show: false,
            padding: {
                top: 10,
                right: 25,
                bottom: 10,
                left: 25,
            },
        },
        dataLabels: {
            enabled: false,
            offsetX: -6,
            style: {
                fontSize: '12px',
                colors: ['#fff']
            }
        },
        stroke: {
            show: false,
            width: 1,
            colors: ['#fff']
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
            labels: {
                show: false,
                align: 'right',
                minWidth: 0,
                maxWidth: 160,
                style: {
                    colors: '#FFFFFF',
                    fontSize: '12px',
                    fontFamily: 'Open Sans',
                    fontWeight: 400,
                },
            }
        },
        xaxis: {
            type: "category",
            categories: ['0-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80+'],
            labels: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
            crosshairs: {
                show: true,
                width: 1,
                position: 'back',
                opacity: 0.9,
                stroke: {
                    color: '#b6b6b6',
                    width: 0,
                    dashArray: 0,
                },
            },
        },
        tooltip: {
            enabled: true,
            enabledOnSeries: undefined,
            shared: true,
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
                formatter: function(val) {
                    return `Age Group: ${val}`
                },
            },
            y: {
                formatter: function(val) {
                    let value = Math.floor(val)
                    return `${value}%`
                },
            },
            z: {
                formatter: undefined,
                title: "Size: ",
            },
            marker: {
                show: true,
            },
            fixed: {
                enabled: true,
                position: "topRight",
                offsetX: 0,
                offsetY: 50,
            },
        },
        title: {
            text: '% Overall Cases/Deaths by Age',
            align: "center",
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
                fontSize: "20px",
                fontWeight: "bold",
                fontFamily: "Open Sans",
                color: "#FFFFFF",
            },
        },
        legend: {
            show: true,
            showForSingleSeries: false,
            showForNullSeries: true,
            showForZeroSeries: true,
            position: 'bottom',
            horizontalAlign: 'center',
            floating: false,
            fontSize: '14px',
            fontFamily: 'Open Sans',
            fontWeight: 400,
            formatter: undefined,
            inverseOrder: false,
            width: undefined,
            height: undefined,
            tooltipHoverFormatter: undefined,
            offsetX: 0,
            offsetY: 0,
            labels: {
                colors: "#FFFFFF",
                useSeriesColors: false
            },
            markers: {
                width: 12,
                height: 12,
                strokeWidth: 0,
                strokeColor: '#fff',
                fillColors: undefined,
                radius: 12,
                customHTML: undefined,
                onClick: undefined,
                offsetX: 0,
                offsetY: 0
            },
            itemMargin: {
                horizontal: 5,
                vertical: 0
            },
            onItemClick: {
                toggleDataSeries: true
            },
            onItemHover: {
                highlightDataSeries: true
            },
        }
    };

    let stackedChart = new ApexCharts(document.getElementById("stackedChart"), stackedChartoptions);
    stackedChart.render();

    let stackedModalChartOptions = {
        series: [{
            name: '% of Cases',
            data: [1, 9, 13, 16, 20, 18, 13, 10]
        }, {
            name: '% of Deaths',
            data: [0, 1, 1, 4, 10, 19, 27, 37]
        }],

        chart: {
            type: 'bar',
            height: '100%',
            width: '100%',
            background: themeColors.cases_css,
            toolbar: {
                show: true,
                offsetX: -20,
                offsetY: 20,
                tools: {
                    //   download: '<img src="C:/PSUPersonal/covid-19-mi/images/download_deaths.png" class="ico-download-casesDeaths" width="50">',
                    download: `
                <div>
                <span><i class="fas fa-download fa-2x casesdeaths-download"></i>
                    </div>`
                },
                autoSelected: 'zoom'
            },
        },
        zoom: {
            enabled: true
        },
        colors: [themeColors.cases, themeColors.deaths],
        plotOptions: {
            bar: {
                horizontal: true,
                endingShape: "rounded",
                dataLabels: {
                    position: 'top',
                },
            }
        },
        grid: {
            show: true,
            padding: {
                top: 10,
                right: 35,
                bottom: 10,
                left: 35,
            },
        },
        dataLabels: {
            enabled: false,
            offsetX: -6,
            style: {
                fontSize: '12px',
                colors: ['#fff']
            }
        },
        stroke: {
            show: false,
            width: 1,
            colors: ['#fff']
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
            },
            title: {
                text: 'Age Groups',
                offsetX: 20,
                offsetY: 0,
                style: {
                    color: '#FFFFFF',
                    fontSize: '18px',
                    fontFamily: 'Open Sans',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-title',
                },
            },
            crosshairs: {
                show: true,
                position: 'back',
                stroke: {
                    color: '#b6b6b6',
                    width: 1,
                    dashArray: 0,
                },
            },
            tooltip: {
                enabled: true,
                offsetX: 0,
            },
        },
        xaxis: {
            type: "category",
            categories: ['0-19', '20-29', '30-39', '40-49', '50-59', '60-69', '70-79', '80+'],
            labels: {
                show: true,
                align: 'right',
                minWidth: 0,
                maxWidth: 160,
                formatter: function(value) {
                    return `${value} %`
                },
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
                position: 'back',
                stroke: {
                    color: '#b6b6b6',
                    width: 1,
                    dashArray: 0,
                },
            },
            tooltip: {
                enabled: true,
                offsetX: 0,
            },
            tickAmount: 15,
            tickPlacement: 'on'
        },
        tooltip: {
            enabled: true,
            enabledOnSeries: undefined,
            shared: true,
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
                formatter: function(val) {
                    return `Age Group: ${val}`
                },
            },
            y: {
                formatter: function(val) {
                    let value = Math.floor(val)
                    return `${value}%`
                },
            },
            z: {
                formatter: undefined,
                title: "Size: ",
            },
            marker: {
                show: true,
            },
            fixed: {
                enabled: false,
                position: "topRight",
                offsetX: 0,
                offsetY: 50,
            },
        },
        title: {
            text: '% Overall Cases/Deaths by Age',
            align: "left",
            margin: 10,
            offsetX: 20,
            offsetY: 20,
            floating: false,
            style: {
                fontSize: "24px",
                fontWeight: "bold",
                fontFamily: "Open Sans",
                color: "#FFFFFF",
            },
        },
        legend: {
            show: true,
            showForSingleSeries: false,
            showForNullSeries: true,
            showForZeroSeries: true,
            position: 'bottom',
            horizontalAlign: 'center',
            floating: false,
            fontSize: '18px',
            fontFamily: 'Open Sans',
            fontWeight: 600,
            formatter: undefined,
            inverseOrder: false,
            width: undefined,
            height: undefined,
            tooltipHoverFormatter: undefined,
            offsetX: 0,
            offsetY: 0,
            labels: {
                colors: "#FFFFFF",
                useSeriesColors: false
            },
            markers: {
                width: 12,
                height: 12,
                strokeWidth: 0,
                strokeColor: '#fff',
                fillColors: undefined,
                radius: 12,
                customHTML: undefined,
                onClick: undefined,
                offsetX: 0,
                offsetY: 0
            },
            itemMargin: {
                horizontal: 5,
                vertical: 0
            },
            onItemClick: {
                toggleDataSeries: true
            },
            onItemHover: {
                highlightDataSeries: true
            },
        }
    };



    let createStackedModalChart = () => {

        let stackedModalChart = new ApexCharts(document.getElementById("casesdeathsBarModalChart"), stackedModalChartOptions);

        stackedModalChart.render();

        return stackedModalChart
    }

    casesdeathsBarModalBtn.addEventListener("click", function(event) {
        casesdeathsBarModal.style.display = 'block'
        casesDeathsBarModalChart = createStackedModalChart()
    })

    closeCasesDeathsBarModal.addEventListener("click", function(event) {
        casesdeathsBarModal.style.display = 'none'
        casesDeathsBarModalChart.destroy();
    })




    //Leaflet & slider
    mymap = L.map("mapid", { zoomSnap: 0.05 })

    mymap.attributionControl.addAttribution('<a href="https://apexcharts.com/">Apex Charts</a>');

    L.easyButton("fa-home", function() {
        mymap.fitBounds(geojsonLayer.getBounds());
    },'Home Extent').addTo(mymap);


    let casesColors = {
        1: "#ffffff",
        2: "#9CEEE3",
        3: "#61E4D3",
        4: "#4EE1CD",
        5: "#27DBC3",
        6: "#20B4A0",
        7: "#198C7D",
        8: "#126459",
        9: "#0F5047",
    };

    let deathsColors = {
        1: "white",
        2: "#FFBEB4",
        3: "#FFA496",
        4: "#FF8A78",
        5: "#FF715B",
        6: "#D15D4B",
        7: "#A3483A",
        8: "#74342A",
        9: "#5D2A22",
    };

    let casesToolTips = {
        1: "cases-1-tool-tips",
        2: "cases-2-tool-tips",
        3: "cases-3-tool-tips",
        4: "cases-4-tool-tips",
        5: "cases-5-tool-tips",
        6: "cases-6-tool-tips",
        7: "cases-7-tool-tips",
        8: "cases-8-tool-tips",
        9: "cases-9-tool-tips",
    };

    let deathsToolTips = {
        1: "deaths-1-tool-tips",
        2: "deaths-2-tool-tips",
        3: "deaths-3-tool-tips",
        4: "deaths-4-tool-tips",
        5: "deaths-5-tool-tips",
        6: "deaths-6-tool-tips",
        7: "deaths-7-tool-tips",
        8: "deaths-8-tool-tips",
        9: "deaths-9-tool-tips",
    };

    let dailyCasesNumbers = {
        1: 1,
        2: 12,
        3: 30,
        4: 56,
        5: 81,
        6: 125,
        7: 354,
        8: 1084,
        9: 7383,
    };


    let dailyDeathsNumbers = {
        1: 1,
        2: 4,
        3: 6,
        4: 9,
        5: 11,
        6: 25,
        7: 90,
        8: 410,
        9: 546
    }

    //Function for styline the geoJSON files
    let casesGetColor = (cases) => {
        return cases < dailyCasesNumbers[1] ?
            casesColors[1] :
            cases <= dailyCasesNumbers[2] ?
            casesColors[2] :
            cases <= dailyCasesNumbers[3] ?
            casesColors[3] :
            cases <= dailyCasesNumbers[4] ?
            casesColors[4] :
            cases <= dailyCasesNumbers[5] ?
            casesColors[5] :
            cases <= dailyCasesNumbers[6] ?
            casesColors[6] :
            cases <= dailyCasesNumbers[7] ?
            casesColors[7] :
            cases <= dailyCasesNumbers[8] ?
            casesColors[8] :
            casesColors[9];
    };

    let deathsGetColor = (deaths) => {
        return deaths <= dailyDeathsNumbers[1] ?
            deathsColors[1] :
            deaths <= dailyDeathsNumbers[2] ?
            deathsColors[2] :
            deaths <= dailyDeathsNumbers[3] ?
            deathsColors[3] :
            deaths <= dailyDeathsNumbers[4] ?
            deathsColors[4] :
            deaths <= dailyDeathsNumbers[5] ?
            deathsColors[5] :
            deaths <= dailyDeathsNumbers[6] ?
            deathsColors[6] :
            deaths <= dailyDeathsNumbers[7] ?
            deathsColors[7] :
            deaths <= dailyDeathsNumbers[8] ?
            deathsColors[8] :
            deathsColors[9];
    };


    let casesClass = (layer) => {
        let cases = layer.feature.properties.cases;
        return cases < dailyCasesNumbers[1] ?
        casesToolTips[1] :
        cases <= dailyCasesNumbers[2] ?
        casesToolTips[2] :
        cases <= dailyCasesNumbers[3] ?
        casesToolTips[3] :
        cases <= dailyCasesNumbers[4] ?
        casesToolTips[4] :
        cases <= dailyCasesNumbers[5] ?
        casesToolTips[5] :
        cases <= dailyCasesNumbers[6] ?
        casesToolTips[6] :
        cases <= dailyCasesNumbers[7] ?
        casesToolTips[7] :
        cases <= dailyCasesNumbers[8] ?
        casesToolTips[8] :
        casesToolTips[9];
    };

    let deathsClass = (layer) => {
        let deaths = layer.feature.properties.deaths;
        return deaths <= dailyDeathsNumbers[1] ?
        deathsToolTips[1] :
        deaths <= dailyDeathsNumbers[2] ?
        deathsToolTips[2] :
        deaths <= dailyDeathsNumbers[3] ?
        deathsToolTips[3] :
        deaths <= dailyDeathsNumbers[4] ?
        deathsToolTips[4] :
        deaths <= dailyDeathsNumbers[5] ?
        deathsToolTips[5] :
        deaths <= dailyDeathsNumbers[6] ?
        deathsToolTips[6] :
        deaths <= dailyDeathsNumbers[7] ?
        deathsToolTips[7] :
        deaths <= dailyDeathsNumbers[8] ?
        deathsToolTips[8] :
        deathsToolTips[9];
    };

    let casesStyle = (feature) => {
        return {
            fillColor: casesGetColor(feature.properties.cases),
            weight: 1.5,
            opacity: 1,
            color: 'black',
            dashArray: "0",
            fillOpacity: 1,
        };
    };

    let deathsStyle = (feature) => {
        return {
            fillColor: deathsGetColor(feature.properties.deaths),
            weight: 1.5,
            opacity: 1,
            color: 'black',
            dashArray: "0",
            fillOpacity: 1,
        };
    };

    function onEachFeature(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature,
        });
        layer.bindTooltip(
            function(layer) {
                return String(`County: ${layer.feature.properties.NAME}<br>
                           Cases: ${layer.feature.properties.cases}
                            `);
            }, { className: casesClass(layer) }
        );
    }

    function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 1,
            color: "white",
            fillColor: "white",
            fillOpacity: 0.25,
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    }

    function resetHighlight(e) {
        geojsonLayer.resetStyle(e.target);
    }

    function zoomToFeature(e) {
        mymap.fitBounds(e.target.getBounds(), { padding: [50, 50] });
    }

    function onEachFeatureDeaths(feature, layer) {
        layer.on({
            mouseover: highlightFeature,
            mouseout: resetHighlight,
            click: zoomToFeature,
        });
        layer.bindTooltip(
            function(layer) {
                return String(`County: ${layer.feature.properties.NAME}<br>
                           Deaths: ${layer.feature.properties.deaths}
                            `);
            }, { className: deathsClass(layer) }
        );
    }

    function highlightFeature(e) {
        var layer = e.target;

        layer.setStyle({
            weight: 1,
            color: "white",
            fillColor: "white",
            fillOpacity: 0.25,
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    }

    function resetHighlight(e) {
        geojsonLayer.resetStyle(e.target);
    }

    function zoomToFeature(e) {
        mymap.fitBounds(e.target.getBounds(), { padding: [50, 50] });
    }

    // //Add to map function
    let addToMap = (json) => {


        if (visualType === "Cases") {
            geojsonLayer = L.geoJSON(json, {
                style: casesStyle,
                onEachFeature: onEachFeature,
            }).addTo(mymap);
        } else {
            geojsonLayer = L.geoJSON(json, {
                style: deathsStyle,
                onEachFeature: onEachFeatureDeaths,
            }).addTo(mymap);
        }
        // geojsonLayer.addTo(mymap);
        mymap.fitBounds(geojsonLayer.getBounds());

        mymap.options.minZoom = mymap.getZoom()
    };

    //add the initial current data on map load
    addToMap(aprilSeventeen);

    let addGeoJSONLayer = (date) => {
        switch (date) {
            case "4/17/2020":
                addToMap(aprilSeventeen)
                break;
            case "4/16/2020":
                addToMap(aprilSixteen);
                break;
            case "4/15/2020":
                addToMap(aprilFifteen);
                break;
            case "4/14/2020":
                addToMap(aprilFourteen);
                break;
            case "4/13/2020":
                addToMap(aprilThirteen);
                break;
            case "4/12/2020":
                addToMap(aprilTwelve);
                break;
            case "4/11/2020":
                addToMap(aprilEleven);
                break;
            case "4/10/2020":
                addToMap(aprilTen);
                break;
            case "4/9/2020":
                addToMap(aprilNine);
                break;
            case "4/8/2020":
                addToMap(aprilEight);
                break;
            case "4/7/2020":
                addToMap(aprilSeven);
                break;
            case "4/6/2020":
                addToMap(aprilSix);
                break;
            case "4/5/2020":
                addToMap(aprilFive);
                break;
            case "4/4/2020":
                addToMap(aprilFour);
                break;
            case "4/3/2020":
                addToMap(aprilThree);
                break;
            case "4/2/2020":
                addToMap(aprilTwo);
                break;
            case "4/1/2020":
                addToMap(aprilOne);
                break;
            case "3/31/2020":
                addToMap(marchThirtyOne);
                break;
            case "3/30/2020":
                addToMap(marchThirty);
                break;
            case "3/29/2020":
                addToMap(marchTwentyNine);
                break;
            case "3/28/2020":
                addToMap(marchTwentyEight);
                break;
            case "3/27/2020":
                addToMap(marchTwentySeven);
                break;
            case "3/26/2020":
                addToMap(marchTwentySix);
                break;
            case "3/25/2020":
                addToMap(marchTwentyFive);
                break;
            case "3/24/2020":
                addToMap(marchTwentyFour);
                break;
            case "3/23/2020":
                addToMap(marchTwentyThree);
                break;
            case "3/22/2020":
                addToMap(marchTwentyTwo);
                break;
            case "3/21/2020":
                addToMap(marchTwentyOne);
                break;
            case "3/20/2020":
                addToMap(marchTwenty);
                break;
            case "3/19/2020":
                addToMap(marchNineteen);
                break;
            case "3/18/2020":
                addToMap(marchEighteen);
                break;
            case "3/17/2020":
                addToMap(marchSeventeen);
                break;
            case "3/16/2020":
                addToMap(marchSixteen);
                break;
            case "3/15/2020":
                addToMap(marchFifteen);
                break;
            case "3/14/2020":
                addToMap(marchFourteen);
                break;
            case "3/13/2020":
                addToMap(marchThirteen);
                break;
            case "3/12/2020":
                addToMap(marchTwelve);
                break;
            case "3/11/2020":
                addToMap(marchEleven);
                break;
        }
    };


    casesLegend = L.control({ position: 'topright' });

    casesLegend.onAdd = function(map) {

        var div = L.DomUtil.create('div', 'info legend');

        div.style.backgroundColor = themeColors.color2a

        var grades = Object.keys(dailyCasesNumbers).map(function(key) {
            return dailyCasesNumbers[key];
        });

        labels = [];

        for (var i = 0; i < grades.length; i++) {
            if (grades[i] <= 1){
                div.innerHTML +=
                '<i style="border-top: 2px solid black; border-right: 2px solid black; border-left: 2px solid black; background:white"></i>' + 0 + '<br>'; 
            } else if (grades[i] != casesMax){
                div.innerHTML +=
                '<i style="border-left: 2px solid black; border-right: 2px solid black; background:' + casesGetColor(grades[i]) + '"></i><br>';
            } else {
                div.innerHTML +=
                '<i style="border-bottom: 2px solid black; border-right: 2px solid black; border-left: 2px solid black; background:' + casesGetColor(grades[i]) + '"></i>' + casesMax + '<br>';
            }
        }

        return div;
    };

    casesLegend.addTo(mymap);

    deathsLegend = L.control({ position: 'topright' });

    deathsLegend.onAdd = function(map) {

        var div = L.DomUtil.create('div', 'info legend');

        div.style.backgroundColor = themeColors.color3a

        var grades = Object.keys(dailyDeathsNumbers).map(function(key) {
            return dailyDeathsNumbers[key];
        });
        labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            if (grades[i] <= 1){
                div.innerHTML +=
                '<i style="border-top: 2px solid black; border-right: 2px solid black; border-left: 2px solid black; background:white"></i>' + 0 + '<br>'; 
            } else if (grades[i] != deathsMax){
                div.innerHTML +=
                '<i style="border-left: 2px solid black; border-right: 2px solid black; background:' + deathsGetColor(grades[i]) + '"></i><br>';
            } else {
                div.innerHTML +=
                '<i style="border-bottom: 2px solid black; border-right: 2px solid black; border-left: 2px solid black; background:' + deathsGetColor(grades[i]) + '"></i>' + deathsMax + '&nbsp;&nbsp;' + '<br>';
            }
        }

        return div;
    };

    var slider = document.getElementById("slider-range");

    noUiSlider.create(slider, {
        start: Date.parse(currentdate),
        //Step one day
        step: 86400000,
        connect: "lower",
        range: {
            min: Date.parse("March 11, 2020"),
            max: Date.parse(currentdate),
        },
    });

    let startingDate = Date.parse(currentdate);
    let dataDate = document.querySelector(".data-date");
    dataDate.innerHTML = `Date: ${new Date(startingDate).toDateString()}`;

    slider.noUiSlider.on("slide", function() {
        let value = Math.trunc(slider.noUiSlider.get());
        let newdate = new Date(value).toLocaleDateString();
        let formattedDate = new Date(value).toDateString();
        dataDate.innerHTML = `Date: ${formattedDate}`;
        //remove geojson layer
        geojsonLayer.remove();
        addGeoJSONLayer(newdate);
    });

    const checkbox = document.getElementById("fs");
    const uiHandle = document.querySelector(".noUi-connect")
    const sliderContainer = document.querySelector(".slider")



    checkbox.addEventListener("change", (event) => {

        let value = Math.trunc(slider.noUiSlider.get());
        let newdate = new Date(value).toLocaleDateString();
        if (event.target.checked) {
            let mapTag = document.getElementsByTagName("map")[0]
            visualType = "Cases";
            mapTag.style.backgroundColor = themeColors.deaths_css
            uiHandle.style.setProperty('background', themeColors.cases, 'important');
            deathsLegend.remove()
            casesLegend.addTo(mymap);
            sliderContainer.style.setProperty('background', themeColors.color2a, 'important');

        } else {
            let mapTag = document.getElementsByTagName("map")[0]
            visualType = "Deaths";
            mapTag.style.backgroundColor = themeColors.cases_css
            uiHandle.style.setProperty('background', themeColors.deaths, 'important');
            casesLegend.remove()
            deathsLegend.addTo(mymap);
            sliderContainer.style.setProperty('background', themeColors.color3a, 'important');
        }
        geojsonLayer.remove();
        addGeoJSONLayer(newdate);
    });

    /*Table*/
    /* Plan on refactoring below */
    const getCellValue = (tr, idx) =>
        tr.children[idx].innerText || tr.children[idx].textContent;

    const comparer = (idx, asc) => (a, b) =>
        ((v1, v2) =>
            v1 !== "" && v2 !== "" && !isNaN(v1) && !isNaN(v2) ?
            v1 - v2 :
            v1.toString().localeCompare(v2))(
            getCellValue(asc ? a : b, idx),
            getCellValue(asc ? b : a, idx)
        );

    // do the work...
    document.querySelectorAll("th").forEach((th) =>
        th.addEventListener("click", () => {
            let elementHeadings = document.querySelectorAll("th");
            let elementSortSymbols = document.querySelectorAll(".fa-sort");

            for (i = 0; i < elementHeadings.length; ++i) {
                if (elementHeadings[i].classList.contains("table-selected")) {
                    elementHeadings[i].classList.remove("table-selected");
                }
            }

            th.classList.add("table-selected");
            // th.childNodes[1].style.color = 'white'

            const table = th.closest("table");
            const tbody = table.querySelector("tbody");
            Array.from(tbody.querySelectorAll("tr"))
                .sort(
                    comparer(
                        Array.from(th.parentNode.children).indexOf(th),
                        (this.asc = !this.asc)
                    )
                )
                .forEach((tr) => tbody.appendChild(tr));
        })
    );
});