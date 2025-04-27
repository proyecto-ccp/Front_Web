import { Component, OnInit } from '@angular/core';
import { vendedorService } from './vendedores.service';
import { TDocumentoService } from '../TDocumento/TDocumento.service';
import { CiudadService } from '../ciudad/ciudad.service';
import { ZonasService } from '../zonas/zonas.service';


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


  vendedor = {
    nombre: '',
    apellido: '',
    idTipoDocumento: 0,
    numeroDocumento: '',
    correo: '',
    telefono: '',
    direccion: '',
    idzona: ''


  };
  constructor(private readonly vendedorService: vendedorService, private readonly TDocumentoService: TDocumentoService, private readonly ciudadService: CiudadService, private readonly zonasService: ZonasService) { }

  ngOnInit() {
    this.getTDocumento();
    this.getCiudades();

  }

  Guardar() {
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
        console.log('json', this.vendedor)
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
      idzona: ''



    };

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
  getZonas(idCiudad: string) {
    this.zonasService.getZonas(idCiudad).subscribe((data) => {
      this.zonas = data.zonas;
     
    },
      (error) => {
        console.error('Error al obtener las ciudades', error);
      }
    );
  }

  onCitySelected(event: any): void {
    const cityId = event.target.value;
    this.idCiudad = cityId;
    this.getZonas(cityId);
    // Llamamos al servicio para obtener las zonas de la ciudad seleccionada
 
  }
}


  


