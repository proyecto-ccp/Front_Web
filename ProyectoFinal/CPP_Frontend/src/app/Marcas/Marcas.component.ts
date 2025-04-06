import { Component, OnInit } from '@angular/core';
import { MarcaService } from './marca.service'; 

@Component({
  selector: 'app-Marcas',
  templateUrl: './Marcas.component.html',
  styleUrls: ['./Marcas.component.css']
})
export class MarcasComponent implements OnInit {
  marcas: any[] = [];

  constructor(private marcaService: MarcaService) {}

  ngOnInit() { // Llamamos al servicio para obtener las marcas cuando el componente se inicializa
  this.marcaService.getMarcas().subscribe((data) => {
  this.marcas = data;  // Asignamos los datos obtenidos a la variable marcas
  });
}
}
