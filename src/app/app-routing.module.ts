import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetReadingsComponent } from './asset-readings/asset-readings.component';

const routes: Routes = [
  { path: 'reading', component: AssetReadingsComponent },
  { path: '',   redirectTo: '/reading', pathMatch: 'full' }
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes, {}) ]
})
export class AppRoutingModule { }
