let mymap
    // // Map JSON values back to label array
    // console.log('hi')

// let myChart2

// var labels = state_cases_daily.map(function(e) {
//     return e.date
// });

// var date = state_cases_daily.map(function(e) {
//     return e.value;
// });

// var ctx = document.getElementById('myChart').getContext('2d');
// var myChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//         labels: labels,
//         datasets: [{
//             label: 'cases: ',
//             data: date,
//             //line fill color
//             backgroundColor: "rgba(0, 0, 0, 0)", //transparent
//             //border fill color
//             borderColor: 'white',
//             borderWidth: 5
//         }]
//     },
//     options: {
//         tooltips: {
//             yAlign: 'bottom'
//         },
//         //Hide lines - adjust hit distance
//         elements: {
//             point: { hitRadius: 10, hoverRadius: 10, radius: 0 }

//         },
//         legend: {
//             display: false
//         },
//         maintainAspectRatio: false,
//         responsive: true,
//         layout: {
//             padding: {
//                 left: 25,
//                 right: 25,
//                 bottom: 25,
//                 top: 25,
//             }
//         },
//         scales: {
//             yAxes: [{
//                 ticks: {
//                     beginAtZero: true,
//                     //Remove ticks
//                     display: false,
//                 },
//                 gridLines: {
//                     display: false,
//                 }
//             }],
//             xAxes: [{
//                 ticks: {
//                     display: false,
//                 },
//                 gridLines: {
//                     display: false,
//                 }
//             }]
//         }
//     }
// });

// $('#exampleModal').on('shown.bs.modal', function(event) {
//     let casesModalCtx = document.getElementById('myChart2').getContext('2d');
//     let casesModalChart = createChart()

// });

// $('#exampleModal').modal('show')

let casesChart


$(document).ready(function() {

    let createChart = (json, options) => {

        Chart.defaults.global.defaultFontFamily = "Open Sans";

        let labels = json.map(function(e) {
            return e.date
        })

        let data = json.map(function(e) {
            return e.value
        })

        let ctx = document.getElementById(options.div).getContext('2d');

        return new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: options.label,
                    data: data,
                    //line fill color
                    backgroundColor: options.chartBackground,
                    //border fill color
                    borderColor: options.lineColor,
                    borderWidth: 5
                }]
            },
            options: {
                title: {
                    display: true,
                    text: options.title,
                    fontSize: 16,
                    fontColor: 'white'
                },
                tooltips: {
                    // yAlign: 'bottom',
                    displayColors: false,
                },
                //Hide lines - adjust hit distance
                elements: {
                    point: { hitRadius: 10, hoverRadius: 10, radius: 0 }

                },
                legend: {
                    display: false
                },
                maintainAspectRatio: false,
                responsive: true,
                layout: {
                    padding: {
                        left: 25,
                        right: 25,
                        bottom: 25,
                        top: 25,
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            //Remove ticks
                            display: options.yAxesTicks,
                        },
                        gridLines: {
                            display: options.yAxesGrid,
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            display: options.xAxesTicks,
                        },
                        gridLines: {
                            display: options.xAxesGrid,
                        }
                    }]
                }
            }
        });
    }

    let casesOptions = {
        div: 'myChart',
        label: 'cases: ',
        title: 'Cases',
        chartBackground: "rgba(0, 0, 0, 0)",
        lineColor: "white",
        yAxesTicks: false,
        yAxesGrid: false,
        xAxesTicks: false,
        xAxesGrid: false,
    }

    let casesModalOptions = {
        div: 'myChart2',
        label: 'cases: ',
        title: 'Cases',
        chartBackground: "rgba(0, 0, 0, 0)",
        lineColor: "red",
        yAxesTicks: true,
        yAxesGrid: true,
        xAxesTicks: true,
        xAxesGrid: true,
    }

    let deathsOptions = {
        div: 'deathsChart',
        label: 'deaths: ',
        title: 'Deaths',
        chartBackground: "rgba(0, 0, 0, 0)",
        lineColor: "white",
        yAxesTicks: false,
        yAxesGrid: false,
        xAxesTicks: false,
        xAxesGrid: false,
    }

    //Json, Div, Chart Labels, Background Color, Border Color
    casesChart = createChart(state_cases_daily, casesOptions)

    // When the cases chart is expanded
    $('#exampleModal').on('shown.bs.modal', function(event) {
        casesModalChart = createChart(state_cases_daily, casesModalOptions)
    });

    deathsChart = createChart(state_deaths_daily, deathsOptions)

    //Leaflet & slider
    mymap = L.map('mapid', { zoomSnap: 0.05 }).setView([44.3148, -85.6024], 13.25);

    // var OpenStreetMap_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     maxZoom: 19,
    //     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    // }).addTo(mymap)

    var geojsonLayer = L.geoJSON(am4geodata_miCounties);
    geojsonLayer.addTo(mymap);
    mymap.fitBounds(geojsonLayer.getBounds());

    var slider = document.getElementById('slider');

    noUiSlider.create(slider, {
        start: 40,
        connect: 'lower',
        tooltips: true,
        range: {
            'min': 0,
            'max': 100
        }
    });

});