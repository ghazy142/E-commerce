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



  getCartUser():Observable<any>{
    return this._HttpClient.get(this.baseUrl + 'cart' ,
      {
        headers:this.myToken
      }
    );
  }

  removeCartItem(prodId:string):Observable<any>{
    return this._HttpClient.delete(this.baseUrl + `cart/${prodId}` ,
      {
        headers:this.myToken
      }
    );
  }

  updateCartCount(prodId:string ,countNum:number):Observable<any>{
    return this._HttpClient.put(this.baseUrl + `cart/${prodId}`,
    {
      count: countNum
    },
    {
      headers:this.myToken
    }
    );
  }



  clearCart():Observable<any>{
    return this._HttpClient.delete(this.baseUrl + 'cart' ,
      {
        headers:this.myToken
      }
    );
  }



  checkOut(cartId:any ,orderInfo:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl +
      `orders/checkout-session/${cartId}?url=https://github.com/ghazy142/E-commerce` ,
      {
        shippingAddress:orderInfo
      },
      {
        headers:this.myToken
      }
      
    )
  }


}
 