import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CsvSplitterComponent } from './csv-splitter.component';

const routes: Routes = [{ path: '', component: CsvSplitterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CsvSplitterRoutingModule { }
