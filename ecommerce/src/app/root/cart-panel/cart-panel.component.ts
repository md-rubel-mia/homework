import { ComponentInteractionService } from './../../shared/services/component-interaction.service';
import { StorageService } from './../../shared/services/storage.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart-panel',
  templateUrl: './cart-panel.component.html',
  styleUrls: ['./cart-panel.component.scss']
})
export class CartPanelComponent implements OnInit {
      hide = true; 
      cartArray;
      total = 0;
      constructor(private storageService: StorageService, private cartUpdate: ComponentInteractionService) { }
      ngOnInit(): void {
          this.cartArray = this.storageService.getAllCartProducts();
          this.cartUpdate.incDecData.subscribe(
            message => {
               this.reloadDom();
            }
          )
      }
      reloadDom(){
        this.cartArray = this.storageService.getAllCartProducts();
        this.totalAmount();
      }

      add(id){
        let item = this.storageService.getProduct(id); 
        if(item.quantity!=0){
               this.storageService.incrementItem(id); 
        }      
        this.cartUpdate.setInfo("init");
        this.reloadDom(); 
     }
    
    remove(id){
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
    removeItem(id){
          this.storageService.removeCartItem(id);
          this.reloadDom();
          this.cartUpdate.setInfo("remove");
    }
    hideCart(){
          this.hide = !this.hide; 
    }
    totalAmount(){
         this.total = 0; 
        for(let i = 0; i<this.cartArray.length; ++i){
             this.total += this.cartArray[i].cartQuantity * this.cartArray[i].price;
        }
    }
}
