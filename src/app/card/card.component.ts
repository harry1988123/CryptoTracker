import { Component, Input, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { webSocket } from 'rxjs/webSocket';
import { of, Subject, Subscription } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  BitCoin:any;
  @Input() cryptoCoinType! : any;
  @Input() cryptoCoinSortName : any;

  rate: any;
  rate$: Subscription | undefined; 
  chardata: any[] = [];
  chartOptions: any;
  subject:any;
  SocketUrl = `wss://ws.coincap.io/prices?assets=${this.cryptoCoinType}`;

  

  constructor() { }

  drawChart(currentSubject:any,cryptoCoinType:any,cryptoCoinSortName:any){
    this.rate = currentSubject.pipe(
      concatMap(item => of (item).pipe(delay(1000)))
    ).subscribe((data: any) => {
      this.rate = data;
      this.chardata.push(Number(this.rate[cryptoCoinType]))
      this.chartOptions = {
        series: [{ 
          data: this.chardata,
          dataLabels: {
            enabled: false
          },
        },],
        title:{
           text: cryptoCoinSortName + " " + "<img src='https://assets.coincap.io/assets/icons/" + cryptoCoinSortName + "@2x.png" +" />"
        },
        chart: {
          type: "line",
          zoomType: 'x',
          //backgroundColor: '#303862', 
          backgroundColor: '#FFF',
          color: '#000'
        },
        xAxis:{
          enabled: false,
          visible: true,
        },
        yAxis:{
          enabled: true,
          visible: true,
          labels: {
            enabled: true
          },
        },
        labels:{
          enable: false
        }, 
        credits: {
          enabled: false
        }
      };
    })
  }

  ngOnInit(): void {
    this.subject = webSocket(this.SocketUrl);
    const currentSubject = this.subject;
    this.drawChart(currentSubject, this.cryptoCoinType, this.cryptoCoinSortName);
  }
}
