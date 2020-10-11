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
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';


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
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyA4zLnNj7eIRikOmV02h0E5FDYl6FLpR7s",
      authDomain: "wow-addon-client.firebaseapp.com",
      databaseURL: "https://wow-addon-client.firebaseio.com",
      projectId: "wow-addon-client",
      storageBucket: "wow-addon-client.appspot.com",
      messagingSenderId: "103511290845",
      appId: "1:103511290845:web:2d047aa45a006abafe3c34"
    }),
    AngularFirestoreModule,
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule {}
