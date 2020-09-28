import { MatButtonModule } from '@angular/material/button';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { ProductsComponent } from './products/products.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartPanelComponent } from './cart-panel/cart-panel.component';
import { RootComponent } from './root.component';
import { Routes, RouterModule } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';

// const routes: Routes = [
//   { path: '', component: RootComponent },
//   { path:'dashboard', component: DashboardComponent },
//   { path: 'myCart',component: MyCartComponent },
//   { path:'products', component: ProductsComponent },
//   { path: '**', component:RootComponent }

// ];

const routes: Routes = [
  {  path: '', component: RootComponent, children: [
    {path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardModule)},
    {path: 'products', loadChildren: () => import('./products/products.module').then ( m => m.ProductsModule)},
    {path: 'myCart', loadChildren: () => import('./my-cart/my-cart.module').then ( m => m.MyCartModule)},
    {path: 'product-details', loadChildren: () => import('./product-details/product-details.module').then ( m => m.ProductDetailsModule)},
    {path: 'create', component: CreateProductComponent},
    {path: '**', redirectTo: 'dashboard'}
  ]
 }
];

@NgModule({
  declarations: [CartPanelComponent, RootComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    MatButtonModule
  ]
})
export class RootModule { }
