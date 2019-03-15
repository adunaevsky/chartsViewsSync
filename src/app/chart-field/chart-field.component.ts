import { Component, NgZone, OnInit, Input, EventEmitter, Output, SimpleChanges } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

import { ChartSyncService } from '../chart-sync.service';
import { Subscription } from 'rxjs';

am4core.useTheme(am4themes_animated);


@Component({
  selector: 'app-chart-field',
  templateUrl: './chart-field.component.html',
  styleUrls: ['./chart-field.component.css']
})
export class ChartFieldComponent implements OnInit {
  private chart: am4charts.XYChart;
  subscription: Subscription;

  @Input() id: number;
 /*  @Output() newScrollPosition: EventEmitter<any> = new EventEmitter(); */
  start: number;
  end: number;

  constructor(private zone: NgZone, private chartSync: ChartSyncService) {



  }

  ngOnInit() {
  }

  /*   ngOnChanges(chartSpecs: SimpleChanges) {
      console.log(this.chartSpecs)
    }
   */
  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv" + this.id, am4charts.XYChart);

      chart.paddingRight = 20;

      let data = [];
      let visits = 10;
      for (let i = 1; i < 366; i++) {
        visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
     //   data.push({ date:i , name: "name" + i, value: visits });
        data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
      }

      chart.data = data;

      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.grid.template.location = 0;
      dateAxis.events.on('ready', () => {
        dateAxis.zoom({ start: 2 / 3, end: 1 }, false, true);
      });

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.tooltip.disabled = true;
      valueAxis.renderer.minWidth = 35;

      let series = chart.series.push(new am4charts.LineSeries());
      series.dataFields.dateX = "date";
      series.dataFields.valueY = "value";

      series.tooltipText = "{valueY.value}";
      chart.cursor = new am4charts.XYCursor();

      //cont vs let variable?
      let scrollbarX = new am4charts.XYChartScrollbar();
      scrollbarX.series.push(series);
      scrollbarX.events.on('rangechanged', (e) => {

        this.chartSync.announceScrollStats({
          start: e.target.start,
          end: e.target.end
        });

      });
      chart.scrollbarX = scrollbarX;

      this.chart = chart;


      this.subscription = this.chartSync.sharedScrollStats$.subscribe(
        d => {
          dateAxis.zoom({ start: d.start, end: d.end }, false, true);

        }
      );

    });
  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });

    this.subscription.unsubscribe();
  }

}
