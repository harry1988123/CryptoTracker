import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyHeaderComponent } from './body-header/body-header.component';
import { CardComponent } from './card/card.component'  
import { HighchartsChartModule } from 'highcharts-angular';
import { HttpClientModule } from '@angular/common/http';
  

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyHeaderComponent,
    CardComponent, 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HighchartsChartModule ,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
