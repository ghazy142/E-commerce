import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private _productsService: ProductsService){}


productData:any[]=[];


  ngOnInit(): void {
 this._productsService.getProducts().subscribe({
  next: (response)=>{
    console.log(response.data)
    this.productData = response.data
  },
  error: (err)=>{
    console.log(err)
  }
 })
  }
}
