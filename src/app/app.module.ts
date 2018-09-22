import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { MomentDatePipe } from './moment-date';

import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { AssetReadingsComponent } from './asset-readings/asset-readings.component';
import { ChartComponent } from './chart/chart.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    AssetReadingsComponent,
    ChartComponent,
    MomentDatePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
