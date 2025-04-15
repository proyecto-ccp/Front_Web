import { Component, OnInit } from '@angular/core';
import { ModeloService } from './modelo.service';  

@Component({
  selector: 'app-modelo',
  templateUrl: './modelo.component.html',
  styleUrls: ['./modelo.component.css']
})
export class ModeloComponent implements OnInit {
  modelo: any[] = [];
  constructor(private modeloService: ModeloService) { }

  ngOnInit() {
    this.modeloService.getModelo().subscribe((data) => {
      this.modelo = data;  // Asignamos los datos obtenidos a la variable marcas
      });
  }

}


