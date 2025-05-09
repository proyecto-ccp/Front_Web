import { Component, OnInit } from '@angular/core';
import { RutaserviceService } from './rutaservice.service';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.scss']
})
export class RutasComponent implements OnInit {

  mensaje = '';
  errores: string[] = [];
  mensajeError = '';
  rutas: any[] = [];

  model = {
    direccionOrigen: '',
    direccionDestino: '',
    tipoEntrega: '',
    metodoTransporte: ''
  };

  constructor(private readonly rutaservice: RutaserviceService) {}

  ngOnInit() {
    // Si deseas que guarde automáticamente al iniciar, descomenta:
    // this.guardarRutas();
    this.obtenerRutas();
  }

  guardarRutas() {
    this.mensaje = '';
    this.errores = [];
    this.mensajeError = '';

    this.rutaservice.guardarRutas(this.model).subscribe({
      next: (resp) => {
        this.mensaje = 'Ruta creada con éxito.';
        this.mensajeError = '';
        console.log("Respuesta del backend:", resp);
      },
      error: (err) => {
        this.mensajeError = 'Ocurrió un error al crear la ruta.';
        const backendErrors = err.error?.errors;
        if (backendErrors) {
          for (const campo in backendErrors) {
            this.errores.push(...backendErrors[campo]);
          }
        } else {
          this.errores.push(err.message || 'Error desconocido.');
        }
      }
    });

    console.log("Formulario enviado:", this.model);
  }
  obtenerRutas() {
    this.rutaservice.obtenerRutas().subscribe({
      next: (data) => {
        this.rutas = data.rutas || data;  // Ajusta según estructura del backend
        console.log('Rutas obtenidas:', this.rutas);
      },
      error: (error) => {
        console.error('Error al obtener rutas:', error);
        this.mensajeError = 'Error al obtener rutas.';
      }
    });
  }
  asociarPedido(ruta: string){

  }
}

