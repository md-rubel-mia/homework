import { ComponentInteractionService } from './../../../shared/services/component-interaction.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormGroup, FormControl,Validators, FormGroupDirective } from '@angular/forms'
import {DatePipe} from '@angular/common'
import { ViewChild } from '@angular/core'
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})

export class CreateProductComponent implements OnInit, OnDestroy {
  @ViewChild(FormGroupDirective, { static: false }) formDirective: FormGroupDirective;
  origin = ['Dhaka', 'Chittagong', 'Rajshahi', 'Sylhet', 'Pabna'];
  category = ['Fruits', 'Vegetables', 'Beverages', 'Commodities', 'HomeCare'];
  shortCode = "  -  -";
  name = ""; 
  org = ""; 
  cat = ""; 
  editItem ;
  subscription: Subscription; 
  constructor( public datepipe: DatePipe,
      private storage : StorageService,
      private updateDashboard: ComponentInteractionService,
      private router: Router) { }

  ngOnInit(): void {

     this.updateDashboard.incDecData.subscribe(
        response => {
             this.editItem = this.storage.getProduct(response);          
        }
      )
      if(!this.editItem){
         this.initEdit();
      }    
      console.log(this.editItem);
        
  }
  ngOnDestroy():void{
     this.initEdit();
  }

  form = new FormGroup({
       productName : new FormControl('',[Validators.required, Validators.minLength(3)]),
       price : new FormControl('', Validators.required),
       quantity: new FormControl('', Validators.required),
       origin : new FormControl('', Validators.required),
       category : new FormControl('', Validators.required),
       description: new FormControl(''),
       shortCode: new FormControl()
  })
  scode = "";
  onSubmit(){
       let item = this.form.value;       
       this.scode = this.short(item.origin) +  "-" + this.short(item.category) + "-" + item.productName;
       item.shortCode = this.scode;
       let d = new Date();
       let date = this.datepipe.transform(d, 'yyyy-MM-dd');
       item["date"] = date;
       let id; 
       if(this.editItem.productName!=""){
           id = this.editItem.id; 
       } 
       else{
          id = this.storage.getId(); 
          this.storage.storeId(id);
          item["cartQuantity"] = 0;
       }
      
       item["id"] = id;
       this.storage.createProduct(id, item);

       if(this.checked){
          this.initEdit(); 
          this.scode = "";
          this.form.reset();
          this.form.setErrors({});
       }
       else{
          this.initEdit();
          this.form.reset();  
          this.router.navigateByUrl('/dashboard');
       }     
      //  this.form.markAsPristine();
      //  this.form.markAsUntouched();
      //  if (this.form.valid) {
      //   // Remove the state of validation
      //   this.formDirective.resetForm(); 
      // }
       
  }
  initEdit(){
        this.editItem = {
          productName: "", 
          price: "", 
          quantity: "", 
          origin: "", 
          category: "", 
          description: "",
          shortCode: "",
          id: ""
      }
  } 
  short(item){
         if(item.length < 2) return ""; 
         return item[0] + item[1];
  }
  checked = false;
  addAnother(event){
      this.checked = !this.checked;
  }

  updateShortCode(event,id){
      if(id==3){
        this.name = event.target.value;
        this.shortCode = this.short(this.org) + "-" + this.short(this.cat) + "-" + this.name; 
      } 
      else if(id==1){
          this.org = event.value;
          this.shortCode = this.short(this.org) + "-" + this.short(this.cat) + "-" + this.name; 
      } 
      else{
          this.cat = event.value;  
          this.shortCode = this.short(this.org) + "-" + this.short(this.cat) + "-" + this.name; 
      }
  }
  
}
