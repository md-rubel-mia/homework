import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentInteractionService {
   incDecData : BehaviorSubject<string> = new BehaviorSubject<string>(null); 
   constructor() { }
   setInfo(value : string){
       this.incDecData.next(value);
      setTimeout( () => {
           this.incDecData.complete();
      }, 100 )
   }

   addRemoveCartItem: BehaviorSubject<string> = new BehaviorSubject<string>(null); 
   setCart(value : string){
     this.addRemoveCartItem.next(value); 
   }

}
