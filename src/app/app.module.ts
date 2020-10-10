import 'reflect-metadata';
import '../polyfills';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ElectronService } from './core/services';
import { PageNotFoundComponent } from './shared/components';
import { HomeComponent } from './home/home.component';
import { AddonInstallComponent } from './install/install.component';


@NgModule({
  declarations: [
    AppComponent,
    AddonInstallComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule {}
