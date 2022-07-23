import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component'

import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AuthInterceptor } from './services/authconfig.interceptor';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {ErrorKey} from '../custom-pipes/error';

import { AppRoutingModule } from './app-routing.module';
import { ContactListComponent } from './contact-list/contact-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactComponent,
    SigninComponent,
    SignupComponent,
    HomeComponent,
    ErrorKey,
    ContactListComponent,
  ],
  imports: [
    BrowserModule,HttpClientModule,FormsModule,ReactiveFormsModule,AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
