import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from "./material/material.module";
import { ReactiveFormsModule,FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DatePipe } from '@angular/common';


import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactComponent } from './contacts/contact/contact.component';

import { environment } from '../environments/environment';
import { ContactListComponent } from './contacts/contacts-list/contacts-list.component';
import { ContactService } from './shared/contact.service';
import { HttpService } from './shared/http.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    ContactListComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule
  ],
  providers: [
    ContactService,
    DatePipe,
    HttpService,
    
    ,
    HttpClient,



  ],
  bootstrap: [AppComponent],
  entryComponents: [ContactListComponent, ContactComponent]
})
export class AppModule { }
