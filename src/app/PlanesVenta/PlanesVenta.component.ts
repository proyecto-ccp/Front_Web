import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-PlanesVenta',
  templateUrl: './PlanesVenta.component.html',
  styleUrls: ['./PlanesVenta.component.scss']
})
export class PlanesVentaComponent implements OnInit {
  planVenta = {
    nombre: '',
    fechaInicio: '',
    fechaFin: ''
  };

  constructor() { }

  ngOnInit() {
  }

  guardarPlanVenta() {
    console.log('Plan de Venta a guardar:', this.planVenta);
    // Aquí podrías enviar los datos al servicio
    alert('Plan de venta registrado exitosamente');
  }

}



