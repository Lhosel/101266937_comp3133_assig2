import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SignupComponent } from './signup/signup.component';

import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { LoginComponent } from './login/login.component';
import { ViewlistingsComponent } from './viewlistings/viewlistings.component';
import { HomeComponent } from './home/home.component';
import { SearchlistingComponent } from './searchlisting/searchlisting.component';
import { AddbookingComponent } from './addbooking/addbooking.component';
import { BookingsComponent } from './bookings/bookings.component';
import { AddlistingComponent } from './addlisting/addlisting.component';
import { CreatedComponent } from './created/created.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PagenotfoundComponent,
    SignupComponent,
    LoginComponent,
    ViewlistingsComponent,
    HomeComponent,
    SearchlistingComponent,
    AddbookingComponent,
    BookingsComponent,
    AddlistingComponent,
    CreatedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    FormsModule,
    SweetAlert2Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
