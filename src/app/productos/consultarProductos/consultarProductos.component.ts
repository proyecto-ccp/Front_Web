import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultarProductos',
  templateUrl: './ConsultarProductos.component.html',
  styleUrls: ['./consultarProductos.component.scss']
})
export class ConsultarProductosComponent implements OnInit {
  producto: any[] = [];
  paginaActual: number = 1;
  filtroProveedor: string = '';
  filtroIdProducto: string = '';
  productosFiltrados: any[] = [];
  

  
  constructor(private ProductoService: ProductoService, private router: Router) { }

  ngOnInit() {
    this.obtenerProductos();
  }

  obtenerProductos(){
    this.ProductoService.obtenerProductos().subscribe(
      data => {
        this.producto = data.productos;
        this.productosFiltrados = this.producto;
        console.log(this.producto)
      },
      error => {
        console.error('Error al obtener los productos:', error);
      }
    );
  }
  aplicarFiltrosProveedor() {
    this.productosFiltrados = this.producto.filter(p =>
      (!this.filtroProveedor || p.idProveedor?.includes(this.filtroProveedor)) 
    );
  }
  aplicarFiltrosId() {
      this.productosFiltrados = this.producto.filter(p =>
        (!this.filtroIdProducto || p.id?.toString().includes(this.filtroIdProducto))
      );

  }
  irAConsultarBodegas(productoId: any) {
    this.router.navigate(['/consultarBodegas/', productoId.id]);
  }
  
    
     

}
