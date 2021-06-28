import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchemaGeneratorRoutingModule } from './schema-generator-routing.module';
import { SchemaGeneratorComponent } from './schema-generator.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    SchemaGeneratorComponent
  ],
  imports: [
    CommonModule,
    SchemaGeneratorRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatRadioModule,
    MatCheckboxModule,
    FontAwesomeModule
  ]
})
export class SchemaGeneratorModule { }
