import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  constructor(private _CartService: CartService){}
  cartDetails:any=null;

  ngOnInit():void {
    this._CartService.getCartUser().subscribe({
      next: (response) => {
        console.log(response);
        this.cartDetails = response.data;
      }
    })
  }



  removeItem(id:string):void{
    this._CartService.removeCartItem(id).subscribe({
      next: (response) => {
        console.log(response);
        this.cartDetails = response.data;
      },
    })
  }




  changeCount(count:number ,id:string):void{
    
    if(count>=1){
      this._CartService.updateCartCount(id ,count).subscribe({
        next: (response) => {
          this.cartDetails = response.data;
        }
      });

    }


    

  }



  clear():void{
    this._CartService.clearCart().subscribe({
      next: (response) => {
        if(response.message==="success"){
          this.cartDetails=null;
        }
      }
    })
  }
  

}
