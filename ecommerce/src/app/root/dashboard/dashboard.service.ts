import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private storageService: StorageService ) { 
    console.log("from there"); 
   }

   

    x = {
         name: "Robin", 
         id : 10
     }
  } 
