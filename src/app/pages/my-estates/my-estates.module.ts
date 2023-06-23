import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MyEstatesRoutingModule} from './my-estates-routing.module';
import {AppModule} from "../../app.module";


@NgModule({
  declarations: [],
    imports: [
      CommonModule,
      MyEstatesRoutingModule,
      AppModule
    ]
})
export class MyEstatesModule { }
