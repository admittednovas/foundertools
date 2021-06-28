import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'import-tester', loadChildren: () => import('./import-tester/import-tester.module').then(m => m.ImportTesterModule) },
  { path: 'schema-generator', loadChildren: () => import('./schema-generator/schema-generator.module').then(m => m.SchemaGeneratorModule) },
  { path: 'field-mapper', loadChildren: () => import('./field-mapper/field-mapper.module').then(m => m.FieldMapperModule) }, { path: 'facebook-catalog-creator', loadChildren: () => import('./facebook-catalog/facebook-catalog.module').then(m => m.FacebookCatalogModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class V1RoutingModule { }
