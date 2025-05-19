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
import { AsociarProductosComponent } from './PlanesVenta/asociar-productos/asociar-productos.component';
import { RutasComponent } from './rutasEntrega/rutas/rutas.component';
import { LOCALE_ID } from '@angular/core';
import { MarcasComponent } from './Marcas/Marcas.component';
import { HttpClientModule } from '@angular/common/http';
import { VendedoresComponent } from './vendedores/vendedores.component';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuditarComponent } from './auditar/auditar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort'; 
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FabricantesComponent } from './fabricantes/fabricantes.component';
import { CiudadComponent } from './ciudad/ciudad.component';
import { ConsultarProductosComponent } from './productos/consultarProductos/consultarProductos.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { PlanesVentaComponent } from './PlanesVenta/PlanesVenta.component';
import { TDocumentoComponent } from './TDocumento/TDocumento.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
//
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AsociarVendedorComponent } from './PlanesVenta/asociar-vendedor/asociar-vendedor.component';


import { CalendarModule } from 'primeng/calendar';
import { ConsultarBodegasComponent } from './productos/consultarBodegas/consultarBodegas.component';
import { LoginComponent } from './login/login.component';
import { ReporteComponent } from './reporte/reporte.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AuthGuard } from './guards/auth.guard';
import { CommonModule } from '@angular/common'; 
import { AsociarPedidoComponent } from './rutasEntrega/rutas/asociar-pedido/asociar-pedido.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';



//import { ReactiveFormsModule, FormsModule } from '@angular/forms';

export const CUSTOM_DATE_FORMATS = {
  parse: { dateInput: 'DD-MM-YYYY' },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

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
    AsociarProductosComponent,
    AsociarVendedorComponent,
    ConsultarBodegasComponent,
    LoginComponent,
    ReporteComponent,
    AsociarPedidoComponent
    
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
    CalendarModule ,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    NgxPaginationModule,
    MatDatepickerModule,
   // MatMomentDateModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
   

  
    
  ],
  
     providers: [
      
       provideNativeDateAdapter(),
       { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
       { provide: LOCALE_ID, useValue: 'en-CA' },
       {provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true },
       provideAnimationsAsync()
     
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }





