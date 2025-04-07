
import { Component, OnInit } from '@angular/core';
import { ProveedorService } from './proveedor.service'; 

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {
  proveedor: any[] = [];
  constructor(private proveedorService: ProveedorService) { }

  ngOnInit() {
    this.proveedorService.getProveedor().subscribe((data) => {
      this.proveedor = data;  // Asignamos los datos obtenidos a la variable marcas
      });
    }
    }
  



