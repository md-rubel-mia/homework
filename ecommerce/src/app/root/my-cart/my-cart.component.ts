import { StorageService } from 'src/app/shared/services/storage.service';
import { Component, OnInit } from '@angular/core';
import { CartPanelComponent } from '../cart-panel/cart-panel.component';
import { ComponentInteractionService } from 'src/app/shared/services/component-interaction.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit {
  constructor(private storageService: StorageService,
      private cartpanel: CartPanelComponent,
      private cartUpdate : ComponentInteractionService ) {   
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
      this.productArray = this.storageService.getAllCartProducts(); 
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
   
   reloadDom(){
       this.productArray = this.storageService.getAllCartProducts();
   }
}
