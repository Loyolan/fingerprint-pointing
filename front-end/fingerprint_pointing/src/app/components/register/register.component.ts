import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  session: any;

  constructor(
    private router: Router,
    private userService: UsersService) { 
    this.session = this.userService.getUserSession();
  }

  ngOnInit(): void {
    this.initIsAuth();
  }

  initIsAuth() {
    if (this.session.nom != null) {
      this.router.navigate([`/eni/figerprint_pointing/home`]);
    }
  }
}
