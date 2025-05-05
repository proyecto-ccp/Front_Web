import { Component, OnInit } from '@angular/core';
import { FabricantesService } from './fabricantes.service';
import { CiudadService } from '../ciudad/ciudad.service';
import { TDocumentoService } from '../TDocumento/TDocumento.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PaisService } from '../pais/pais.service';

@Component({
  selector: 'app-fabricantes',
  templateUrl: './fabricantes.component.html',
  styleUrls: ['./fabricantes.component.scss']
})
export class FabricantesComponent implements OnInit {
  fabricantes = {
    idTipoDocumento: 0,
    numeroDocumento: '',
    nombre: '',
    telefono: '',
    correo: '',
    direccion: '',
    idCiudad: ''
  };

  ciudades: any[] = [];
  tipoDocumento: any[] = [];
  errores: any = {};
  mensajeError: string = '';
  mensaje: string = '';
  pais: string = '';
  paises: any[] = [];
  idIndicativo: string = '';
  indicativo: string = '';
  idPais : number = 0;


  constructor(private readonly fabricantesService: FabricantesService, private readonly ciudadService: CiudadService, private readonly TDocumentoService: TDocumentoService, private paisService: PaisService) { }

  ngOnInit() {
    this.getCiudades();
    this.getTDocumento();
    this.errores = {};          // Limpia errores por campo
    this.mensajeError = '';
    this.getPaises();
  }

  Guardar() {
    this.errores = {};
    this.mensajeError = '';
    this.mensaje = '';

    this.fabricantesService.guardarProveedores(this.fabricantes).subscribe(
      (response) => {
        console.log('Fabricante guardado correctamente', response);
        this.limpiarCampos();
        this.errores = {};          // Limpia errores por campo
        this.mensajeError = '';
        this.ngOnInit();

        this.mensaje = response.message || 'Fabricante guardado correctamente.';
      },
      (error) => {
        console.error('❌ Error al guardar:', error);

        if (error.error && error.error.errors) {
          this.errores = error.error.errors;

          // ✅ Tipado seguro con validación por si no es un array
          const erroresCampos = Object.entries(this.errores)
            .map(([campo, mensajes]: [string, any]) => {
              const campoFormateado = this.obtenerNombreCampo(campo);
              const mensajeTexto = Array.isArray(mensajes) ? mensajes[0] : mensajes;
              return `${campoFormateado}: ${mensajeTexto}`;
            })
            .join('\n');

          this.mensajeError = erroresCampos || 'Por favor corrija los errores.';
        } else if (typeof error.error === 'string') {
          try {
            const parsed = JSON.parse(error.error);
            if (parsed.errors) {
              this.errores = parsed.errors;
              this.mensajeError = 'Ocurrieron errores al guardar el fabricante.';
            } else {
              this.mensajeError = parsed.message || 'Error desconocido.';
            }
          } catch (e) {
            this.mensajeError = 'No se pudo interpretar la respuesta del servidor.';
          }
        } else {
          this.mensajeError = 'Error al conectar con el servidor.';
        }
      }
    );
  }
  limpiarCampos() {
    this.fabricantes = {
      idTipoDocumento: 0,
      numeroDocumento: '',
      nombre: '',
      telefono: '',
      correo: '',
      direccion: '',
      idCiudad: ''
    };
    this.errores = {};
    this.mensajeError = '';
  }
  getCiudades() {
    this.ciudadService.getCiudad().subscribe(
      (data) => {
        this.ciudades = data.ciudades;
      },
      (error) => {
        console.error('Error al obtener las ciudades', error);
      }
    );
  }
  getTDocumento() {
    this.TDocumentoService.getTDcoumento().subscribe(
      (data) => {
        this.tipoDocumento = data.tiposDocumentos;
        console.log(this.tipoDocumento)
      },
      (error) => {
        console.error('Error al obtener las ciudades', error);
      }
    );
  }

  obtenerNombreCampo(campo: string): string {
    const nombres: { [key: string]: string } = {
      telefono: 'Teléfono',
      correo: 'Correo',
      nombre: 'Nombre o Razón Social',
      numeroDocumento: 'Número de Documento',
      direccion: 'Dirección',
      idTipoDocumento: 'Tipo de Documento',
      idCiudad: 'Ciudad'
    };
    return nombres[campo] || campo;
  }

  onPaisSelected(): void {
    if (!this.idPais || !this.fabricantes.telefono) return;

    this.paisService.getIndicativoPais(this.idPais).subscribe(
      (data) => {
        const indicativo = (data.pais.indicativo || '') + ' ';
        
        // Limpia cualquier indicativo anterior para evitar duplicados
        //this.fabricantes.telefono = this.fabricantes.telefono.replace(/^\+?\d{1,4}/, '');
        this.fabricantes.telefono = `${indicativo} `+' '+` ${this.fabricantes.telefono}`;
        console.log('Teléfono con indicativo:', this.fabricantes.telefono);
      },
      (error) => {
        console.error('Error al obtener el indicativo:', error);
      }
    );
  }

  getPaises() {
    this.paisService.getPaises().subscribe(
      (data) => {
        this.paises = data.paises;
       // this.getZonas(this.idCiudad);
      },
      (error) => {
        console.error('Error al obtener las ciudades', error);
      }
    );
  }

}


