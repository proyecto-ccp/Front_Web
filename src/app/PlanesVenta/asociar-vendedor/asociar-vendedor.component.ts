import { Component, OnInit } from '@angular/core';
import { vendedorService } from 'src/app/vendedores/vendedores.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-asociar-vendedor',
  templateUrl: './asociar-vendedor.component.html',
  styleUrls: ['./asociar-vendedor.component.scss']
})
export class AsociarVendedorComponent implements OnInit {
  vendedores: any[] = [];
  vendedoresSeleccionados: string[] = [];
  planId: string = '';
  mensaje: string = '';
  errores: string[] = [];
  mensajeError: string = '';

  constructor(
    private vendedorService: vendedorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerVendedores();
    this.planId = this.route.snapshot.paramMap.get('planId') || '';
  }

  obtenerVendedores() {
    this.vendedorService.obtenerVendedores().subscribe({
      next: (respuesta) => {
        this.vendedores = respuesta.vendedores || respuesta; // según respuesta del backend
        console.log('Vendedores cargados:', this.vendedores);
      },
      error: (err) => {
        console.error('Error al obtener vendedores:', err);
      }
    });
  }

  toggleSeleccion(id: string) {
    const index = this.vendedoresSeleccionados.indexOf(id);
    if (index === -1) {
      this.vendedoresSeleccionados.push(id);
    } else {
      this.vendedoresSeleccionados.splice(index, 1);
    }
  }

  guardarAsociacion() {
    this.errores = [];

    if (this.vendedoresSeleccionados.length === 0) {
      this.errores.push('Debe seleccionar al menos un vendedor.');
      return;
    }

    const datosAEnviar = this.vendedoresSeleccionados.map(id => ({idVendedor: id}));
     console.log('Vendedores asociados:', datosAEnviar + this.planId );

    this.vendedorService.agregarVendedores(this.planId, datosAEnviar).subscribe({
      next: (resp) => {
        console.log('Vendedores asociados:', datosAEnviar + resp);
        this.mensaje = 'Vendedores asociados con éxito.';
        this.mensajeError = '';
        // this.router.navigate(['/PlanesVenta']); // Descomenta si deseas redireccionar
      },
      error: (err) => {
        console.error('Error al asociar vendedores:', err);
        this.errores.push('No se pudieron asociar los vendedores.');
      }
    });
  }
}

