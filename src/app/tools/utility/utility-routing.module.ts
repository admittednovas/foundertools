import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'csv-splitter', loadChildren: () => import('./csv-splitter/csv-splitter.module').then(m => m.CsvSplitterModule) }, { path: 'minifier', loadChildren: () => import('./minifier/minifier.module').then(m => m.MinifierModule) }, { path: 'character-counter', loadChildren: () => import('./character-counter/character-counter.module').then(m => m.CharacterCounterModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilityRoutingModule { }
