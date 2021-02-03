import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/auth-guard.service';
import { AdminGuard } from './services/admin-guard.service';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';
import { UsersComponent } from './components/users/users.component';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { ProfsComponent } from './components/profs/profs.component';
import { EtudiantsComponent } from './components/etudiants/etudiants.component';
import { AnneeUnivComponent } from './components/annee-univ/annee-univ.component';
import { NiveauComponent } from './components/niveau/niveau.component';
import { ParcoursComponent } from './components/parcours/parcours.component';
import { MatieresComponent } from './components/matieres/matieres.component';

const routes: Routes = [
  { path: 'eni/fingerprint_pointing/home', canActivate:[AuthGuard], component: HomeComponent },
  { path: 'eni/fingerprint_pointing/annee_universitaires', canActivate: [AuthGuard], component: AnneeUnivComponent },
  { path: 'eni/fingerprint_pointing/niveaux', canActivate: [AuthGuard], component: NiveauComponent },
  { path: 'eni/fingerprint_pointing/parcours', canActivate: [AuthGuard], component: ParcoursComponent },
  { path: 'eni/fingerprint_pointing/matieres', canActivate: [AuthGuard], component: MatieresComponent },
  { path: 'eni/fingerprint_pointing/profs', canActivate: [AuthGuard], component: ProfsComponent },
  { path: 'eni/fingerprint_pointing/etudiants', canActivate: [AuthGuard], component: EtudiantsComponent },
  { path: 'eni/fingerprint_pointing/login', component: LoginComponent },
  { path: 'eni/fingerprint_pointing/register', component: RegisterComponent },
  { path: 'eni/fingerprint_pointing/forgot_pass', component: ForgotPassComponent },
  { path: 'eni/fingerprint_pointing/administrations', canActivate:[AdminGuard], component: UsersComponent},
  { path: '', redirectTo: 'eni/fingerprint_pointing/home', pathMatch: 'full' },
  { path: '**', canActivate: [AuthGuard], component: FourOhFourComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
