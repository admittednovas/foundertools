import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: '404', loadChildren: () => import('./pages/not-found/not-found.module').then(m => m.NotFoundModule) },
  { path: 'about', loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule) },
  { path: 'privacy-policy', loadChildren: () => import('./pages/privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyModule) },
  { path: 'release-notes', loadChildren: () => import('./pages/release-notes/release-notes.module').then(m => m.ReleaseNotesModule) },
  { path: 'v1', loadChildren: () => import('./tools/v1/v1-routing.module').then(m => m.V1RoutingModule)},
  { path: 'volt', loadChildren: () => import('./tools/volt/volt.module').then(m => m.VoltModule)},
  { path: 'utility', loadChildren: () => import('./tools/utility/utility.module').then(m => m.UtilityModule)},
  { path: 'vtoolbox-update', loadChildren: () => import('./pages/vtoolbox-update/vtoolbox-update.module').then(m => m.VtoolboxUpdateModule) },
  { path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
