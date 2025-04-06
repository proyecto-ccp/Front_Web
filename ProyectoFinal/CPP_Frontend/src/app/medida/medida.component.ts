import { Component, OnInit } from '@angular/core';
import { MedidaService } from './medida.service';

@Component({
  selector: 'app-medida',
  templateUrl: './medida.component.html',
  styleUrls: ['./medida.component.css']
})
export class MedidaComponent implements OnInit {
  medida: any[] = [];
  constructor(private medidaService: MedidaService) { }

  ngOnInit() {
    this.medidaService.getMedida().subscribe((data) => {
      this.medida = data;  // Asignamos los datos obtenidos a la variable marcas
      });
    }
  }





