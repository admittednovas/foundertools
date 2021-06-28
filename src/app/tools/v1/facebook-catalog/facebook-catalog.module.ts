import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacebookCatalogRoutingModule } from './facebook-catalog-routing.module';
import { FacebookCatalogComponent } from './facebook-catalog.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';

@NgModule({
  declarations: [
    FacebookCatalogComponent
  ],
  imports: [
    CommonModule,
    FacebookCatalogRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSidenavModule,
    MatSelectModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatCardModule
  ]
})
export class FacebookCatalogModule { }
