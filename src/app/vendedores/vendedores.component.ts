import { Component, OnInit } from '@angular/core';
import { vendedorService } from './vendedores.service';
import { TDocumentoService } from '../TDocumento/TDocumento.service';


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
    idTipoDocumento: 0,
    numeroDocumento: '',
    correo: '',
    telefono: '',
    direccion: '',
   
    
  };
  constructor(private vendedorService: vendedorService, private TDocumentoService: TDocumentoService) { }

  ngOnInit() {
    this.getTDocumento();
    
  }

  Guardar(){
    // Llamar al servicio para guardar el producto
    console.log(this.vendedor);
    this.vendedor.idTipoDocumento = Number(this.vendedor.idTipoDocumento);
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
    idTipoDocumento: 0,
    numeroDocumento: '',
    
    correo: '',
    telefono: '',
    direccion: '',
    
    
     
    };

  }

  getTDocumento(){
    this.TDocumentoService.getTDcoumento().subscribe(
      (data) => {
        this.tipoDocumento = data.documentos;
        console.log(this.tipoDocumento)
      },
      (error) => {
        console.error('Error al obtener las ciudades', error);
      }
    );
  }
    
  

}
