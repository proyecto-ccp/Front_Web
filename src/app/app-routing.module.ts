import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RutasComponent } from './rutasEntrega/rutas/rutas.component';
import { ProductosComponent } from './productos/productos.component';
import { VendedoresComponent } from './vendedores/vendedores.component';
import { FabricantesComponent } from './fabricantes/fabricantes.component';
import { AuditarComponent } from "./auditar/auditar.component";
import { ConsultarProductosComponent } from './productos/consultarProductos/consultarProductos.component';
import { PlanesVentaComponent } from './PlanesVenta/PlanesVenta.component';
import { AsociarProductosComponent } from './PlanesVenta/asociar-productos/asociar-productos.component';
import { AsociarVendedorComponent } from './PlanesVenta/asociar-vendedor/asociar-vendedor.component';
import { ConsultarBodegasComponent } from './productos/consultarBodegas/consultarBodegas.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './login/inicio/inicio.component';
import { ReporteComponent } from './reporte/reporte.component';
import { AuthGuard } from './guards/auth.guard';
import { AsociarPedidoComponent } from './rutasEntrega/rutas/asociar-pedido/asociar-pedido.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent  },
  { path: 'rutasEntrega/rutas', component: RutasComponent, canActivate: [AuthGuard] },
  { path: 'cargar-productos', component: ProductosComponent, canActivate: [AuthGuard] },
  {path: 'vendedores', component: VendedoresComponent, canActivate: [AuthGuard]},
  {path: 'Fabricantes', component: FabricantesComponent,canActivate: [AuthGuard]},
  {path: 'Auditar', component: AuditarComponent, canActivate: [AuthGuard]},
  {path:'productos/consultarProductos', component: ConsultarProductosComponent, canActivate: [AuthGuard]},
  {path: 'PlanesVenta', component: PlanesVentaComponent, canActivate: [AuthGuard]},
  {path: 'asociar-productos/:planId',component: AsociarProductosComponent, canActivate: [AuthGuard] },
  {path: 'asociar-vendedor/:planId',component: AsociarVendedorComponent, canActivate: [AuthGuard] },
  {path: 'consultarBodegas/:productoId',component: ConsultarBodegasComponent, canActivate: [AuthGuard]  },
  {path: 'reportes',component: ReporteComponent, canActivate: [AuthGuard] },
  {path:  'asociarPedido/:idRuta',component:AsociarPedidoComponent, canActivate: [AuthGuard]},
  {path: 'inicio',component: InicioComponent, canActivate: [AuthGuard]},
   // redirige raíz a inicio
 // { path: '', redirectTo: 'login', pathMatch: 'full' }
  // Otras rutas...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
