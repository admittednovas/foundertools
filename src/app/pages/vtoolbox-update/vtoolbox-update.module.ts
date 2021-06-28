import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VtoolboxUpdateRoutingModule } from './vtoolbox-update-routing.module';
import { VtoolboxUpdateComponent } from './vtoolbox-update.component';

import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    VtoolboxUpdateComponent
  ],
  imports: [
    CommonModule,
    VtoolboxUpdateRoutingModule,
    MatCardModule
  ]
})
export class VtoolboxUpdateModule { }
