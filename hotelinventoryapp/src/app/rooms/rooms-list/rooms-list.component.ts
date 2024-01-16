import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Room, RoomList } from '../rooms.js';

@Component({
  selector: 'hinv-rooms-list',
  templateUrl: './rooms-list.component.html',
  styleUrls: ['./rooms-list.component.css'], 
})
export class RoomsListComponent implements OnInit {

  @Input() rooms: RoomList[] = [];

  @Output() selectedRoom = new EventEmitter<RoomList>();

  constructor () {}  
  ngOnInit(): void {
  };

  selectRoom(room: RoomList) {
    console.log(room);
 }
 
}
