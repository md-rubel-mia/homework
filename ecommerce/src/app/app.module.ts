import { CartPanelComponent } from './root/cart-panel/cart-panel.component';
import { DatePipe } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AssignmentComponent } from './assignment/assignment.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatIconModule} from '@angular/material/icon';
const routes: Routes = [
  {path: '', loadChildren: () => import('./root/root.module').then ( m => m.RootModule)},
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [
    AppComponent,
    AssignmentComponent,
  ],
  imports: [
     BrowserModule,
     FlexLayoutModule,
     MatIconModule,
     RouterModule.forRoot(routes),
     BrowserAnimationsModule,
     MatSelectModule,
     FormsModule,
     ReactiveFormsModule
  ],
  providers: [
     DatePipe,
     CartPanelComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
