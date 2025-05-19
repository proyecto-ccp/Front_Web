import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { vendedorService } from '../vendedores/vendedores.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements AfterViewInit {
  codigoVendedor: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  informe: any = null;
  detalleProductos: any[] = [];
  errorMessage: string = '';
  mostrarDetalle: boolean = false;

  displayedColumns: string[] = ['nombreProducto', 'cantidad', 'precioUnitario', 'valorTotal'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private vendedorService: vendedorService) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  consultarInforme() {
    if (!this.codigoVendedor || !this.fechaInicio || !this.fechaFin) {
      this.errorMessage = 'Por favor, ingrese todos los campos';
      return;
    }

    this.vendedorService.getReporteVentas(this.codigoVendedor, this.fechaInicio, this.fechaFin)
    .subscribe({
      next: (response) => {
        this.informe = response.encabezado;
        this.detalleProductos = response.detalle || [];

        this.dataSource = new MatTableDataSource(this.detalleProductos); // IMPORTANTE: crear nuevo DataSource
        this.mostrarDetalle = false;
        this.errorMessage = '';

        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        });
      },
      error: (error) => {
        this.errorMessage = 'Hubo un error al obtener el reporte de ventas.';
      }
    });
}


  verDetalle() {
    this.mostrarDetalle = !this.mostrarDetalle;

    // Reasignar paginator si el detalle se muestra
    if (this.mostrarDetalle) {
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      });
    }
  }
  }
