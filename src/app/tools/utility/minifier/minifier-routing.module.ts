import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MinifierComponent } from './minifier.component';

const routes: Routes = [{ path: '', component: MinifierComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinifierRoutingModule { }
