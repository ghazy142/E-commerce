import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detailsproducts',
  templateUrl: './detailsproducts.component.html',
  standalone: true,
  imports: [CommonModule , CarouselModule],
  styleUrl: './detailsproducts.component.scss'
})
export class DetailsproductsComponent implements OnInit {
  constructor(private _ActivatedRoute:ActivatedRoute , private _ProductsService:ProductsService ){}
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
