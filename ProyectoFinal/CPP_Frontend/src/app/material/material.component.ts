import { Component, OnInit } from '@angular/core';
import { MaterialService } from './material.service'; 

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  material: any[] = [];
  constructor(private materialService: MaterialService) { }

  ngOnInit() {
    this.materialService.getMaterial().subscribe((data) => {
      this.material = data;  // Asignamos los datos obtenidos a la variable marcas
      });
    }
    }
  




