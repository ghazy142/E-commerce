import { Component, OnInit,AfterViewInit, Renderer2 } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Category ,} from '../../interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Product } from '../../interfaces/product';
import { CartService } from '../../services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [ CarouselModule,CommonModule,RouterLink,FormsModule ],

})
export class HomeComponent implements OnInit , AfterViewInit {
  isLoading: boolean = true;
  productData:any[]=[];
  categories:Category[]=[];
  products:Product[] = [];
  searchQuery: string = '';
  
  
  
  
  constructor(
    private _productsService: ProductsService ,
     private _CartService :CartService,
     private _ToastrService: ToastrService,
     private _Renderer2: Renderer2,
    ){}
  ngAfterViewInit(): void {
  
  }





  ngOnInit(): void {
        // Simulating loading delay for demonstration purposes
        setTimeout(() => {
          // After the simulated delay, indicate that loading is complete
          this.isLoading = false;
        }, 3000);
 this._productsService.getProducts().subscribe({
  next: (response)=>{
    // console.log(response.data)
    this.productData = response.data
  },
  error: (err)=>{
    console.log(err)
  }
 });



 this._productsService.getCategories().subscribe({
  next: (response)=>{
 
    this.categories=response.data; 

 },



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

get filteredProducts(): Product[] {
  if (!this.searchQuery) {
    return this.productData;
  }
  return this.productData.filter(product =>
    product.title.toLowerCase().startsWith(this.searchQuery.toLowerCase())
  );
}

  categoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout:2000,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true

  }


  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout:2000,
    autoplaySpeed:1000,
    items:1,
    nav: false,
  }
  
}
