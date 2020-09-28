import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
   
      getProduct(id){
         return JSON.parse(localStorage.getItem(id));
      }
      createProduct(id, product){
           localStorage.setItem(id, JSON.stringify(product));
      }
      deleteProduct(id){
          let productIdArray = this.getIdArray(); 
          let idx = productIdArray.indexOf(id); 
          productIdArray.splice(idx, 1); 
          this.createProduct("idArray", productIdArray);
          localStorage.removeItem(id); 
      }
      getId(){
         let x: number = parseInt(localStorage.getItem('id'));
         let y:string = (x+1).toString();
         localStorage.setItem('id', y);  
         return y;
      }
      storeId(id){
          let idArray = this.getProduct('idArray'); 
          idArray.push(id);
          this.createProduct('idArray', idArray);
      }
      getIdArray(){
           return this.getProduct('idArray');
      }
      getAllProducts(){
          let idArray = this.getIdArray(); 
          let productArray = []
          if(idArray){
               for(let i = 0; i<idArray.length; ++i){
                    productArray.push(this.getProduct(idArray[i]));
               }
          }
          return productArray;
      }
      addToCartArray(id){
           let cartArray = this.getProduct("cartArray"); 
           if(cartArray){
                 if(cartArray.indexOf(id) < 0){
                    cartArray.push(id);
                    this.createProduct("cartArray", cartArray);  
                 }
                 else{
                      console.log("Already Exist"); 
                 }
           }
           else{
                let cartArray: string[] = []; 
                this.createProduct("cartArray", cartArray); 
           }
      }

      getAllCartProducts(){
          let cartArray = [];
          cartArray = this.getProduct("cartArray");  
          let productArray = []
          if(cartArray){
               for(let i = 0; i<cartArray.length; ++i){
                    productArray.push(this.getProduct(cartArray[i]));
               }
          }
          return productArray;
      }
      removeCartItem(id){
          let item = this.getProduct(id); 
          item.quantity += item.cartQuantity; 
          item.cartQuantity = 0; 
          this.createProduct(id, item); 
          let cartArray = this.getProduct("cartArray");  
          let idx = cartArray.indexOf(id); 
          cartArray.splice(idx, 1); 
          this.createProduct("cartArray", cartArray);
      }
      incrementItem(id){
            let item = this.getProduct(id); 
            item.cartQuantity += 1; 
            item.quantity-=1; 
          //   console.log("From storage ", item);
            
            this.createProduct(id, item);
      }
      decrementItem(id){
          let item = this.getProduct(id); 
          item.cartQuantity -= 1; 
          item.quantity += 1; 
          this.createProduct(id, item);
      }


}
