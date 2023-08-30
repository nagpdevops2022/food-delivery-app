import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Restaurant } from 'src/app/models/Restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit {

  public retaurants: Restaurant[] = [];
  public retaurantsConstant: Restaurant[] = [];
  public userName = '';

  constructor(private _restaurantService: RestaurantService, private router: Router) { }

  ngOnInit(): void {
    this._restaurantService.getRestaurantList().subscribe(
      (data) => {
        this.retaurantsConstant = this.retaurants = data;
        this.userName = this._restaurantService.userName;
      },
      (error) => {
        alert(error.message);
        console.log("error status", error.status);
        console.log("error message", error.message);
        
      }
    );
  }

  goToRestaurant = (retaurant: Restaurant) => {
    this.router.navigate(['/list', retaurant.id])
  }

}
