import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private _HttpClient:HttpClient) { }
  baseUrl:string="https://ecommerce.routemisr.com/api/v1/";
  myToken:any={token:localStorage.getItem('_token')};

  addToCart(prodId:string):Observable<any>{
    return this._HttpClient.post(this.baseUrl +`cart`, 
      { 
        productId: prodId
      },
      {
        headers:this.myToken
      }
    )
  }
}
