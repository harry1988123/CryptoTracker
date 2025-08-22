import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CryptoServiceService {

  counter = 4;
  counterSub: Subject<number> = new Subject<number>();

  constructor(public http: HttpClient) { }

  increaseCounter() {
    this.counterSub.next(this.counter++);
  }

  getCouterCount() {
    return this.counterSub.asObservable();
  }

  getCryptoList() {
    return this.http.get(`https://rest.coincap.io/v3/assets?apiKey=${environment.apiKey}`);
  }

}
