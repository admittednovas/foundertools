import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CsvSplitterRoutingModule } from './csv-splitter-routing.module';
import { CsvSplitterComponent } from './csv-splitter.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
	
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    CsvSplitterComponent
  ],
  imports: [
    CommonModule,
    CsvSplitterRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatCardModule,
    FontAwesomeModule
  ]
})
export class CsvSplitterModule { }
