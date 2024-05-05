import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Category } from '../../interfaces/category';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  imports: [ CarouselModule,CommonModule  ],

})
export class HomeComponent implements OnInit {
  constructor(private _productsService: ProductsService){}


productData:any[]=[];
categories:Category[]=[];


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



 this._productsService.getCategories().subscribe({
  next: (response)=>{
    console.log(response);
    this.categories=response.data; 
 },



  });
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
