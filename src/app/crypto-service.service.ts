import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoServiceService { 

  counter = 4;
  counterSub : Subject<number> = new Subject<number>();

  constructor(public http: HttpClient ) {  
    this.counterSub.subscribe((value:number) =>{
      this.counter = value;
    })
   }

   increaseCounter(){
     this.counterSub.next(this.counter++);
   }
  getCryptoList(){
    return this.http.get('https://api.coincap.io/v2/assets');
  }

}
