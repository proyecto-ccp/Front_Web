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
import { PrincipalMenuComponent } from './principalMenu/principalMenu.component';
import { RutasComponent } from './rutasEntrega/rutas/rutas.component';
import { MarcaService } from './Marcas/marca.service';
import { MarcasComponent } from './Marcas/Marcas.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { VendedoresComponent } from './vendedores/vendedores.component';


@NgModule({
  declarations: [	
    AppComponent,
    ProductosComponent,
    PrincipalMenuComponent,
    RutasComponent, 
    MarcasComponent,
    VendedoresComponent
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
    BrowserAnimationsModule, // required animations module
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }





