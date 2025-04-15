import { Component, OnInit } from '@angular/core';
import { vendedorService } from './vendedores.service';

@Component({
  selector: 'app-vendedores',
  templateUrl: './vendedores.component.html',
  styleUrls: ['./vendedores.component.scss']
})
export class VendedoresComponent implements OnInit {
  seleccion: string = '';
  tipoDocumento: any[] = []; 
  
  vendedor = {
    nombre: '',
    apellido: '',
    idtipoDocumento: '',
    NDocumento: 0,
    mail: 0,
    telefono: '',
    fechaRegistro:'',
    fechaActualizacion:''
    
  };
  constructor(private vendedorService: vendedorService) { }

  ngOnInit() {
  }

  Guardar(){
    // Llamar al servicio para guardar el producto
    this.vendedorService.guardarVendedores(this.vendedor).subscribe(
      (response) => {
        console.log('Vendedor guardado correctamente', response);
        this.limpiarFormulario();
        alert('Vendedor guardado correctamente');

      },
      (error) => {
        console.error('Error al guardar el Vendedor', error);
        console.error('Detalle del error', error.error);
        console.log('json',this.vendedor )
        alert('Error al guardar el Vendedor');
      }
    );
  }
  limpiarFormulario(): void {
    this.vendedor = {
      nombre: '',
    apellido: '',
    idtipoDocumento: '',
    NDocumento: 0,
    mail: 0,
    telefono: '',
    fechaRegistro:'',
    fechaActualizacion:''
    
     
    };

  }
    
  

}
