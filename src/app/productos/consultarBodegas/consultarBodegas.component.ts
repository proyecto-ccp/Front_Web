import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../producto.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-consultarBodegas',
  templateUrl: './consultarBodegas.component.html',
  styleUrls: ['./consultarBodegas.component.scss']
})
export class ConsultarBodegasComponent implements OnInit {
  bodegas: any[] = [];
  error: string | null = null;
  productoId: number =0;
  filtroBodega: string = '';
bodegasFiltradas: any[] = [];

  constructor(private productoService: ProductoService, private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    {
      const idParam = this.route.snapshot.paramMap.get('productoId') || '';
       this.productoId = Number(idParam);
      console.log("Producto"+ this.productoId)
      this.productoService.getBodegas(this.productoId).subscribe(data => {
        this.bodegas = data.ubicaciones;
        this.bodegasFiltradas = data.ubicaciones; 
        // inicializa sin filtrar
      });
      
    }
  }
  filtrarBodegas() {
    const texto = this.filtroBodega.toLowerCase().trim();
    this.bodegasFiltradas = this.bodegas.filter(b =>
      b.idBodega.toString().includes(texto)
    );

}
}





