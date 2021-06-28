import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MinifierRoutingModule } from './minifier-routing.module';
import { MinifierComponent } from './minifier.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    MinifierComponent
  ],
  imports: [
    CommonModule,
    MinifierRoutingModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    FontAwesomeModule
  ]
})
export class MinifierModule { }
