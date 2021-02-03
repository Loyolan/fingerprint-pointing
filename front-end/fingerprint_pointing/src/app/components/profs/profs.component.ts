import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-profs',
  templateUrl: './profs.component.html',
  styleUrls: ['./profs.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({ backgroundColor: 'black', opacity: 0 }),
        animate(2000, style({ backgroundColor: 'white', opacity: 1 }))
      ])
    ])
  ]
})
export class ProfsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
