import { Component, OnInit } from '@angular/core';
import { CiudadService } from './ciudad.service';

@Component({
  selector: 'app-ciudad',
  templateUrl: './ciudad.component.html',
  styleUrls: ['./ciudad.component.css']
})
export class CiudadComponent implements OnInit {
  ciudad: any[] = [];
  constructor(private ciudadService: CiudadService) { }

  ngOnInit() {
    this.ciudadService.getCiudad().subscribe((data) => {
      this.ciudad = data;  // Asignamos los datos obtenidos a la variable marcas
      });
  }
  }


