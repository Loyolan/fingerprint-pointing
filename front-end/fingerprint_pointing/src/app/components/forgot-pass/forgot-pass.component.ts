import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.css']
})
export class ForgotPassComponent implements OnInit {

  session: any;
  constructor(
    private router: Router,
    private userService: UsersService
    ) { 
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
