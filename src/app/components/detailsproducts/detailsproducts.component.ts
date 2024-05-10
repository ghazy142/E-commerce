import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detailsproducts',
  templateUrl: './detailsproducts.component.html',
  standalone: true,
  imports: [CommonModule , CarouselModule],
  styleUrl: './detailsproducts.component.scss'
})
export class DetailsproductsComponent implements OnInit {

  constructor(private _ActivatedRoute:ActivatedRoute ,
     private _ProductsService:ProductsService ,
       private _Renderer2: Renderer2,
        private _CartService :CartService,
        private _ToastrService: ToastrService,
        private _Router:Router ){}
productID!:string|null;
productDetails:any=null;

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe(
      {
        next: (params)=>{
          this.productID=params.get('id');
          console.log(this.productID);
        }
      }
    ) 



this._ProductsService.getProductDetails(this.productID).subscribe({
  next: ({data})=>{
    this.productDetails=data;
  } 
})

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
    this._Router.navigate(['/cart']);

  },
  error: (err)=>{
    this._Renderer2.removeAttribute(btnAdd , 'disabled','true');
    this._Renderer2.removeStyle(btnAdd, 'cursor');
    this._Renderer2.removeStyle(btnAdd, 'pointer-events');

  }

})
this._Router.navigate(['/cart']);

}



  productDetailOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: true
  }
}
