import { Component, OnInit } from '@angular/core';
import { MarcaService } from '../Marcas/marca.service'; 

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  seleccion: string = '';
  marcas: any[] = []; 
  constructor(private marcaService: MarcaService) { }

  ngOnInit() {
    this.marcaService.getMarcas().subscribe(
      (data) => {
        // Si 'data' es un objeto y quieres obtener un array con 'key' y 'value'
        if (Array.isArray(data)) {
          // Si 'data' es un array, asignarlo directamente
          this.marcas = data;
        } else {
          // Si 'data' es un objeto, convertirlo a un array de objetos con 'key' y 'value'
          this.marcas = Object.keys(data).map(key => {
            return { key: key, value: data[key] };
          });
        }
      },
      (error) => {
        console.error('Error al obtener las marcas', error);
      }
    );
  }
}