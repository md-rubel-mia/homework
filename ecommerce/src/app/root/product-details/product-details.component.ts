import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { CartPanelComponent } from '../cart-panel/cart-panel.component';
import { ComponentInteractionService } from 'src/app/shared/services/component-interaction.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  constructor(private storageService: StorageService,
    private cartpanel: CartPanelComponent,
    private cartUpdate : ComponentInteractionService ) {   
}
productArray = [];
selectedItems = 0;
addToCartBtn = true;
ngOnInit(): void {
       this.cartUpdate.incDecData.subscribe(
            message =>{              
               this.reloadDom(message);
            }
       )
       
    // this.productArray = this.storageService.getAllCartProducts(); 
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
    this.reloadDom(id); 
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
     this.reloadDom(id); 
 }
 
 reloadDom(id){
    //  this.productArray = this.storageService.getAllCartProducts();
     this.productArray = [];
     this.productArray.push(this.storageService.getProduct(id));
 }

}
