import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImportTesterComponent } from './import-tester.component';

const routes: Routes = [{ path: '', component: ImportTesterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportTesterRoutingModule { }
