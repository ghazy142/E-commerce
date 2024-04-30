import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AutLayoutComponent } from './layouts/aut-layout/aut-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '', component: BlankLayoutComponent , children: [
    { path: "", redirectTo:'home',pathMatch: 'full'},
    { path: "home",  component:HomeComponent, canActivate:[authGuard] },
    { path: "cart", component:CartComponent  , canActivate:[authGuard]},
    { path: "products", component:ProductsComponent , canActivate:[authGuard]},
    { path: "categories", component:CategoriesComponent , canActivate:[authGuard] },
    { path: "brands", component:BrandsComponent  , canActivate:[authGuard]},
  ]},
  
  {
    path: '', component: AutLayoutComponent , children: [
      { path: "login", component:LoginComponent},
      { path: "register", component:RegisterComponent},
]},
  

  { path: '**', component:NotfoundComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
