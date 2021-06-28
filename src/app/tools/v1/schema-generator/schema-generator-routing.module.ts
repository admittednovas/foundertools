import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SchemaGeneratorComponent } from './schema-generator.component';

const routes: Routes = [{ path: '', component: SchemaGeneratorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SchemaGeneratorRoutingModule { }
