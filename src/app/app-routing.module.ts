import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RutasComponent } from './rutasEntrega/rutas/rutas.component';
import { ProductosComponent } from './productos/productos.component';
import { VendedoresComponent } from './vendedores/vendedores.component';
import { FabricantesComponent } from './fabricantes/fabricantes.component';



const routes: Routes = [
  { path: 'rutasEntrega/rutas', component: RutasComponent },
  { path: 'cargar-productos', component: ProductosComponent },
  {path: 'vendedores', component: VendedoresComponent},
  {path: 'Fabricantes', component: FabricantesComponent}
  // Otras rutas...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
