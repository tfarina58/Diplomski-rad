import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstateDetailsRoutingModule } from './estate-details-routing.module';
import {AppModule} from "../../../app.module";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EstateDetailsRoutingModule,
    AppModule
  ]
})
export class EstateDetailsModule { }
