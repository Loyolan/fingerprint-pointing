import { Component, OnInit } from '@angular/core';
import { style, animate, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-etudiants',
  templateUrl: './etudiants.component.html',
  styleUrls: ['./etudiants.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({backgroundColor: 'black', opacity: 0}),
        animate(2000, style({backgroundColor: 'white', opacity: 1}))
      ])
    ])
  ]
})
export class EtudiantsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
