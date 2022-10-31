import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {

  session: any;
  constructor(
    private router: Router,
    private userService: UsersService,
    private readonly notifier: NotifierService
    ) { 
    this.session = this.userService.getUserSession();
  }

  ngOnInit(): void {
    this.initIsAuth();
    setTimeout(()=> {
      this.notifier.notify('info', 'Veuillez renseigner l\'adresse mail de votre compte!');
      setTimeout(()=>{
        this.notifier.notify('info', 'L\'admin vous enverra un mail de reinitialisation!');
        setTimeout(()=>{
          this.notifier.notify('warning', 'En attendant, Vous n\'avez pas le droit d\'accés');
        }, 3000);
      }, 3000);
    }, 5000);
  }

  initIsAuth() {
    if (this.session.nom != null) {
      this.router.navigate([`/eni/figerprint_pointing/home`]);
    }
  }
}
