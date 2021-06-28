import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterCounterRoutingModule } from './character-counter-routing.module';
import { CharacterCounterComponent } from './character-counter.component';
import { FormsModule } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    CharacterCounterComponent
  ],
  imports: [
    CommonModule,
    CharacterCounterRoutingModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class CharacterCounterModule { }
