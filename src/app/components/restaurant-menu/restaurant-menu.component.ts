import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Restaurant } from 'src/app/models/Restaurant';

@Component({
  selector: 'app-restaurant-menu',
  templateUrl: './restaurant-menu.component.html',
  styleUrls: ['./restaurant-menu.component.scss']
})
export class RestaurantMenuComponent implements OnInit {

  @Input() public restaurant!: Restaurant;

  @Output() addToMyCartEvent = new EventEmitter();

  constructor() { }

  addToMyCart = (menu: any) => {
    this.addToMyCartEvent.emit(menu);
  }

  ngOnInit(): void {
  }

}
