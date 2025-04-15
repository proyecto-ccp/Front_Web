import { Component, OnInit } from '@angular/core';
import { ColorService } from './color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {
  color: any[] = [];

  constructor(private colorService: ColorService) {}

  ngOnInit() { // Llamamos al servicio para obtener las marcas cuando el componente se inicializa
  this.colorService.getColor().subscribe((data) => {
  this.color = data;  // Asignamos los datos obtenidos a la variable marcas
  });
}
}







