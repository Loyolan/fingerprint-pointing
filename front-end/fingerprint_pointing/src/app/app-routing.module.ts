import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';

import { AuthGuard } from './services/auth-guard.service';


const routes: Routes = [
  { path: 'eni/figerprint_pointing/home', canActivate:[AuthGuard], component: HomeComponent },
  { path: 'eni/figerprint_pointing/login', component: LoginComponent },
  { path: 'eni/figerprint_pointing/register', component: RegisterComponent },
  { path: 'eni/figerprint_pointing/forgot_pass', component: ForgotPassComponent },
  { path: '', redirectTo: 'eni/figerprint_pointing/home', pathMatch: 'full' },
  { path: '**', canActivate: [AuthGuard], component: FourOhFourComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
