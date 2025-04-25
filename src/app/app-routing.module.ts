import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RutasComponent } from './rutasEntrega/rutas/rutas.component';
import { ProductosComponent } from './productos/productos.component';
import { VendedoresComponent } from './vendedores/vendedores.component';
import { FabricantesComponent } from './fabricantes/fabricantes.component';
import { AuditarComponent } from "./auditar/auditar.component";
import { ConsultarProductosComponent } from './productos/consultarProductos/consultarProductos.component';
import { PlanesVentaComponent } from './PlanesVenta/PlanesVenta.component';



const routes: Routes = [
  { path: 'rutasEntrega/rutas', component: RutasComponent },
  { path: 'cargar-productos', component: ProductosComponent },
  {path: 'vendedores', component: VendedoresComponent},
  {path: 'Fabricantes', component: FabricantesComponent},
  {path: 'Auditar', component: AuditarComponent},
  {path:'productos/consultarProductos', component: ConsultarProductosComponent},
  {path: 'PlanesVenta', component: PlanesVentaComponent}
  // Otras rutas...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
