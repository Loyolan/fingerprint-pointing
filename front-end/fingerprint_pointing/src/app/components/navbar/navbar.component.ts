import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAdmin: any = false;
  session: any;
  user: any = null;
  updateForm: FormGroup;
  pwdForm: FormGroup;
  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private readonly notifier: NotifierService) {

    this.session = this.userService.getUserSession();
    this.userService.getOneUser(this.session.id).subscribe((data) => {
      if (data.role) {
        if (data.role == 'ADMIN') {
          this.isAdmin = true;
        }
      }
    });
    this.updateForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(12)]],
      fullname: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      email: ['', [Validators.required, Validators.email]]
    });
    this.pwdForm = this.fb.group({
      old: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      new: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]],
      conf: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(32)]]
    })
    this.getUser();

  }

  ngOnInit(): void {
    
  }

  /**
   * GET CURRENT USER  
   */
  getUser() {
    this.userService.getOneUser(this.session.id).subscribe((data)=>{
      this.user = data;
      this.updateForm.setValue({
        username: data.username,
        fullname: data.fullname,
        email: data.email
      })
    });
  }

  /**
   *| UPDATE USER 
   */
  onSubmitUpdateForm() {
    const u = this.updateForm.value;

    this.userService.updateUser(this.user.userId, u).subscribe((data)=>{
      if (data.status == "error") {
        this.notifier.notify('error', data.message);
      } else if (data.status == "warning") {
        this.notifier.notify('warning', data.message);
      } else {
        const close = document.getElementById('closeModification');
        this.notifier.notify('success', data.message);
        this.user = data.user;
        close!.click();
      }
    })
  }

  /**
   *| CHANGE PASSWORD 
   */
  onSubmitPwdForm() {
    const pass = this.pwdForm.value;
    if (pass.new != pass.conf){
      this.notifier.notify('warning', 'Mot de passe de confirmation incorrect');
    } else {
      this.userService.changePasswordUser(this.user.userId, pass).subscribe((data)=>{
        if(data.status == 'error') {
          this.notifier.notify('error', data.message);
        } else if (data.status == 'warning') {
          this.notifier.notify('warning', data.message);
        } else {
          const close = document.getElementById('closePwd');
          this.notifier.notify('success', data.message);
          close!.click();
        }
      })
    }
  }

  /**
   *| DECONNEXION
   **/
  deconnexion() {
    this.notifier.notify('info', 'Tentative de deconnexion');
    setTimeout(()=>{
      this.notifier.notify('info', 'Veuillez confirmer si vous le voulez');
    }, 3000)
  }

  deconnecter() {
    this.notifier.notify('info', 'Deconnexion encours');
    setTimeout(()=>{
      this.userService.removeUserSession();
      this.notifier.notify('info', 'Suppression du session');
      setTimeout(()=> {
        this.notifier.notify('success', 'Utilisateur deconnecté, Bey!');
        location.reload();
      }, 3000);
    }, 3000);
  }
}
