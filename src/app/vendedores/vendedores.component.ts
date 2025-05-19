import { Component, OnInit } from '@angular/core';
import { vendedorService } from './vendedores.service';
import { TDocumentoService } from '../TDocumento/TDocumento.service';
import { CiudadService } from '../ciudad/ciudad.service';
import { ZonasService } from '../zonas/zonas.service';
import { PaisService } from '../pais/pais.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-vendedores',
  templateUrl: './vendedores.component.html',
  styleUrls: ['./vendedores.component.scss']
})
export class VendedoresComponent implements OnInit {
  seleccion: string = '';
  tipoDocumento: any[] = [];
  ciudades: any[] = [];
  idCiudad: string = '';
  zonas: any[] = [];
  errores: any = {};
  mensajeError: string = '';
  mensaje: string = '';
  pais: string = '';
  paises: any[] = [];
  idIndicativo: string = '';
  indicativo: string = '';
  idPais : number = 0;
  paisSeleccionado: string ='';
  contrasena:string =''
  

  vendedor = {
    nombre: '',
    apellido: '',
    idTipoDocumento: 0,
    numeroDocumento: '',
    correo: '',
    telefono: '',
    direccion: '',
    idzona: '',
    contrasena:'',
    idUsuario:''


  };
  constructor(private readonly vendedorService: vendedorService, private readonly TDocumentoService: TDocumentoService, private readonly ciudadService: CiudadService, private readonly zonasService: ZonasService, private readonly paisService: PaisService) { }

  ngOnInit() {
    this.getTDocumento();
    this.getCiudades();
    this.getPaises();

   
    

  }

 

  Guardar() {
    this.errores = {};
    this.mensajeError = '';
    this.mensaje = '';
    
    this.vendedor.telefono = `${this.indicativo} ${this.vendedor.telefono}`;
    console.log('Teléfono final con indicativo:', this.vendedor.telefono);
    // Llamar al servicio para guardar el producto
    console.log(this.vendedor.telefono);
  
    this.vendedor.idTipoDocumento = Number(this.vendedor.idTipoDocumento);
    this.vendedorService.guardarVendedores(this.vendedor).subscribe(
      (response) => {
        console.log('Vendedor guardado correctamente', response);
        this.limpiarFormulario();
        
        this.errores = {};          // Limpia errores por campo
        this.mensajeError = '';
        
        this.mensaje = response.message || 'Vendedor guardado correctamente.';
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
              this.mensajeError = 'Ocurrieron errores al guardar el Vendedor.';
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
 
  




  limpiarFormulario(): void {
    this.vendedor = {
      nombre: '',
      apellido: '',
      idTipoDocumento: 0,
      numeroDocumento: '',
      contrasena:'',
      correo: '',
      telefono: '',
      direccion: '',
      idzona: '',
      idUsuario:''



    };

  }

  obtenerNombreCampo(campo: string): string {
    const nombres: { [key: string]: string } ={
      nombre: 'Nombre',
      apellido: 'Apellido',
      idTipoDocumento: 'Tipo de Documento',
      numeroDocumento: 'Número Documento',
      correo: 'Correo',
      telefono: 'Telefono ',
      direccion: 'Dirección',
      idzona: ' Zona',
      contrasena: 'contrasena'
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
    return this.vendedor.telefono;
  }
  
  set telefonoFormateado(valor: string) {
    const limpio = valor.replace(/\D/g, '').substring(0, 10); // solo 10 dígitos
    
  
    if (limpio.length >= 7) {
      this.vendedor.telefono = `${limpio.slice(0, 3)}-${limpio.slice(3, 6)}-${limpio.slice(6)}`;
    } else if (limpio.length >= 4) {
      this.vendedor.telefono = `${limpio.slice(0, 3)}-${limpio.slice(3)}`;
    } else {
      this.vendedor.telefono = limpio;
    }
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
  getCiudades() {
    this.ciudadService.getCiudad().subscribe(
      (data) => {
        this.ciudades = data.ciudades;
        this.getZonas(this.idCiudad);
      },
      (error) => {
        console.error('Error al obtener las ciudades', error);
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


  getZonas(idCiudad: string) {
    this.zonasService.getZonas(idCiudad).subscribe((data) => {
      this.zonas = data.zonas;
     
    },
      (error) => {
        console.error('Error al obtener las ciudades', error);
      }
    );
  }

  onCitySelected(event: Event): void {
    const selectedCityId = (event.target as HTMLSelectElement).value;
    console.log('Ciudad'+ selectedCityId )
    // Por ejemplo, llamar a un servicio para obtener las zonas de la ciudad
    this.zonasService.getZonas(selectedCityId).subscribe({
      next: (data) => {
        this.zonas = data.zonas;
      },
      error: (error) => {
        console.error('Error cargando zonas:', error);
      }
    });
  }
}
 


