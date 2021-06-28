import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FieldMapperComponent } from './field-mapper.component';

const routes: Routes = [{ path: '', component: FieldMapperComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FieldMapperRoutingModule { }
