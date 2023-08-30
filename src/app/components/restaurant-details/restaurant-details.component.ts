import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Restaurant } from 'src/app/models/Restaurant';
import { RestaurantService } from 'src/app/services/restaurant.service';
import { SideNavService } from 'src/app/services/side-nav.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-restaurant-details',
  templateUrl: './restaurant-details.component.html',
  styleUrls: ['./restaurant-details.component.scss']
})
export class RestaurantDetailsComponent implements OnInit, AfterViewInit {

  @ViewChild('sidenav', {static: true}) public sidenav!: MatSidenav;

  public restaurants!: Restaurant[];
  public restaurant!: Restaurant;
  public cartItems: any = [];
  public totalAmount = 0;
  public isFetched: boolean = false;
  public toggleMode = "over";
  public userName = '';
  public isSideNavShowing: boolean = false;

  constructor(private _restaurantService: RestaurantService, private route: ActivatedRoute, 
    private router: Router, private _sidenavService: SideNavService) { }

  ngOnInit(): void {
    this.scrollTop();
    this._restaurantService.getRestaurantList().subscribe((data) => {
      this.restaurants = data;
      this.route.paramMap.subscribe((params: ParamMap) => {
        // [this.restaurant] =  this.getHotel(params.get('id'));
        [this.restaurant] =  this.restaurants.filter((restaurant) => restaurant.id == params.get('id'));
      })
    });

    this.userName = this._restaurantService.userName;
    this.cartItems = this._restaurantService.cartItems;
    this.calculateAmount();
  }

  // getHotel = (id: any) => {
  //   try {
  //     return this.restaurants.filter((restaurant) => restaurant.id == id);
  //   }
  //   catch(e) {
  //     console.log(e);
  //   }
  // }

  calculateAmount = () => {
    this.totalAmount = 0; 
    this.cartItems.map((item: any) => {
      this.totalAmount = this.totalAmount + (item.quantity*item.price)
    });
  }

  scrollTop = () => {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  openPaymentMethod = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "It's just a sample confirmation message!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#9c27b0',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, pay bill!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'success',
          title: 'Payment Successfull!',
          text: "It's just a sample success message. We can integrate real time UPI service!",
          showConfirmButton: true,
          confirmButtonColor: '#9c27b0'
        });
        this.emptyCart();
      }
    })
  }

  emptyCart = () => {
    this.cartItems.forEach((item: any,index: any)=>{
      this._restaurantService.removeCartItem(this.cartItems[index]);
   });
   this.cartItems = this._restaurantService.cartItems;
   this.calculateAmount();
  }

  addToMyCart = (menu: any) => {
    const newItem = {
      "id": menu.id,
      "name": menu.name,
      "price": menu.price,
      "quantity": 1
    }

    if(this.isItemAlreadyExist(newItem)) {
      this.itemAlreadyExistModal(newItem);
    }
    else {
      this.addItemToMyCart(newItem);
      this.itemAddedModal(newItem);
      this.calculateAmount();
    }
  }

  isItemAlreadyExist = (newItem: any) => {
    return this._restaurantService.cartItems.find((cartItem: any) => cartItem.id == newItem.id);
    return true;//comment this line later....
  }

  itemAlreadyExistModal = (newItem: any) => {
    Swal.fire({
      icon: 'warning',
      title: `${newItem.name} is already exist in your basket!`,
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#9c27b0',
      confirmButtonText: 'View My Basket',
      cancelButtonText: 'Close',
      cancelButtonColor: '#e23c3c'
    }).then((result) => {
      if (result.isConfirmed) {
        this.toggleSideNav();
      }
    });
  }

  addItemToMyCart = (newItem: any) => {
    this._restaurantService.setCartItem(newItem);
    this.cartItems = this._restaurantService.cartItems;
  }

  itemAddedModal = (newItem: any) => {
    Swal.fire({
      icon: 'success',
      title: `${newItem.name} added to your basket!`,
      text: "Click on 'View My Basket' button below to view your basket or click on the basket icon at the top of the page",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#9c27b0',
      confirmButtonText: 'View My Basket',
      cancelButtonText: 'Close',
      cancelButtonColor: '#e23c3c'
    }).then((result) => {
      if (result.isConfirmed) {
        this.toggleSideNav();
      }
    });
  }

  toggleSideNav = () => {
    this.scrollTop();
    this._sidenavService.toggle();
  }

  ngAfterViewInit(): void {
    this._sidenavService.setSidenav(this.sidenav);
  }

  addQuantity = (cartItem: any) => {
    this.cartItems.forEach((item: any,index: any)=>{
      if(item.id == cartItem.id)
        this.cartItems[index].quantity = Number(this.cartItems[index].quantity)  + 1; 
   });
   this.calculateAmount();
  }

  removeQuantity = (cartItem: any) => {
    this.cartItems.forEach((item: any,index: any)=>{
      if(item.id == cartItem.id) {
        if (this.cartItems[index].quantity > 0)
          this.cartItems[index].quantity -= 1;
      }
   });
   this.calculateAmount();
  }

  removeItem = (cartItem: any) => {
    this._restaurantService.removeCartItem(cartItem);
    this.cartItems = this._restaurantService.cartItems;
    this.calculateAmount();
  }

}
