import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path: 'eni/figerprint_pointing/home', component: HomeComponent },
  { path: '', redirectTo: 'eni/figerprint_pointing/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

//  { path: '**', canActivate: [AuthGuard], component: FourOFourComponent }
