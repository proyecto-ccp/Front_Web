import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendedoresComponent } from './vendedores.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [VendedoresComponent]
})
export class VendedoresModule { }
