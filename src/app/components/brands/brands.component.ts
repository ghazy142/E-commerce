
import { Component, OnInit, Renderer2 } from '@angular/core';
import { ProductsService } from '../../services/products.service';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent  implements OnInit{
  isLoading: boolean = true;
  constructor(private _productsService:ProductsService,
    private _ToastrService: ToastrService,
    private _Renderer2: Renderer2,
  
  
  ){}
  productData:any[]=[];
  ngOnInit(): void {
    setTimeout(() => {
      // After the simulated delay, indicate that loading is complete
      this.isLoading = false;
    }, 3000);
    this._productsService.getBrands().subscribe({
      next: (response)=>{
        // console.log(response.data)
        this.productData = response.data;
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

  }
}
