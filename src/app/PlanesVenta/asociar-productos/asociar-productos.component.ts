import { Component, OnInit } from '@angular/core';

import { ProductoService } from 'src/app/productos/producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-asociar-productos',
  templateUrl: './asociar-productos.component.html',
  styleUrls: ['./asociar-productos.component.scss']
})
export class AsociarProductosComponent implements OnInit {

  planId: string = '';
  productos: any[] = [];
  errores: string[] = [];
  productosPaginados: any[] = [];  // Los productos que se mostrarán por página
totalProductos: number = 0;
pageSize: number = 10;
paginaActual: number = 0;
mensajeError : string = '';
mensaje : string = '';
filtroProveedor: string = '';
filtroIdProducto: string = '';
productosFiltrados: any[] = [];

constructor(private route: ActivatedRoute, private productosService: ProductoService,private router: Router) {}

ngOnInit() {
  this.planId = this.route.snapshot.paramMap.get('planId') || '';
  this.cargarProductos();
  this.actualizarProductosPaginados();
  this.productosFiltrados = [...this.productos]; // Copia inicial
  this.totalProductos = this.productosFiltrados.length;
  this.paginaActual = 0;

}
cargarProductos(): void {
  this.productosService.obtenerProductos().subscribe({
    next: (response) => {
      this.productos = response.productos;
      this.totalProductos = this.productos.length;
      this.productosFiltrados = [...this.productos];
      this.actualizarProductosPaginados();
    },
    error: (err) => {
      console.error('Error al cargar productos:', err);
      this.errores.push('No se pudieron cargar los productos.');
    }
  });
}
actualizarProductosPaginados(): void {
  const inicio = this.paginaActual * this.pageSize;
  const fin = inicio + this.pageSize;
  this.productosPaginados = this.productosFiltrados.slice(inicio, fin);

}
cambiarPagina(event: PageEvent): void {
  this.paginaActual = event.pageIndex;
  this.pageSize = event.pageSize;
  this.actualizarProductosPaginados();
}

asociarProductos(): void {
  this.errores = []; // Limpiar errores anteriores

  // Filtrar productos seleccionados
  const productosSeleccionados = this.productos.filter(p => p.seleccionado);

  // Validar selección
  if (productosSeleccionados.length === 0) {
    this.errores.push('Debe seleccionar al menos un producto.');
    return;
  }

  // Validar que cada producto tenga cantidad válida
  const productosInvalidos = productosSeleccionados.filter(p => !p.cantidad || p.cantidad <= 0);

  if (productosInvalidos.length > 0) {
    this.errores.push('Debe ingresar una cantidad válida para cada producto seleccionado.');
    return;
  }

  // Armar los datos a enviar
  const datosAEnviar = productosSeleccionados.map(producto => ({
    idProducto: producto.id,
    cantidad: producto.cantidad,
    valorTotal: producto.precioUnitario * producto.cantidad
  }));

  // Llamar al servicio
  this.productosService.agregarProductos(this.planId, datosAEnviar).subscribe({
    next: (resp) => {
      console.log("Productos seleccionados", datosAEnviar);
      console.log('Plan creado con éxito:', resp);
      this.mensaje = 'Productos asociados con éxito.';
      this.mensajeError = '';
      // this.router.navigate(['/PlanesVenta']);
    },
    error: (err) => {
      console.error('Error al asociar productos:', err);
      this.errores.push('No se pudieron asociar los productos.');
    }
  });
}
aplicarFiltrosProveedor() {
  this.productosFiltrados = this.productos.filter(p =>
    (!this.filtroProveedor || p.idProveedor?.includes(this.filtroProveedor)) 
  );
  this.totalProductos = this.productosFiltrados.length;
  this.paginaActual = 0;  // Reiniciar a la primera página
  this.actualizarProductosPaginados();
}
aplicarFiltrosId() {
    this.productosFiltrados = this.productos.filter(p =>
      (!this.filtroIdProducto || p.id?.toString().includes(this.filtroIdProducto))
    );
    this.totalProductos = this.productosFiltrados.length;
  this.paginaActual = 0;  // Reiniciar a la primera página
  this.actualizarProductosPaginados();

}

}

