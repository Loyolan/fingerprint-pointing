import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  session: any;
  user: any;
  constructor(
    private userService: UsersService) { 
    this.session = this.userService.getUserSession();
    this.userService.getOneUser(this.session.id).subscribe((data)=>{
      this.user = data;
    });
  }

  ngOnInit(): void {
  }

}
