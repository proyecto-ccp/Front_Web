import { Component, OnInit } from '@angular/core';
import { FabricantesService } from './fabricantes.service';
import { CiudadService } from '../ciudad/ciudad.service';
import { TDocumentoService } from '../TDocumento/TDocumento.service';
import { HttpErrorResponse } from '@angular/common/http';
import { PaisService } from '../pais/pais.service';
import { AuthGuard } from '../guards/auth.guard';
import { Router } from '@angular/router';

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


  constructor(private readonly fabricantesService: FabricantesService, private readonly ciudadService: CiudadService, private readonly TDocumentoService: TDocumentoService, private paisService: PaisService, private authService: AuthGuard, private router: Router) { }

  ngOnInit() {
    if (this.authService.isTokenExpired()) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
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
    this.fabricantes.telefono = `${this.indicativo} ${this.fabricantes.telefono}`;
    console.log('Teléfono final con indicativo:', this.fabricantes.telefono);
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
    if (!this.idPais) return;
  
    this.paisService.getIndicativoPais(this.idPais).subscribe({
      next: (data) => {
        this.indicativo = data.pais.indicativo || '';
        console.log('Indicativo cargado:', this.indicativo);
      },
      error: (error) => {
        console.error('Error al obtener el indicativo:', error);
      }
    });
  }

  get telefonoFormateado(): string {
    return this.fabricantes.telefono;
  }
  
  set telefonoFormateado(valor: string) {
    const limpio = valor.replace(/\D/g, '').substring(0, 10); // solo 10 dígitos
    
  
    if (limpio.length >= 7) {
      this.fabricantes.telefono = `${limpio.slice(0, 3)}-${limpio.slice(3, 6)}-${limpio.slice(6)}`;
    } else if (limpio.length >= 4) {
      this.fabricantes.telefono = `${limpio.slice(0, 3)}-${limpio.slice(3)}`;
    } else {
      this.fabricantes.telefono = limpio;
    }
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





