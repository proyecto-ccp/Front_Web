import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RutasComponent } from './rutasEntrega/rutas/rutas.component';
import { ProductosComponent } from './productos/productos.component';



const routes: Routes = [
  { path: 'rutasEntrega/rutas', component: RutasComponent },
  { path: 'cargar-productos', component: ProductosComponent },
  // Otras rutas...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
