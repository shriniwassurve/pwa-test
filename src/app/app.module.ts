import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatIconModule, MatDialogModule, MatButtonModule } from '@angular/material';
import { InstallAppDialogComponent } from './install-app-dialog/install-app-dialog.component';
import { UpdateAvailableComponent } from './update-available/update-available.component';
@NgModule({
  declarations: [
    AppComponent,
    InstallAppDialogComponent,
    UpdateAvailableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  entryComponents: [InstallAppDialogComponent, UpdateAvailableComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
