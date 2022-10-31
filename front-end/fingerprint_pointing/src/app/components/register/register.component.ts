import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  session: any;
  registerForm: FormGroup;

  constructor(
    private router: Router,
    private userService: UsersService,
    private fb: FormBuilder,
    private readonly notifier: NotifierService) { 
    this.session = this.userService.getUserSession();
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      email: ['', [Validators.required, Validators.email]],
      fullname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      conf: ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.initIsAuth();
    setTimeout(()=> {
      this.notifier.notify('info', 'Veuillez renseigner votre information ici!');
      setTimeout(()=>{
        this.notifier.notify('info', 'L\'admin vous enverra un mail de confirmation!');
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

  // REGISTRATION
  onSubmitRegisterForm() {
    const user = this.registerForm.value;
    if (user.password != user.conf){
      this.notifier.notify('warning', 'Mot de passe de confirmation incorrect');
    } else {
      this.userService.addUser(user).subscribe((data)=>{
        if (data.status == 'success') {
          this.notifier.notify('success', data.message);
          setTimeout(()=>{
            this.notifier.notify('info', 'L\'admin vous enverra un mail de confirmation!');
            setTimeout(()=>{
              this.router.navigate(['/eni/figerprint_pointing/login']);
            })
          }, 3000);
        } else {
          this.notifier.notify(data.status, data.message);
        }
      });
    }
  }
}
