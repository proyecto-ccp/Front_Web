import { Component, OnInit } from '@angular/core';
import { MarcaService } from '../Marcas/marca.service'; 
import { MaterialService } from '../material/material.service';
import {ColorService} from '../color/color.service';
import {ModeloService} from '../modelo/modelo.service'
import {CategoriaService} from '../categoria/categoria.service'
import { MedidaService } from '../medida/medida.service';
import { ProductoService } from './producto.service';
import { FabricantesService } from '../fabricantes/fabricantes.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})


export class ProductosComponent implements OnInit {
  seleccion: string = '';
  marcas: any[] = []; 
  material : any[] = [];
  color: any[] = [];
  mensajeError='';
  mensaje='';
  modelo: any[] = [];
  categoria: any[]=[];
  medida: any[]=[];
  proveedores: any[]=[];
  productos = {
    nombre: '',
    descripcion: '',
    idProveedor: '',
    idMarca: 0,
    idColor: 0,
    idModelo: 0,
    idMaterial: 0,
    precioUnitario: 0,
    idMedida:0,
    idCategoria:0,
    urlFoto1: 'urlFoto1',
    urlFoto2: 'urlFoto1',
    cantidad: 0
  };
  selectedFile: File | null = null;
  constructor(private readonly marcaService: MarcaService, private readonly MaterialService: MaterialService,private readonly ColorService: ColorService, private readonly ModeloService: ModeloService, private readonly CategoriaService: CategoriaService, private readonly MedidaService: MedidaService, private readonly ProductoService: ProductoService, private readonly FabricanteServive: FabricantesService) { }
  onFileChange(event: any): void {
    const file = event.target.files[0];
  
    if (file) {
      const isCsv = file.name.toLowerCase().endsWith('.csv');
  
      if (!isCsv) {
        this.mensajeError = 'Solo se permiten archivos CSV';
        this.selectedFile = null;
        return;
      }
  
      this.selectedFile = file;
      this.mensajeError = '';  // Limpia errores anteriores si todo está bien
    }
  }
  ngOnInit() {
    this.getMaterial();
    this.getColor();
    this.getModelo();
    this.getCategoria();
    this.getMedida();
    this.getProveedores();
      this.marcaService.getMarcas().subscribe(
        (data) => {
          this.marcas = data.marcas;  // Asignar los datos al array marcas
          console.log(this.marcas);  // Verifica que los datos se asignan correctamente
        },
      (error) => {
        console.error('Error al obtener las marcas', error);
        this.mensajeError = 'Error al cargar datos';
      }
    );
  }
  getMaterial(){
    this.MaterialService.getMaterial().subscribe(
      (data) => {
        this.material = data.materiales;  // Asignar los datos al array marcas
        console.log(this.material);  // Verifica que los datos se asignan correctamente
      },
    (error) => {
      console.error('Error al obtener los materiales', error);
      this.mensajeError = 'Error al cargar datos';
    }
  );
  }
  getColor(){
    this.ColorService.getColor().subscribe(
      (data) => {
        this.color = data.colores;  // Asignar los datos al array marcas
        console.log(this.color);  // Verifica que los datos se asignan correctamente
      },
    (error) => {
      console.error('Error al obtener los Colores', error);
      this.mensajeError = 'Error al cargar datos';
    }
  );

  }

  getModelo(){
    this.ModeloService.getModelo().subscribe(
      (data) => {
        this.modelo = data.modelos;  // Asignar los datos al array marcas
        console.log(this.modelo);  // Verifica que los datos se asignan correctamente
      },
    (error) => {
      console.error('Error al obtener los modelos', error);
      this.mensajeError = 'Error al cargar datos';
    }
  );


  }
  getCategoria(){
    this.CategoriaService.getCategoria().subscribe(
      (data) => {
        this.categoria = data.categorias;  // Asignar los datos al array marcas
        console.log(this.categoria);  // Verifica que los datos se asignan correctamente
      },
    (error) => {
      console.error('Error al obtener los categoria', error);
      this.mensajeError = 'Error al cargar datos';
    }
  );
  }
  getMedida(){
    this.MedidaService.getMedida().subscribe(
      (data) => {
        this.medida = data.medidas;  // Asignar los datos al array marcas
        console.log(this.medida);  // Verifica que los datos se asignan correctamente
      },
    (error) => {
      console.error('Error al obtener los categoria', error);
      this.mensajeError = 'Error al cargar datos';
    }
  );

  }
  Guardar(){
    // Llamar al servicio para guardar el producto

    this.ProductoService.guardarProducto(this.productos).subscribe(
      (response) => {
        console.log('Producto guardado correctamente', response);
        this.limpiarFormulario();
        alert('Producto guardado correctamente'+response);
        this.mensaje='Producto guardado correctamente'+response.mensaje;

      },
      (error) => {
        console.error('Error al guardar el producto', error);
        console.error('Detalle del error', error.error);
        console.log('json',this.productos )
        alert('Error al guardar el producto'+error);
        this.mensajeError='Error al guardar el producto';
      }
    );
  }
  limpiarFormulario(): void {
    this.productos = {
      nombre: '',
    descripcion: '',
    idProveedor: '',
    idMarca: 0,
    idColor: 0,
    idModelo: 0,
    idMaterial: 0,
    precioUnitario: 0,
    idMedida:0,
    idCategoria:0,
    urlFoto1: 'urlFoto1',
    urlFoto2: 'urlFoto1',
    cantidad: 0
    };

  }

  onSubmit() {
    if (this.selectedFile) {
    this.ProductoService.uploadFile(this.selectedFile).subscribe(
        (response) => {
          console.log('Archivo subido con éxito', response);
          alert('Productos guardados correctamente');
          this.selectedFile=null;
        },
        (error) => {
          console.error('Error al subir el archivo', error);
          alert('Error al subir el archivo');
        }
      );
    }
  }

  obtenerProductos(){
    this.ProductoService.obtenerProductos().subscribe(
      data => {
        this.productos = data;
      },
      error => {
        console.error('Error al obtener los productos:', error);
        this.mensajeError = 'Error al cargar datos';
      }
    );
  }

  getProveedores(){
    this.FabricanteServive.getProveedores().subscribe(
      (data) => {
        this.proveedores = data.proveedores;  // Asignar los datos al array marcas
        console.log(this.proveedores);  // Verifica que los datos se asignan correctamente
      },
    (error) => {
      console.error('Error al obtener los categoria', error);
      this.mensajeError = 'Error al cargar datos';
    }
  );

  }
  
}



