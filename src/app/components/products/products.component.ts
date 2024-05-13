import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';


@Component({

  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',

})
export class ProductsComponent implements OnInit {
constructor(private _productsService:ProductsService,
  private _CartService :CartService,
  private _ToastrService: ToastrService,
  private _Renderer2: Renderer2,


){}
productData:any[]=[];
pageSize:number = 0; //limit
currentPage:number = 1; //current page
total:number = 0; //total
item:any = [];


// loadNextPage(): void {
//   // Increment currentPage to load the next page
//   this.currentPage++;
// }

  ngOnInit(): void {
    this._productsService.getProducts().subscribe({
      next: (response)=>{
        // console.log(response.data)
        this.productData = response.data;
        this.pageSize= response.metadata.limit;
        this.currentPage= response.metadata.currentPage;
        this.total= response.result;
      },
      error: (err)=>{
        console.log(err)
      }
     });

    //  this.pageScrollService.scroll({
    //   document: this.document,
    //   scrollTarget: '.theEnd',
    // });
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

  pageChanged(event:any): void {
    this._productsService.getProducts(event).subscribe({
      next: (response)=>{
        // console.log(response.data)
        this.productData = response.data;
        this.pageSize= response.metadata.limit;
        this.currentPage= response.metadata.currentPage;
        this.total= response.result;
      },
      error: (err)=>{
        console.log(err)
      }
     });
  }





  
  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: false,
    autoplayTimeout:2000,
    autoplaySpeed:1000,
    items:1,
    nav: false,
  }
  

}



