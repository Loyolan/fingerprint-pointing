import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  session: any;
  isAdmin: any = false;
  constructor(
    private userService: UsersService) { 
    this.session = this.userService.getUserSession();
    this.userService.getOneUser(this.session.id).subscribe((data)=>{
      if(data.role) {
        if(data.role == 'ADMIN'){
          this.isAdmin = true;
        }
      }
    });
  }

  ngOnInit(): void {
  }

}
