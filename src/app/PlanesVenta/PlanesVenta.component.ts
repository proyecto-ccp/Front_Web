import { Component, OnInit } from '@angular/core';
import { PlanesVentaService } from './planesVenta.service';


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

  mensaje : string=""

  constructor(private readonly planVentaService: PlanesVentaService) { }

  ngOnInit() {
  }

  guardarPlanVenta() {
    // Asegúrate de que las fechas están en el formato adecuado (yyyy-MM-dd)
   

    // Ahora puedes llamar al servicio para guardar el plan de venta
    
        console.log('✅ Plan de venta guardado correctamente');
        
  }


    limpiarFormulario(){
      this.planVenta = {
        nombre: '',
        fechaInicio: '',
        fechaFin: ''
      };
    }

  }



