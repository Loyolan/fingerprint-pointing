import { UsersService } from '../services/users.service';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  isAdmin: boolean = false;
  session: any;
  constructor(
    private userService: UsersService,
    private router: Router,
    private readonly notifier: NotifierService) { 
    this.session = this.userService.getUserSession();
    
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
    this.userService.getOneUser(this.session.id).subscribe((data)=>{
      if(data.role == "ADMIN") {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    });
    if (this.isAdmin) {
      return true;
    } else {
      this.router.navigate(['/eni/figerprint_pointing/login']);
      return false;
    }
  }
}
