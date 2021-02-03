import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifierModule } from 'angular-notifier';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';
import { FourOhFourComponent } from './components/four-oh-four/four-oh-four.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ForgotPassComponent } from './components/forgot-pass/forgot-pass.component';

import { UsersService } from './services/users.service';
import { AnneeUnivService } from './services/annee-univ.service';
import { EnseignantService } from './services/enseignant.service';
import { EtudiantService } from './services/etudiant.service';
import { MatiereService } from './services/matiere.service';
import { NiveauService } from './services/niveau.service';
import { ParcoursService } from './services/parcours.service';

import { UsersComponent } from './components/users/users.component';
import { ProfsComponent } from './components/profs/profs.component';
import { EtudiantsComponent } from './components/etudiants/etudiants.component';
import { MatieresComponent } from './components/matieres/matieres.component';
import { AnneeUnivComponent } from './components/annee-univ/annee-univ.component';
import { ParcoursComponent } from './components/parcours/parcours.component';
import { NiveauComponent } from './components/niveau/niveau.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    FourOhFourComponent,
    SettingsComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPassComponent,
    UsersComponent,
    ProfsComponent,
    EtudiantsComponent,
    MatieresComponent,
    AnneeUnivComponent,
    ParcoursComponent,
    NiveauComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NotifierModule.withConfig({
      position: {
        horizontal: {
          position: 'right',
          distance: 12
        },
        vertical: {
          position: 'top',
          distance: 12,
          gap: 10
        }
      },
      behaviour: {
        autoHide: 10000,
        onMouseover: 'pauseAutoHide',
        stacking: 7
      },
      animations: {
        enabled: true,
        show: {
          preset: 'slide',
          speed: 300,
          easing: 'ease',
        },
        hide: {
          preset: 'fade',
          speed: 300,
          easing: 'ease',
          offset: 50
        },
        shift: {
          speed: 300,
          easing: 'ease'
        },
        overlap: 150
      }
    })
  ],
  providers: [
    UsersService,
    AnneeUnivService,
    EnseignantService,
    EtudiantService,
    MatiereService,
    NiveauService,
    ParcoursService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
