import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
constructor(private _productsService:ProductsService,
  private _CartService :CartService,
  private _ToastrService: ToastrService,
  private _Renderer2: Renderer2,

){}
productData:any[]=[];
  ngOnInit(): void {
    this._productsService.getProducts().subscribe({
      next: (response)=>{
        // console.log(response.data)
        this.productData = response.data
      },
      error: (err)=>{
        console.log(err)
      }
     });
  }



  addProduct(id:any , btnAdd:HTMLButtonElement): void {
    this._Renderer2.setAttribute(btnAdd , 'disabled','true');
    this._Renderer2.setStyle(btnAdd, 'cursor', 'not-allowed');
    this._Renderer2.setStyle(btnAdd, 'pointer-events', 'none');
  this._CartService.addToCart(id).subscribe({
    next: (response)=>{
      console.log(response);
      console.log(response.message); 
      this._ToastrService.success(response.message)
      this._Renderer2.removeAttribute(btnAdd , 'disabled','true');
      this._Renderer2.removeStyle(btnAdd, 'cursor');
      this._Renderer2.removeStyle(btnAdd, 'pointer-events');
  
    },
    error: (err)=>{
      this._Renderer2.removeAttribute(btnAdd , 'disabled','true');
      this._Renderer2.removeStyle(btnAdd, 'cursor');
      this._Renderer2.removeStyle(btnAdd, 'pointer-events');
  
    }
  
  })
  }
}



