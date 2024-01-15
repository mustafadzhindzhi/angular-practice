import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {
  hotelName= 'Hilton Hotel';

  numberOfRooms = 10;
  
  hideRooms = false;

  constructor() {
  }

  ngOnInit(): void {
  }
  toggle() {
    this.hideRooms = !this.hideRooms;
  }
}
