import { Router } from '@angular/router';
import { ComponentInteractionService } from 'src/app/shared/services/component-interaction.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  productArray;
  ELEMENT_DATA: PeriodicElement[] = [];
  popup = false;
  id;

  constructor(private storageService: StorageService, 
        private updateList : ComponentInteractionService,
        private router : Router
        ) {
   }

  displayedColumns: string[] = ['position', 'name','shortCode','price', 'quantity','createdDate','edit','delete'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

        ngOnInit() {
             this.reloadData(); 
        }
        
        showPopup(...args){
            this.popup = !this.popup;
            if(arguments.length > 0){
               this.id = arguments[0]; 
            }
            this.setOpacity(); 
        }
        setOpacity(){
            let div = document.getElementsByClassName('mat-elevation-z8');
            let x = div[0] as HTMLElement; 
            if(this.popup){
              x.style.opacity = "0.3";
            }
            else{
              x.style.opacity = "1.0";
            }
        }

        deleteItem(){
            let cartArray = this.storageService.getProduct("cartArray"); 
            let idx = cartArray.indexOf(this.id);
            if(idx < 0){
                this.storageService.deleteProduct(this.id); 
                this.showPopup();
                this.reloadData(); 
            }  
        }

        reloadData(){
            this.ELEMENT_DATA.length = 0; 
            this.productArray = this.storageService.getAllProducts();
            
            for(let i = 0; i<this.productArray.length; ++i){
                let obj = {
                  position: this.productArray[i].id,
                  name: this.productArray[i].productName,
                  shortCode: this.productArray[i].shortCode,
                  price: this.productArray[i].price, 
                  quantity: this.productArray[i].quantity, 
                  createdDate: this.productArray[i].date,
                  edit : "edit",
                  delete: "delete"

                }
                this.ELEMENT_DATA.push(obj);
            }
            this.dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);
            this.dataSource.paginator = this.paginator;
        }

        editBtnAction(id){
             this.updateList.setInfo(id);
             this.router.navigateByUrl('create');
        }
       
}

export interface PeriodicElement {
  position: number;
  name: string;
  shortCode: string;
  price: number;
  quantity:number;
  createdDate:string
  edit:string
  delete:string
}

