import { Component, OnInit } from '@angular/core';
import { MarcaService } from '../Marcas/marca.service'; 
import { ProveedorService } from '../proveedor/proveedor.service';
import { MaterialService } from '../material/material.service';
import {ColorService} from '../color/color.service';
import {ModeloService} from '../modelo/modelo.service'
import {CategoriaService} from '../categoria/categoria.service'
import { MedidaService } from '../medida/medida.service';
import { ProductoService } from './producto.service';

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
  modelo: any[] = [];
  categoria: any[]=[];
  medida: any[]=[];
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
    urlFoto2: 'urlFoto1'
  };
  selectedFile: File | null = null;
  constructor(private marcaService: MarcaService, private MaterialService: MaterialService,private ColorService: ColorService, private ModeloService: ModeloService, private CategoriaService: CategoriaService, private MedidaService: MedidaService, private ProductoService: ProductoService) { }
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }
  ngOnInit() {
    this.getMaterial();
    this.getColor();
    this.getModelo();
    this.getCategoria();
    this.getMedida();
      this.marcaService.getMarcas().subscribe(
        (data) => {
          this.marcas = data.marcas;  // Asignar los datos al array marcas
          console.log(this.marcas);  // Verifica que los datos se asignan correctamente
        },
      (error) => {
        console.error('Error al obtener las marcas', error);
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
    }
  );

  }
  Guardar(){
    // Llamar al servicio para guardar el producto

    this.ProductoService.guardarProducto(this.productos).subscribe(
      (response) => {
        console.log('Producto guardado correctamente', response);
        this.limpiarFormulario();
        alert('Producto guardado correctamente');

      },
      (error) => {
        console.error('Error al guardar el producto', error);
        console.error('Detalle del error', error.error);
        console.log('json',this.productos )
        alert('Error al guardar el producto');
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
    urlFoto2: 'urlFoto1'
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
  
}



