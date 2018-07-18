import { Component, OnInit } from '@angular/core';

import { MomentDatePipe } from '../moment-date';
import { AssetReadingsService } from '../services/asset-readings.service';
import { StatisticsService } from '../services/statistics.service';
import { PingService } from '../services/ping.service';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-asset-readings',
  templateUrl: './asset-readings.component.html',
  styleUrls: ['./asset-readings.component.css']
})
export class AssetReadingsComponent implements OnInit {
  public ip;
  public chartType: string;
  public chartData: any;
  public chartOptions: any;

  public currentAsset: string = 'sinusoid';
  public name: string;
  public latest_reading: number;
  public interval: number;

  public displayAsset;
  public displayPing;

  public dataRead;
  public dataSent;
  public dataPurged;
  public uptime;

  assets = [];
  assetReadings = [];
  constructor(
    private assetReadingsService: AssetReadingsService,
    private statisticsService: StatisticsService,
    private pingService: PingService
  ) { }

  ngOnInit() {
    console.log(window.location.hostname);
    // this.ip = window.location.origin;

    this.displayAsset = true;
    this.displayPing = false;
    this.chartOptions = {
      legend: {display: false},
      animation: {duration: 0},
      maintainAspectRatio: false
    };
    this.refreshData();
    this.interval = setInterval(() => {
      this.refreshData();
    }, 2000);
  }

  showAsset(asset) {
    this.currentAsset = asset;
    this.displayAsset = true;
    this.displayPing = false;
  }

  showStatus() {
    this.displayAsset = false;
    this.displayPing = true;
    this.currentAsset = null;
    /* TODO: show graph of data in and data to PI */
  }

  refreshData() {
    this.getAsset();
    if(this.currentAsset)
      this.getAssetReadings(this.currentAsset, 60);
    this.ping();
    // this.getStatistics();
    // this.getStatisticsHistory(60);
  }

  public getAsset(): void {
    // this.assets = [];
    this.assetReadingsService.getAsset().subscribe(
      (data: any[]) => {
        this.assets = data;
      },
      error => { console.log(error); }
    );
  }

  public getAssetReadings(asset, limit): void {
    this.assetReadingsService.getAssetReadings(asset, limit).subscribe(
      (data: any[]) => {
        this.getAssetTimeReading(data);
      },
      error => { console.log(error); }
    );
  }

  public ping() : void {
    this.pingService.ping().subscribe(
        (data: any[]) => {
          this.processPingData(data);
        },
        error => { console.log(error); }
      );
  }

  public processPingData(pingResponse) : void {
    this.dataRead = pingResponse.dataRead;
    this.dataSent = pingResponse.dataSent;
    this.dataPurged = pingResponse.dataPurged;

    const totSecs: number = Math.floor(pingResponse.uptime);
    const upHours: number = Math.floor(totSecs/3600);
    const upMins: number = Math.floor((totSecs-upHours*3600)/60);
    this.uptime =
      upHours.toString().padStart(2,'0') + ':' +
      upMins.toString().padStart(2, '0') + ':' +
      (totSecs - upHours*3600 - upMins*60).toString().padStart(2, '0');
  }

  // public getStatistics(): void {
  //   this.statisticsService.getStatistics().subscribe(
  //     (data: any[]) => {
  //       // console.log(data);
  //       // console.log(data[7].value); // Readings
  //       // console.log(data[8].value); // SENT_1
  //       this.readings = data[7].value;
  //       this.sent_1 = data[8].value;
  //       // this.getAssetTimeReading(data);
  //     },
  //     error => { console.log(error); }
  //   );
  // }

  // public getStatisticsHistory(limit): void {
  //   this.statisticsService.getStatisticsHistory(limit).subscribe(
  //     (data: any[]) => {
  //       // console.log(data.statistics);
  //       // this.getAssetTimeReading(data);
  //     },
  //     error => { console.log(error); }
  //   );
  // }

  getAssetTimeReading(assetChartRecord) {
    const assetTimeLabels = [];
    let assetReading = [];
    const first_dataset = [];
    const second_dataset = [];
    const third_dataset = [];
    let d1;
    let d2;
    let d3;
    const datePipe = new MomentDatePipe();

    const first = assetChartRecord[0].reading;
    Object.keys(first).forEach(key => {
      this.latest_reading = first[key];
    });

    assetChartRecord.reverse().forEach(data => {
      let count = 0;
      Object.keys(data.reading).forEach(key => {
        count++;
        switch (count) {
          case 1:
            first_dataset.push(data.reading[key]);
            d1 = {
              data: first_dataset,
              label: key
            };
            break;
          case 2:
            second_dataset.push(data.reading[key]);
            d2 = {
              data: second_dataset,
              label: key
            };
            break;
          case 3:
            third_dataset.push(data.reading[key]);
            d3 = {
              data: third_dataset,
              label: key
            };
            break;
          default:
            break;
        }
      });
      assetTimeLabels.push(datePipe.transform(data.timestamp, 'HH:mm:ss'));
    });
    assetReading.push(d1);
    assetReading.push(d2);
    assetReading.push(d3);
    // remove undefined dataset from the array
    assetReading = assetReading.filter(function (n) { return n !== undefined; });
    this.statsAssetReadingsGraph(assetTimeLabels, assetReading);
    this.name = d1.label;
  }

  statsAssetReadingsGraph(labels, assetReading): void {
    let ds = [];
    if (assetReading.length === 3) {
      const d1 = assetReading[0].data;
      const d2 = assetReading[1].data;
      const d3 = assetReading[2].data;
      ds = [{
        label: assetReading[0].label,
        data: d1,
        fill: false,
        lineTension: 0.1,
        spanGaps: true,
        backgroundColor: '#3498DB',
        borderColor: '#85C1E9'
      },
      {
        label: assetReading[1].label,
        data: d2,
        fill: false,
        lineTension: 0.1,
        spanGaps: true,
        backgroundColor: '#239B56',
        borderColor: '#82E0AA',
      },
      {
        label: assetReading[2].label,
        data: d3,
        fill: false,
        lineTension: 0.1,
        spanGaps: true,
        backgroundColor: '#B03A2E',
        borderColor: '#F1948A',
      }];
    } else if (assetReading.length === 2) {
      const d1 = assetReading[0].data;
      const d2 = assetReading[1].data;
      ds = [{
        label: assetReading[0].label,
        data: d1,
        fill: false,
        lineTension: 0.1,
        spanGaps: true,
        backgroundColor: '#3498DB',
        borderColor: '#85C1E9'
      },
      {
        label: assetReading[1].label,
        data: d2,
        fill: false,
        lineTension: 0.1,
        spanGaps: true,
        backgroundColor: '#239B56',
        borderColor: '#82E0AA',
      }];
    } else {
      ds = [{
        label: assetReading[0].label,
        data: assetReading[0].data,
        fill: false,
        lineTension: 0.1,
        spanGaps: true,
        backgroundColor: '#239B56',
        borderColor: '#82E0AA',
      }];
    }
    this.chartType = 'line';
    this.chartData = {
      labels: labels,
      datasets: ds
    };
  }
}
