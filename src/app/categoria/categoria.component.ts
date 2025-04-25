import { Component, OnInit } from '@angular/core';
import {CategoriaService} from './categoria.service'

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  categoria: any[] = [];
  constructor(private readonly  categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categoriaService.getCategoria().subscribe((data) => {
      this.categoria = data;  // Asignamos los datos obtenidos a la variable marcas
      });
    }
    }


