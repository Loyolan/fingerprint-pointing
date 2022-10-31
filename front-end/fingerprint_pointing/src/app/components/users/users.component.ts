import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  admins: any[] = [];
  users: any[] = [];
  demandes: any[] = [];
  session: any;
  selectedUser: string;

  constructor(
    private readonly notifier: NotifierService,
    private userService: UsersService) { 
    this.session = this.userService.getUserSession();
    this.selectedUser = "";
  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  /**
   *| GET ALL USERS 
   */
  getAllUsers() {
    this.userService.allUsers().subscribe((data) => {
      this.admins = [];
      this.users = [];
      this.demandes = [];
      if (data) {
        for (let i=0; i<data.length; i++) {
          if (data[i].role == 'ADMIN') {
            this.admins.push(data[i]);
          } else if (data[i].role == 'USER') {
            this.users.push(data[i]);
          } else {
            this.demandes.push(data[i]);
          }
        }
      }
    });
  }

  showDeleteUser(id: string, role: string) {
    this.selectedUser = id;
    if (role == "ADMIN"){
      this.notifier.notify('warning', 'Vous êtes sur le point de supprimer un administrateur!');
      setTimeout(()=>{
        this.notifier.notify('info', 'Confirmer si vous le voulez vraiment!');
      }, 3000)
    } else if(role == "USER"){
      this.notifier.notify('warning', 'Vous êtes sur le point de supprimer un utilisateur!');
      setTimeout(()=>{
        this.notifier.notify('info', 'Confirmer si vous le voulez vraiment!');
      }, 3000)
    } else {
      this.notifier.notify('warning', 'Vous êtes sur le point de supprimer une demande!');
      setTimeout(()=>{
        this.notifier.notify('info', 'Confirmer si vous le voulez vraiment!');
      }, 3000)
    }
  }

  deleteUser() {
    this.notifier.notify('info', 'Suppression d\'un utilisateur encours...!');
    const c = document.getElementById('closeDelete');
    this.userService.deleteUser(this.selectedUser).subscribe((data)=>{
      setTimeout(()=>{
        this.notifier.notify(data.status, data.message);
        c!.click();
        this.getAllUsers();
      }, 3000);
    });
  }

  confirmDemande(id: string) {
    this.selectedUser = id;
    this.notifier.notify('info', 'Confirmation de demande d\'accés');
  }

  userToAdmin(id: string){
    this.selectedUser = id;
    this.notifier.notify('info', 'Confirmation de demande d\'accés');
  }

  confirmer() {
    this.notifier.notify('info', 'Modification de role d\'utilisateur vers administrateur...');
    const c = document.getElementById('closeConfirm');
    this.userService.confirmDemande(this.selectedUser).subscribe((data)=>{
      setTimeout(()=>{
        this.notifier.notify(data.status, data.message);
        c!.click();
        this.getAllUsers();
      }, 3000);
    });
  }

  toAdmin() {
    this.notifier.notify('info', 'Confirmation du demande encours...');
    const c = document.getElementById('closeU2A');
    this.userService.userToAdmin(this.selectedUser).subscribe((data)=>{
      setTimeout(()=>{
        this.notifier.notify(data.status, data.message);
        c!.click();
        this.getAllUsers();
      }, 3000);
    });
  }
}
