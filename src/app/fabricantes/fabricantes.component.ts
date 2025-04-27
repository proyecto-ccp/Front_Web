import { Component, OnInit } from '@angular/core';
import { FabricantesService } from './fabricantes.service';
import { CiudadService } from '../ciudad/ciudad.service';
import { TDocumentoService } from '../TDocumento/TDocumento.service';

@Component({
  selector: 'app-fabricantes',
  templateUrl: './fabricantes.component.html',
  styleUrls: ['./fabricantes.component.scss']
})
export class FabricantesComponent implements OnInit {
  fabricantes = {
    idTipoDocumento:0,
    numeroDocumento:'',
    nombre: '',
    telefono: '',
    correo: '',
    direccion: '',
    idCiudad: ''
  };
  
  ciudades: any[] = [];
  tipoDocumento: any[]=[];
 

  constructor(private readonly fabricantesService: FabricantesService, private readonly ciudadService : CiudadService, private readonly TDocumentoService: TDocumentoService) { }

  ngOnInit() {
    this.getCiudades();
    this.getTDocumento();
  }

  Guardar(){
    this.fabricantesService.guardarProveedores(this.fabricantes).subscribe(
      (response) => {
        console.log('fabricantes guardado correctamente', response);
        this.limpiarCampos();
        alert('fabricantes guardado correctamente');

      },
      (error) => {
        console.error('Error al guardar el fabricantes', error);
        console.error('Detalle del error', error.error);
        console.log('json',this.fabricantes )
        alert('Error al guardar el fabricantes');
      }
    );
  }
 limpiarCampos(){
  this.fabricantes = {
    idTipoDocumento:0,
    numeroDocumento:'',
    nombre: '',
    telefono: '',
    correo: '',
    direccion: '',
    idCiudad: ''
  };
 }
 getCiudades(){
  this.ciudadService.getCiudad().subscribe(
    (data) => {
      this.ciudades = data.ciudades;
    },
    (error) => {
      console.error('Error al obtener las ciudades', error);
    }
  );
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
 getProveedores(){
  this.fabricantesService.getProveedores().subscribe(
    (data) => {
      this.fabricantes = data.fabricantes;
      console.log(this.fabricantes)
    },
    (error) => {
      console.error('Error al obtener las fabricantes', error);
    }
  );
}

 }
  

