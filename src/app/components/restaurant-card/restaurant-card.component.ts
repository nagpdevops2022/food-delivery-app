import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss']
})
export class RestaurantCardComponent implements OnInit {

  @Input() public retaurantName!: string;
  @Input() public retaurantThumbnail!: string;
  @Input() public retaurantImage!: string;
  @Input() public cuisines!: string;
  @Input() public rating!: any;
  @Input() public review!: string;

  public math = Math;

  constructor() { }

  ngOnInit(): void {
  }


}
