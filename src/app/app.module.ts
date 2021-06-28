import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { V1Module } from './tools/v1/v1.module';
import { VoltModule } from './tools/volt/volt.module';
import { UtilityModule } from './tools/utility/utility.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CheckbreakpointService } from './services/checkbreakpoint.service';
import { LinkService } from './services/link.service';

import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    V1Module,
    VoltModule,
    UtilityModule,
    MatToolbarModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [CheckbreakpointService, LinkService],
  bootstrap: [AppComponent]
})
export class AppModule { }
