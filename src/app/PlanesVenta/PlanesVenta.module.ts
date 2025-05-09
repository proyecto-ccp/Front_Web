import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanesVentaComponent } from './PlanesVenta.component';
import { MatPaginatorModule } from '@angular/material/paginator';



@NgModule({
  imports: [
    CommonModule,
    MatPaginatorModule,
    
  ],
  declarations: [PlanesVentaComponent],
  
  
})
export class PlanesVentaModule { }
