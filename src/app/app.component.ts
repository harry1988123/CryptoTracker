import { Component } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { of, Subscription } from 'rxjs';
import { concatMap, delay } from 'rxjs/operators';
import { getDeferredAnimation } from 'highcharts';
import { CryptoServiceService } from './crypto-service.service';
import * as _ from 'lodash';
import { split } from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CryptoTracker'; 
  listOfCrypto = ['bitcoin','ethereum','monero','litecoin'];   
  listSubscription!: Subscription;
  totalNumberOfCryptoList: any[] = [];
  coinListRawData: any[] = [];
  coinSortNameList: any[] = [];

  constructor(public cryptoSer: CryptoServiceService){  }

  ngOnInit(){
    this.listSubscription = this.cryptoSer.getCryptoList()
    .subscribe((res:any)=>{ 
      console.log(res);
      this.coinListRawData = res.data; 
      this.totalNumberOfCryptoList = _.uniq(_.map(res.data,"id"));
      this.getShortNameofCoin();
      //this.generateListFromCounter();
    },(error)=>{
      console.log(error);
    },()=>{
      console.log("Completed");
    })
    
  }

  generateListFromCounter(){
    // this.cryptoSer.getCouterCount().subscribe(count => {
    //   this.listOfCrypto = this.totalNumberOfCryptoList.slice(0,count);
    // })   
    //this.listOfCrypto =  this.totalNumberOfCryptoList.slice(0,4);
  }

  getShortNameofCoin(){
    this.coinSortNameList = _.uniq(_.map(this.coinListRawData, 'symbol'));
  }

  ngOnDestroy(){
    if(this.listSubscription){
      this.listSubscription.unsubscribe();
    }
  }

}

