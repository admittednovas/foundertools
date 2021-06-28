import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VtoolboxUpdateComponent } from './vtoolbox-update.component';

const routes: Routes = [{ path: '', component: VtoolboxUpdateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VtoolboxUpdateRoutingModule { }
