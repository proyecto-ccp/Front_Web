import { Component } from '@angular/core';

@Component({
  selector: 'app-rutas',
  templateUrl: './rutas.component.html',
  styleUrls: ['./rutas.component.css']
})
export class RutasComponent {

  // Aquí puedes definir las propiedades del formulario, si es necesario
  // Ejemplo: model para el formulario
  model = {
    direccionDestino: '',
    direccionOrigen: '',
    tipoEntrega: '',
    tiempoEntrega: '',
    metodoTransporte: '',
    fechaEntrega: ''
  };

  // Método que se invoca cuando se envía el formulario
  onSubmit() {
    console.log("Formulario enviado:", this.model);
    // Aquí puedes agregar la lógica para manejar el envío del formulario
    // Ejemplo: enviar los datos a un servicio, o realizar alguna acción
  }
}


