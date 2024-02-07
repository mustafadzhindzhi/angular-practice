import { AfterViewChecked, AfterViewInit, Component, DoCheck, OnInit, QueryList, SkipSelf, ViewChild, ViewChildren } from '@angular/core';
import { Room, RoomList } from './rooms.js';
import { HeaderComponent } from '../header/header.component.js';
import { RoomsService } from './services/rooms.service.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'hinv-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css'],

})
export class RoomsComponent implements OnInit, DoCheck, AfterViewInit, AfterViewChecked {
  hotelName = 'Hilton Hotel';

  numberOfRooms = 10;

  hideRooms = false;

  selectedRoom!: RoomList;

  rooms: Room = {
    totalRooms: 20,
    availableRooms: 10,
    bookedRooms: 5
  };

  title = 'Room List';

  roomList: RoomList[] = [];

  stream = new Observable<string>(observer => {
    observer.next('user1');
    observer.next('user2');
    observer.next('user3');
    observer.complete();
    // observer.error('error');
  })

  @ViewChild(HeaderComponent) headerComponent!: HeaderComponent;

  @ViewChildren(HeaderComponent) headerChildrenComponent!: QueryList<HeaderComponent>

// roomService =  new RoomsService();

  constructor(@SkipSelf() private roomsService: RoomsService) {}

  ngOnInit(): void {
    this.stream.subscribe({
      next: (value) => console.log(value),
      complete: () => console.log('complete'),
      error: (err) => console.log(err)
    });

    this.stream.subscribe((data) => console.log(data))
    this.roomsService.getRooms().subscribe(rooms => {
      this.roomList = rooms;
    });
       
    // this.roomsService.getRooms().subscribe((data: RoomList[]) => {
    //   this.roomList = data;
    // });
  };

  ngDoCheck(): void {
    console.log('on changes is called.');
  };

  ngAfterViewInit(): void {
    this.headerComponent.title = "Rooms View";
    console.log(this.headerChildrenComponent.last.title = "Last Title");
    // this.headerChildrenComponent.get(0).title = "First Title"
    
  };

  ngAfterViewChecked(): void {
    
  }
  toggle() {
    this.hideRooms = !this.hideRooms;
    this.title = "Rooms List";
  };

  selectRoom(room: RoomList) {
    this.selectedRoom = room;
  };

  addRoom() {
    const room: RoomList = {
      roomNumber: '4',
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 500,
      photos: 'https://aremorch.com/wp-content/uploads/2016/09/The-Details-That-Matter-Top-Things-Every-Luxury-Hotel-Room-Should-Have.png',
      checkingTime: new Date('18-January-2024'),
      chekoutTime: new Date('19-January-2024'),
      rating: 4.5
    };
    // this.roomList.push(room);
    // this.roomList = [...this.roomList, room];
    this.roomsService.addRoom(room).subscribe((data) => {
      this.roomList = data;
    })
  };

  editRoom () {
    const room: RoomList = {
      roomNumber: '3',
      roomType: 'Deluxe Room',
      amenities: 'Air Conditioner, Free Wi-Fi, TV, Bathroom, Kitchen',
      price: 500,
      photos: 'https://aremorch.com/wp-content/uploads/2016/09/The-Details-That-Matter-Top-Things-Every-Luxury-Hotel-Room-Should-Have.png',
      checkingTime: new Date('18-January-2024'),
      chekoutTime: new Date('19-January-2024'),
      rating: 4.5
    };

    this.roomsService.editRoom(room).subscribe((data) => {
      this.roomList = data;
    })
  }
};



