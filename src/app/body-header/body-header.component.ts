import { Component, OnInit } from '@angular/core';
import { CryptoServiceService } from '../crypto-service.service';

@Component({
  selector: 'app-body-header',
  templateUrl: './body-header.component.html',
  styleUrls: ['./body-header.component.scss']
})
export class BodyHeaderComponent implements OnInit {

  constructor(private cryptoSer : CryptoServiceService) { }

  ngOnInit(): void {
  }
  moveLeft(){
    console.log(this.cryptoSer.counter);
  }

  moveRight(){
    this.cryptoSer.increaseCounter();
  }
}
