import { Component, OnInit } from '@angular/core';
import { TDocumentoService } from './TDocumento.service';

@Component({
  selector: 'app-TDocumento',
  templateUrl: './TDocumento.component.html',
  styleUrls: ['./TDocumento.component.css']
})
export class TDocumentoComponent implements OnInit {
  tDocumento: any[] = [];
  constructor(private TDcoumentoService: TDocumentoService) { }

  ngOnInit() {
    this.TDcoumentoService.getTDcoumento().subscribe((data) => {
      this.tDocumento = data;  // Asignamos los datos obtenidos a la variable marcas
      });
  }
  }


