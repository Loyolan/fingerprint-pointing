import { Component, OnInit } from '@angular/core';
import { style, animate, transition, trigger } from '@angular/animations';
import { EventsService } from './../../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  animations: [
    trigger('fade', [
      transition('void => *', [
        style({backgroundColor: 'black', opacity: 0}),
        animate(2000, style({backgroundColor: 'white', opacity: 1}))
      ])
    ])
  ]
})
export class EventsComponent implements OnInit {

  events: any[] = [];
  constructor(
    private service: EventsService,
  ) { }

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents() {
    this.service.allEvents().subscribe((data) => {
      this.events = data;
    });
  }
}
