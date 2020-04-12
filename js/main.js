let mymap;
let geojsonLayer;
let casesBarModalChart
let deathsBarModalChart
let casesLineModalChart
let deathsLineModalChart
let visualType = "Cases";
let visualPieType = "Cases"
let currentdate = "April 2, 2020";

$(document).ready(function() {


    //Line & Bar Charts - First Row

    // themeColors = {
    //     cases: '#A8F9FF',
    //     deaths: '#E06292',
    // }

    themeColors = {
        cases: '#27DBC3',
        deaths: '#FF715B',
        female: '#A8F9FF',
        male: '#E06292',
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
        name: 'Cases'
    }

    let deathsDailyModalBarChartOptions = {
        div: 'deathsDailyModalBarChart',
        barColor: themeColors.deaths,
        title: 'Daily Deaths',
        name: 'Deaths'
    }

    let createBarModalChart = (json, chartOptions) => {
        //Function to create the labels
        let labels = json.map(function(e) {
            return e.date;
        });

        console.log(labels)

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
                toolbar: {
                    show: true,
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
            },
            xaxis: {
                type: "category",
                categories: labels,
                labels: {
                    show: true,
                    align: 'right',
                    minWidth: 0,
                    maxWidth: 160,
                    style: {
                        colors: '#FFFFFF',
                        fontSize: '12px',
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
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
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
                        fontSize: '12px',
                        fontFamily: 'Open Sans',
                        fontWeight: 400,
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
                offsetX: 0,
                offsetY: 0,
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
        title: 'Total Cases',
        nameLine: 'Cases Total',
        nameBar: 'Cases Daily',
    }

    let deathsDailyModalLineChartOptions = {
        div: 'deathsModalLineChart',
        barColor: [themeColors.deaths, '#9D8DF1'],
        title: 'Total Deaths',
        nameLine: 'Deaths Total',
        nameBar: 'Deaths Daily',
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
                toolbar: {
                    show: true,
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
                            fontSize: '12px',
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
                            fontSize: '12px',
                            fontFamily: 'Open Sans',
                            fontWeight: 400,
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
                offsetX: 0,
                offsetY: 0,
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
    let deathsLineModal = document.getElementById("deathsLineModal")
    let closeCasesBarModal = document.querySelector(".casesBar")
    let closeDeathsBarModal = document.querySelector(".deathsBar")
    let closeCasesLineModal = document.querySelector(".casesLine")
    let closeDeathsLineModal = document.querySelector(".deathsLine")


    casesBarModalBtn.addEventListener("click", function(event) {
        console.log('error')
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
    var pieOptions = {
        chart: {
            type: 'pie',
            width: "100%",
            height: "100%",
            toolbar: {
                show: true,
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
        series: [46, 53, 1],
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

    var chartPie = new ApexCharts(document.getElementById("pieChart"), pieOptions);

    chartPie.render();


    const checkboxPie = document.getElementById("fs-pie");

    checkboxPie.addEventListener("change", (event) => {



        if (event.target.checked) {
            let mapTag = document.getElementById('pieChartContainer')
            visualType = "Cases";
            mapTag.style.backgroundColor = 'rgba(52,63,87, 1)'

            function reset() {
                chartPie.w.globals.initialConfig.title.text = 'Cases by Sex'
                console.log(pieOptions.series)
                return pieOptions.series
            }

            chartPie.updateSeries(reset())

        } else {

            let mapTag = document.getElementById('pieChartContainer')
            visualType = "Deaths";
            mapTag.style.backgroundColor = 'rgba(44, 44, 84, 1)'

            function appendData() {
                chartPie.w.globals.initialConfig.title.text = 'Deaths by Sex'
                var arr = chartPie.w.globals.series.slice()
                arr = [57, 43]
                return arr;
            }

            chartPie.updateSeries(appendData())
        }
    });


    //Stacked Comparison Chart - Thrid Row
    var options = {
        series: [{
            name: '% of Cases',
            data: [1, 9, 13, 16, 20, 18, 13, 10]
        }, {
            name: '% of Deaths',
            data: [0, 1, 2, 4, 11, 19, 28, 36]
        }],

        chart: {
            type: 'bar',
            height: '100%',
            width: '100%'
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
                show: true,
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

    var chart = new ApexCharts(document.getElementById("stackedChart"), options);
    chart.render();


    //   let optionsold = {
    //     plotOptions: {
    //         bar: {
    //             horizontal: false,
    //             endingShape: "rounded",
    //         },
    //     },
    //     chart: {
    //         width: "100%",
    //         height: "100%",
    //         type: "bar",
    //         toolbar: {
    //             show: false,
    //         },
    //     },
    //     series: [{
    //         name: chartOptions.name,
    //         data: data,
    //     }, ],
    //     fill: {
    //         colors: chartOptions.barColor,
    //         opacity: 1,
    //         type: "solid",
    //     },
    //     dataLabels: {
    //         enabled: false,
    //     },
    //     grid: {
    //         show: false,
    //         padding: {
    //             top: 10,
    //             right: 25,
    //             bottom: 10,
    //             left: 25,
    //         },
    //     },
    //     xaxis: {
    //         type: "category",
    //         categories: labels,
    //         labels: {
    //             show: false,
    //         },
    //         axisBorder: {
    //             show: false,
    //         },
    //         axisTicks: {
    //             show: false,
    //         },
    //         crosshairs: {
    //             show: true,
    //         },
    //     },
    //     yaxis: {
    //         show: false,
    //         axisTicks: {
    //             show: false,
    //         },
    //         crosshairs: {
    //             show: false,
    //         },
    //         tooltip: {
    //             enabled: false,
    //         },
    //     },
    //     tooltip: {
    //         enabled: true,
    //         enabledOnSeries: undefined,
    //         shared: true,
    //         followCursor: true,
    //         intersect: false,
    //         inverseOrder: false,
    //         custom: undefined,
    //         fillSeriesColor: false,
    //         theme: 'dark',
    //         style: {
    //             fontSize: "12px",
    //             fontFamily: "Open Sans",
    //         },
    //         onDatasetHover: {
    //             highlightDataSeries: true,
    //         },
    //         x: {
    //             show: true,
    //             format: "MM",
    //         },
    //         y: {
    //             formatter: undefined,
    //             title: {
    //                 formatter: (seriesName) => seriesName,
    //             },
    //         },
    //         z: {
    //             formatter: undefined,
    //             title: "Size: ",
    //         },
    //         marker: {
    //             show: false,
    //         },
    //         fixed: {
    //             enabled: true,
    //             position: "topLeft",
    //             offsetX: 0,
    //             offsetY: 50,
    //         },
    //     },
    //     title: {
    //         text: chartOptions.title,
    //         align: "center",
    //         margin: 10,
    //         offsetX: 0,
    //         offsetY: 0,
    //         floating: false,
    //         style: {
    //             fontSize: "20px",
    //             fontWeight: "bold",
    //             fontFamily: "Open Sans",
    //             color: "#FFFFFF",
    //         },
    //     },
    //     theme: {
    //         mode: 'light',
    //         palette: 'palette10',
    //     }
    // };



    //Leaflet & slider
    mymap = L.map("mapid", { zoomSnap: 0.05 }).setView(
        [44.3148, -85.6024],
        13.25
    );

    L.easyButton("fa-home", function() {
        mymap.fitBounds(geojsonLayer.getBounds());
    }).addTo(mymap);

    let casesColors = {
        1: "white",
        2: "#ece7f2",
        3: "#d0d1e6",
        4: "#a6bddb",
        5: "#74a9cf",
        6: "#3690c0",
        7: "#0570b0",
        8: "#045a8d",
        9: "#023858",
    };

    let deathsColors = {
        1: "#fee5d9",
        2: "#fcae91",
        3: "##fb6a4a",
        4: "#cb181d",
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
    };

    let dailCasesNumbers = {
        1: 0,
        2: 1,
        3: 9,
        4: 34,
        5: 102,
        6: 276,
        7: 1316,
        8: 3516,
        9: 6816,
    };

    //Function for styline the geoJSON files
    let casesGetColor = (cases) => {
        return cases > dailCasesNumbers[9] ?
            casesColors[9] :
            cases > dailCasesNumbers[8] ?
            casesColors[8] :
            cases > dailCasesNumbers[7] ?
            casesColors[7] :
            cases > dailCasesNumbers[6] ?
            casesColors[6] :
            cases > dailCasesNumbers[5] ?
            casesColors[5] :
            cases > dailCasesNumbers[4] ?
            casesColors[4] :
            cases > dailCasesNumbers[3] ?
            casesColors[3] :
            cases >= dailCasesNumbers[2] ?
            casesColors[2] :
            casesColors[1];
    };

    let deathsGetColor = (deaths) => {
        return deaths > 600 ?
            deathsColors[4] :
            deaths > 100 ?
            deathsColors[3] :
            deaths > 10 ?
            deathsColors[2] :
            deathsColors[1];
    };

    let casesClass = (layer) => {
        let cases = layer.feature.properties.cases;
        return cases > dailCasesNumbers[9] ?
            casesToolTips[9] :
            cases > dailCasesNumbers[8] ?
            casesToolTips[8] :
            cases > dailCasesNumbers[7] ?
            casesToolTips[7] :
            cases > dailCasesNumbers[6] ?
            casesToolTips[6] :
            cases > dailCasesNumbers[5] ?
            casesToolTips[5] :
            cases > dailCasesNumbers[4] ?
            casesToolTips[4] :
            cases > dailCasesNumbers[3] ?
            casesToolTips[3] :
            cases >= dailCasesNumbers[2] ?
            casesToolTips[2] :
            casesToolTips[1];
    };

    let deathsClass = (layer) => {
        let deaths = layer.feature.properties.deaths;
        return deaths > 600 ?
            deathsToolTips[4] :
            deaths > 100 ?
            deathsToolTips[3] :
            deaths > 10 ?
            deathsToolTips[2] :
            deathsToolTips[1];
    };

    let casesStyle = (feature) => {
        return {
            fillColor: casesGetColor(feature.properties.cases),
            weight: 1,
            opacity: 1,
            color: "black",
            dashArray: "0",
            fillOpacity: 1,
        };
    };

    let deathsStyle = (feature) => {
        return {
            fillColor: deathsGetColor(feature.properties.cases),
            weight: 1,
            opacity: 1,
            color: "black",
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
        console.log(visualType);
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
    };

    //add the initial current data on map load
    addToMap(aprilTwo);

    let addGeoJSONLayer = (date) => {
        switch (date) {
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


    checkbox.addEventListener("change", (event) => {
        let value = Math.trunc(slider.noUiSlider.get());
        let newdate = new Date(value).toLocaleDateString();
        if (event.target.checked) {
            let mapTag = document.getElementsByTagName("map")[0]
            visualType = "Cases";
            mapTag.style.backgroundColor = 'rgba(52,63,87, 1)'
        } else {
            let mapTag = document.getElementsByTagName("map")[0]
            visualType = "Deaths";
            mapTag.style.backgroundColor = 'rgba(44, 44, 84, 1)'
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