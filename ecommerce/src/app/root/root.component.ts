import { ComponentInteractionService } from './../shared/services/component-interaction.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
  constructor(private storage: StorageService, private updateCart : ComponentInteractionService ) { }
  cartCount; 
  ngOnInit(): void {
      let x = [];
      x = this.storage.getAllCartProducts();
      this.cartCount = x.length;
      this.updateCart.incDecData.subscribe(
        message => {
          let x = []; 
          x = this.storage.getAllCartProducts();
          this.cartCount = x.length;
        }
      )
  }
  cartButton = false;
  showCart(){
      this.cartButton = !this.cartButton;
   }

}
