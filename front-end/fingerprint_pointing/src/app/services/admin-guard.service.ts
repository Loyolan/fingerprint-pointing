import { UsersService } from '../services/users.service';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  user: any;
  session: any;
  constructor(
    private userService: UsersService,
    private router: Router,
    private readonly notifier: NotifierService) { 
    this.session = this.userService.getUserSession();
    this.userService.getOneUser(this.session.id).subscribe((data)=>{
      this.user = data;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
    if(this.user.role == "ADMIN") {
      return true;
    } else {
      this.router.navigate(['/eni/figerprint_pointing/login']);
      return false;
    }
  }
}
