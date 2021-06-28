import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReleaseNotesRoutingModule } from './release-notes-routing.module';
import { ReleaseNotesComponent } from './release-notes.component';

import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    ReleaseNotesComponent
  ],
  imports: [
    CommonModule,
    ReleaseNotesRoutingModule,
    MatCardModule,
    MatExpansionModule,
    FontAwesomeModule
  ]
})
export class ReleaseNotesModule { }
