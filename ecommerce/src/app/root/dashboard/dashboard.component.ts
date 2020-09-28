import { Router } from '@angular/router';
import { ComponentInteractionService } from './../../shared/services/component-interaction.service';
import { CartPanelComponent } from './../cart-panel/cart-panel.component';
import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private storageService: StorageService,
     private cartpanel: CartPanelComponent, 
     private cartUpdate : ComponentInteractionService,
     private router: Router
     
     ) {   
  }
  productArray;
  selectedItems = 0;
  addToCartBtn = true;
  ngOnInit(): void {
         this.cartUpdate.incDecData.subscribe(
              message =>{
                 this.reloadDom();
              }
         )
      this.productArray = this.storageService.getAllProducts(); 
  }
  
   addToCart(id){
         this.storageService.addToCartArray(id);
         this.cartUpdate.setInfo(id); 
         this.addItem(id);
   }

   addItem(id){
       let item = this.storageService.getProduct(id); 
       if(item.quantity!=0){
              this.storageService.incrementItem(id); 
       }      
       this.cartUpdate.setInfo("init");
       this.reloadDom(); 
   }
   
   removeItem(id){
       let item = this.storageService.getProduct(id); 
       if(item.cartQuantity==1){
             this.storageService.removeCartItem(id); 
             this.cartUpdate.setInfo("remove"); 
       }
       else{
           this.storageService.decrementItem(id);
           this.cartUpdate.setInfo("init");  
       }
       this.reloadDom(); 
   }

   detailsBtnAction(id){
        this.cartUpdate.setInfo(id);
        this.router.navigateByUrl('/product-details');      
   }
   
   reloadDom(){
       this.productArray = this.storageService.getAllProducts();
   }

}
