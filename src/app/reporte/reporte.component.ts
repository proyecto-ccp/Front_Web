

import { Component } from '@angular/core';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent {
  codigoVendedor: string = '';
  fecha: string = '';
  informe: any = null;

  consultarInforme() {
    // Simulación de datos, luego conectar con un servicio HTTP
    this.informe = {
      nombre: 'Carlos Pérez',
      zona: 'Norte Andina',
      pais: 'Colombia',
      fecha: this.fecha,
      moneda: 'COP',
      ventasTotales: 15000000,
      unidadesVendidas: 125,
      valorPromedio: 120000
    };
  }
}
