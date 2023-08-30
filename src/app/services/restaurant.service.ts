import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, Subject } from 'rxjs';
import { Restaurant } from '../models/Restaurant';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CartItem } from '../models/CartI-tem';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  private url: string = '/assets/api/data.json';
  public hasUserName = false;
  public userName = '';
  public cartItems: any = [];
  public customError = {
    status: 500,
    message: 'Sorry! Something went wrong :('
  }

  cartItemsChange: Subject<CartItem[]> = new Subject<CartItem[]>();


  constructor(private httpClient: HttpClient) {
    this.cartItemsChange.subscribe((value: CartItem[]) => {
      this.cartItems.push(value);
    });
  }

  public getRestaurantList = (): Observable<Restaurant[]> => {
    return this.httpClient.get<Restaurant[]>(this.url).pipe(
      catchError((err: HttpErrorResponse) => {
        return throwError(err || this.customError);
      })
    );
  }

  public setCartItem = (item: any) => {
    this.cartItemsChange.next(item);
  }

  public removeCartItem = (item: any) => {
    this.cartItems = this.cartItems.filter((menu: any) => menu.id != item.id);
  }
}
