import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  session: any;
  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
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

  /** authentification */
  onSubmitLogin() {
    const loginValue = this.loginForm.value;
    this.userService.authentification(loginValue['nom'], loginValue['password']).subscribe((data) => {
      let a = document.getElementById('alert');
      let t = document.getElementById('traitement');
      a!.innerHTML = '';
      t!.innerHTML = '<i class="pe-7s-lock"></i> <i class="pe-7s-more"></i> <i class="pe-7s-unlock"></i>';
      setTimeout(()=>{
        if (data.user) {
            a!.innerHTML = '<span class="text-success ml-4"><i class="fa fa-checked"></i> Acces accordé!!!</span>';
            setTimeout(() => {
              let u = {"id": data.user.userId, "nom": data.user.username, "password": data.user.password };
              this.userService.addUserToSession(u);
              location.reload();
            }, 3000);
        } else {
            setTimeout(() => {
              a!.innerHTML = '<span class="text-danger ml-4"><i class="fa fa-warning"></i> Acces refusé!!!</span>';
              t!.innerHTML = '';
            }, 3000);
        }
      }, 3000);
    })
  }
}
