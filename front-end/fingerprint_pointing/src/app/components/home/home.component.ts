import { Component, OnInit, ViewChild } from '@angular/core';
import { 
  ChartComponent, 
  ApexAxisChartSeries, 
  ApexChart, 
  ApexXAxis, 
  ApexDataLabels,
  ApexTooltip, 
  ApexStroke,
  ApexTitleSubtitle,
  ApexFill,
  ApexYAxis,
  ApexMarkers,
  ApexAnnotations,
  ApexGrid,
  ApexLegend,
  ApexPlotOptions
} from 'ng-apexcharts';
import * as moment  from 'moment';
import { StatisticsService } from './../../services/statistics.service';
import { NotifierService } from 'angular-notifier';

// APX AREA SPLINE
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

// LINE DATA
export type ChartLineOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  colors: string[];
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

// AREA DATATIME
export type ChartDatetimeOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  title: ApexTitleSubtitle;
  fill: ApexFill;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  xaxis: ApexXAxis;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  annotations: ApexAnnotations;
  colors: any;
  toolbar: any;
}

// LINE DASHED
export type ChartDashedOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  dataLabels: ApexDataLabels;
  markers: ApexMarkers;
  tooltip: any; // ApexTooltip;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  legend: ApexLegend;
  title: ApexTitleSubtitle;
};

// LINE COLUMN
export type ChartLCOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  title: ApexTitleSubtitle;
  labels: string[];
  stroke: any; // ApexStroke;
  dataLabels: any; // ApexDataLabels;
  fill: ApexFill;
  tooltip: ApexTooltip;
};

/*/ LINE AREA COLUMN
export type ChartLACOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  labels: string[];
  stroke: any; // ApexStroke;
  markers: ApexMarkers;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
};
*/

// TIME LINE
export type ChartTimelineOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  legend: ApexLegend;
  xaxis: ApexXAxis;
  plotOptions: ApexPlotOptions;
};
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // APX AREA SPLINE
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions!: Partial<ChartOptions>;
  
  // AREA DATATIME
  @ViewChild("chartDatetime", { static: false }) chartDatetime!: ChartComponent;
  public chartDatetimeOptions!: Partial<ChartDatetimeOptions>;
  public activeOptionButton = "all";

  // LINE DATA
  @ViewChild("chartLine") chartLine!: ChartComponent;
  public chartLineOptions!: Partial<ChartLineOptions>;

  // LINE DASHED
  @ViewChild("chartDashed") chartDashed!: ChartComponent;
  public chartDashedOptions!: Partial<ChartDashedOptions>;

  // LINE COLUMN
  @ViewChild("chartLC") chartLC!: ChartComponent;
  public chartLCOptions!: Partial<ChartLCOptions>;

  /*/ LINE AREA COLUMN
  @ViewChild("chartLAC") chartLAC!: ChartComponent;
  public chartLACOptions!: Partial<ChartLACOptions>;
  */

  // TIMELINE
  @ViewChild("chartTimeline") chartTimeline!: ChartComponent;
  public chartTimelineOptions!: Partial<ChartTimelineOptions>;

  annee:string = (new Date().getFullYear()-1).toString();

  constructor(
    private service: StatisticsService,
    private notifier: NotifierService
  ) { 
    // LINE DATA
    this.initChartLine();
    // DASHED LINE
    this.initDashedLine();
    // LINE COLUMN
    this.initLC();
    /*/ LINE AREA COLUMN
    this.initLAC();*/
    // TIME LINE
    this.initTimeline();
  }

  ngOnInit(): void {
    this.getDataToChartDatetime();
    this.getDataToChartAreaSpline();
  }

  // APX AREA SPLINE
  public generateData(baseval: number, count: number, yrange: any) {
    let i = 0;
    let series: any[] = [];
    while (i < count) {
      let x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      let y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      let z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

  /*/ LINE AREA COLUMN
  public generateData(count, yrange) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = "w" + (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y
      });
      i++;
    }
    return series;
  }*/

  // APX AREA SPLINE
  initChartAreaSplie(data:any, annee:string): void {
    /** 
    / data format
    series = [
        {
          name: "series1",
          data: [31, 40, 28, 51, 42, 109, 100]
        },
        {
          name: "series2",
          data: [11, 32, 45, 32, 34, 52, 41]
        }
      ]
      categories = [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
    */
    this.chartOptions = {
      series: data.series,
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: data.categories
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
  }

  getDataToChartAreaSpline(){
    this.service.sttPointedOrNot(this.annee).subscribe((d)=>{
      if(d.status) {
        this.notifier.notify(d.status, d.message)
      } else {
        this.initChartAreaSplie(d, this.annee);
      }
    })
  }

  // AREA DATATIME
  initChartDatetime(data: any, annee: string): void {
    this.chartDatetimeOptions = {
      series: [
        {
          data: data
        }
      ],
      chart: {
        type: "area",
        height: 350
      },
      annotations: {
        yaxis: [
          {
            y: 30,
            borderColor: "#999",
            label: {
              text: "Support",
              style: {
                color: "#fff",
                background: "#00E396"
              }
            }
          }
        ],
        xaxis: [
          {
            x: new Date("01 Jul "+ annee).getTime(),
            borderColor: "#999",
            label: {
              text: "mi",
              style: {
                color: "#fff",
                background: "#775DD0"
              }
            }
          }
        ]
      },
      dataLabels: {
        enabled: false
      },
      markers: {
        size: 0
      },
      grid: {
        show: true
      },
      xaxis: {
        type: "datetime",
        min: new Date("01 Jan "+ annee).getTime(),
        tickAmount: 6
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy"
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 100]
        }
      },
      stroke: {
        curve: "smooth"
      },
      yaxis: {}
    };
  }

  getDataToChartDatetime() {
    this.service.agilitiesOfStudents(this.annee).subscribe((d)=>{
      if(d.status) {
        this.notifier.notify(d.status, d.message)
      } else {
        this.initChartDatetime(d, this.annee);
      }
    });
  }

  // LINE DATA
  initChartLine(): void {
    this.chartLineOptions = {
      series: [
        {
          name: "High - 2013",
          data: [28, 29, 33, 36, 32, 32, 33]
        },
        {
          name: "Low - 2013",
          data: [12, 11, 14, 18, 17, 13, 13]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        dropShadow: {
          enabled: true,
          color: "#000",
          top: 18,
          left: 7,
          blur: 10,
          opacity: 0.2
        },
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "smooth"
      },
      title: {
        text: "Average High & Low Temperature",
        align: "left"
      },
      grid: {
        borderColor: "#e7e7e7",
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      markers: {
        size: 1
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        title: {
          text: "Month"
        }
      },
      yaxis: {
        title: {
          text: "Temperature"
        },
        min: 5,
        max: 40
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };
  }

  // LINE DASHED
  initDashedLine(): void {
    this.chartDashedOptions = {
      series: [
        {
          name: "Session Duration",
          data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
        },
        {
          name: "Page Views",
          data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
        },
        {
          name: "Total Visits",
          data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 5,
        curve: "straight",
        dashArray: [0, 8, 5]
      },
      title: {
        text: "Page Statistics",
        align: "left"
      },
      legend: {
        tooltipHoverFormatter: function(val, opts) {
          return (
            val +
            " - <strong>" +
            opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
            "</strong>"
          );
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        labels: {
          trim: false
        },
        categories: [
          "01 Jan",
          "02 Jan",
          "03 Jan",
          "04 Jan",
          "05 Jan",
          "06 Jan",
          "07 Jan",
          "08 Jan",
          "09 Jan",
          "10 Jan",
          "11 Jan",
          "12 Jan"
        ]
      },
      tooltip: {
        y: [
          {
            title: {
              formatter: function(val: string) {
                return val + " (mins)";
              }
            }
          },
          {
            title: {
              formatter: function(val: string) {
                return val + " per session";
              }
            }
          },
          {
            title: {
              formatter: function(val: string) {
                return val;
              }
            }
          }
        ]
      },
      grid: {
        borderColor: "#f1f1f1"
      }
    };
  }

  // LINE COLUMN
  initLC(): void {
    this.chartLCOptions = {
      series: [
        {
          name: "Website Blog",
          type: "column",
          data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
        },
        {
          name: "Social Media",
          type: "line",
          data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
        }
      ],
      chart: {
        height: 350,
        type: "line"
      },
      stroke: {
        width: [0, 4]
      },
      title: {
        text: "Traffic Sources"
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      labels: [
        "01 Jan 2001",
        "02 Jan 2001",
        "03 Jan 2001",
        "04 Jan 2001",
        "05 Jan 2001",
        "06 Jan 2001",
        "07 Jan 2001",
        "08 Jan 2001",
        "09 Jan 2001",
        "10 Jan 2001",
        "11 Jan 2001",
        "12 Jan 2001"
      ],
      xaxis: {
        type: "datetime"
      },
      yaxis: [
        {
          title: {
            text: "Website Blog"
          }
        },
        {
          opposite: true,
          title: {
            text: "Social Media"
          }
        }
      ]
    };
  }

  /*/ LINE AREA COLUMN
  initLAC(): void {
    this.chartLACOptions = {
      series: [
        {
          name: "TEAM A",
          type: "column",
          data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30]
        },
        {
          name: "TEAM B",
          type: "area",
          data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43]
        },
        {
          name: "TEAM C",
          type: "line",
          data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        stacked: false
      },
      stroke: {
        width: [0, 2, 5],
        curve: "smooth"
      },
      plotOptions: {
        bar: {
          columnWidth: "50%"
        }
      },

      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      labels: [
        "01/01/2003",
        "02/01/2003",
        "03/01/2003",
        "04/01/2003",
        "05/01/2003",
        "06/01/2003",
        "07/01/2003",
        "08/01/2003",
        "09/01/2003",
        "10/01/2003",
        "11/01/2003"
      ],
      markers: {
        size: 0
      },
      xaxis: {
        type: "datetime"
      },
      yaxis: {
        title: {
          text: "Points"
        },
        min: 0
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function(y) {
            if (typeof y !== "undefined") {
              return y.toFixed(0) + " points";
            }
            return y;
          }
        }
      }
    };
  }*/

  // TIME LINE
  initTimeline(): void {
    this.chartTimelineOptions = {
      series: [
        {
          name: "Bob",
          data: [
            {
              x: "Design",
              y: [
                new Date("2019-03-05").getTime(),
                new Date("2019-03-08").getTime()
              ]
            },
            {
              x: "Code",
              y: [
                new Date("2019-03-08").getTime(),
                new Date("2019-03-11").getTime()
              ]
            },
            {
              x: "Test",
              y: [
                new Date("2019-03-11").getTime(),
                new Date("2019-03-16").getTime()
              ]
            }
          ]
        },
        {
          name: "Joe",
          data: [
            {
              x: "Design",
              y: [
                new Date("2019-03-02").getTime(),
                new Date("2019-03-05").getTime()
              ]
            },
            {
              x: "Code",
              y: [
                new Date("2019-03-06").getTime(),
                new Date("2019-03-09").getTime()
              ]
            },
            {
              x: "Test",
              y: [
                new Date("2019-03-10").getTime(),
                new Date("2019-03-19").getTime()
              ]
            }
          ]
        }
      ],
      chart: {
        height: 350,
        type: "rangeBar"
      },
      plotOptions: {
        bar: {
          horizontal: true
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function(val: string) {
          var a = moment(val[0]);
          var b = moment(val[1]);
          var diff = b.diff(a, "days");
          return diff + (diff > 1 ? " days" : " day");
        }
      },
      xaxis: {
        type: "datetime"
      },
      legend: {
        position: "top"
      }
    };
  }

  // AREA DATATIME
  public updateOptions(option: any): void {
    const updateOptionsData: any = {
      "jan": {
        xaxis: {
          min: new Date("01 Jan "+ this.annee).getTime(),
          max: new Date("31 Jan "+ this.annee).getTime()
        }
      },
      "feb": {
        xaxis: {
          min: new Date("01 Feb "+ this.annee).getTime(),
          max: new Date("28 Feb "+ this.annee).getTime()
        }
      },
      "mar": {
        xaxis: {
          min: new Date("01 Mar "+ this.annee).getTime(),
          max: new Date("31 Mar "+ this.annee).getTime()
        }
      },
      "apr": {
        xaxis: {
          min: new Date("01 Apr "+ this.annee).getTime(),
          max: new Date("30 Apr "+ this.annee).getTime()
        }
      },
      "may": {
        xaxis: {
          min: new Date("01 May "+ this.annee).getTime(),
          max: new Date("31 May "+ this.annee).getTime()
        }
      },
      "jun": {
        xaxis: {
          min: new Date("01 Jun "+ this.annee).getTime(),
          max: new Date("30 Jun "+ this.annee).getTime()
        }
      },
      "jul": {
        xaxis: {
          min: new Date("01 Jul "+ this.annee).getTime(),
          max: new Date("31 Jul "+ this.annee).getTime()
        }
      },
      "aug": {
        xaxis: {
          min: new Date("01 Aug "+ this.annee).getTime(),
          max: new Date("31 Aug "+ this.annee).getTime()
        }
      },
      "sep": {
        xaxis: {
          min: new Date("01 Sep "+ this.annee).getTime(),
          max: new Date("30 Sep "+ this.annee).getTime()
        }
      },
      "oct": {
        xaxis: {
          min: new Date("01 Oct "+ this.annee).getTime(),
          max: new Date("31 Oct "+ this.annee).getTime()
        }
      },
      "nov": {
        xaxis: {
          min: new Date("01 Nov "+ this.annee).getTime(),
          max: new Date("30 Nov "+ this.annee).getTime()
        }
      },
      "dec": {
        xaxis: {
          min: new Date("01 Dec "+ this.annee).getTime(),
          max: new Date("31 Dec "+ this.annee).getTime()
        }
      },
      "jan-jun": {
        xaxis: {
          min: new Date("01 Jan "+ this.annee).getTime(),
          max: new Date("30 Jun "+ this.annee).getTime()
        }
      },
      all: {
        xaxis: {
          min: undefined,
          max: undefined
        }
      }
    };
    this.activeOptionButton = option;
    this.chartDatetime.updateOptions(updateOptionsData[option], false, true, true);
  }
}
