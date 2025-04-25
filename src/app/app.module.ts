import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatSidenavModule } from '@angular/material/sidenav';  // Módulo para el menú lateral
import { MatButtonModule } from '@angular/material/button';    // Módulo para los botones
import { MatIconModule } from '@angular/material/icon';        // Módulo para los íconos
import { MatListModule } from '@angular/material/list';        // Módulo para las listas (mat-nav-list)
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './productos/productos.component';
import { RutasComponent } from './rutasEntrega/rutas/rutas.component';
import { MarcasComponent } from './Marcas/Marcas.component';
import { HttpClientModule } from '@angular/common/http';
import { VendedoresComponent } from './vendedores/vendedores.component';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuditarComponent } from './auditar/auditar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FabricantesComponent } from './fabricantes/fabricantes.component';
import { CiudadComponent } from './ciudad/ciudad.component';
import { ConsultarProductosComponent } from './productos/consultarProductos/consultarProductos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PlanesVentaComponent } from './PlanesVenta/PlanesVenta.component';
import { TDocumentoComponent } from './TDocumento/TDocumento.component';



@NgModule({
  declarations: [	
    AppComponent,
    ProductosComponent,
    RutasComponent, 
    MarcasComponent,
    VendedoresComponent,
    AuditarComponent,
    FabricantesComponent,
    CiudadComponent,
    ConsultarProductosComponent,
    PlanesVentaComponent,
    TDocumentoComponent,
    
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbDatepickerModule,
    FormsModule,
    NgbModule, // required animations module
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NgxPaginationModule,
  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }





