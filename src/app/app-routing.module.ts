import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddbookingComponent } from './addbooking/addbooking.component';
import { AddlistingComponent } from './addlisting/addlisting.component';
import { BookingsComponent } from './bookings/bookings.component';
import { CreatedComponent } from './created/created.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { SearchlistingComponent } from './searchlisting/searchlisting.component';
import { SignupComponent } from './signup/signup.component';
import { ViewlistingsComponent } from './viewlistings/viewlistings.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'listings', component: ViewlistingsComponent },
  { path: 'search', component: SearchlistingComponent },
  { path: 'book/:id', component: AddbookingComponent },
  { path: 'bookings', component: BookingsComponent },
  { path: 'add', component: AddlistingComponent },
  { path: 'created', component: CreatedComponent },
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
