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
          this.marcas = data.marcas;  // Asignar los datos al array marcas
          console.log(this.marcas);  // Verifica que los datos se asignan correctamente
        },
      (error) => {
        console.error('Error al obtener las marcas', error);
      }
    );
  }
}
