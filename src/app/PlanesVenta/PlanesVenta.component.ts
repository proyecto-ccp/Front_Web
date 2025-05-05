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
    this.planVentaService.guardarPlan(this.planVenta).subscribe(
      (response) => {
        console.log('✅ Plan de venta guardado correctamente', response);
        this.limpiarFormulario();
        this.mensaje = response.message || 'Plan de venta guardado correctamente.';
      },
      (error) => {
        // Manejo de errores (igual al anterior)
        console.error('❌ Error al guardar el plan de venta:', error);
      }
    );
  }


    limpiarFormulario(){
      this.planVenta = {
        nombre: '',
        fechaInicio: '',
        fechaFin: ''
      };
    }

  }



