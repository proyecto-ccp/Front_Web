import { Component, OnInit } from '@angular/core';
import { PlanesVentaService } from './planesVenta.service';
import { Router } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

interface PlanVenta {
  id: string;
  nombre: string;
  fechaInicio: Date;
  fechaFinal: Date;
  tieneProductos?: boolean;
  tieneVendedor?: boolean;
}

@Component({
  selector: 'app-PlanesVenta',
  templateUrl: './PlanesVenta.component.html',
  styleUrls: ['./PlanesVenta.component.scss']
})
export class PlanesVentaComponent implements OnInit {
  
  planVenta = {
    nombre: '',
    fechaInicio: new Date(),
    fechaFin: new Date()
  };

  mensaje: string = '';
  errores: string[] = [];
  mensajeError: string = '';
  planCreado: PlanVenta[] = [];

  constructor(
    private readonly planVentaService: PlanesVentaService,
    private router: Router,
    private authService: AuthGuard
  ) {}

  ngOnInit() {
    if (this.authService.isTokenExpired()) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
    this.cargarPlanes();
  }

  guardarPlanVenta() {
    this.mensaje = '';
    this.errores = [];

    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    const fechaInicio = new Date(this.planVenta.fechaInicio);
    fechaInicio.setHours(0, 0, 0, 0);

    if (fechaInicio < hoy) {
      this.errores.push('La fecha de inicio no puede ser menor que la fecha actual.');
      return;
    }

    if (!this.planVenta.nombre || !this.planVenta.fechaInicio || !this.planVenta.fechaFin) {
      this.errores.push('Todos los campos son obligatorios.');
      return;
    }

    if (this.planVenta.fechaInicio > this.planVenta.fechaFin) {
      this.errores.push('Fecha Final debe ser mayor o igual a la inicial');
      return;
    }

    const planFormateado = {
      nombre: this.planVenta.nombre,
      fechaInicio: this.formatearFecha(this.planVenta.fechaInicio),
      fechaFinal: this.formatearFecha(this.planVenta.fechaFin)
    };

    this.planVentaService.guardarPlan(planFormateado).subscribe({
      next: (resp) => {
        this.mensaje = 'Plan creado con éxito.';
        this.mensajeError = '';
        this.cargarPlanes(); // recarga para incluir estado correcto
        this.limpiarFormulario();
      },
      error: (err) => {
        this.mensajeError = 'Ocurrió un error al crear el plan.';
        const backendErrors = err.error?.errors;
        if (backendErrors) {
          for (const campo in backendErrors) {
            this.errores.push(...backendErrors[campo]);
          }
        } else {
          this.errores.push(err.message || 'Error desconocido.');
        }
      }
    });
  }

  limpiarFormulario() {
    this.planVenta = {
      nombre: '',
      fechaInicio: new Date(),
      fechaFin: new Date()
    };
  }

  formatearFecha(fecha: Date): string {
    const day = String(fecha.getDate()).padStart(2, '0');
    const month = String(fecha.getMonth() + 1).padStart(2, '0');
    const year = fecha.getFullYear();
    return `${year}-${month}-${day}`;
  }

  cargarPlanes() {
    this.planVentaService.ObtenerPlan().subscribe({
      next: (planes) => {
        this.planCreado = planes.planesVentas.map((plan: any) => ({
          ...plan,
          tieneProductos: false // aseguramos que todos empiezan con false
        }));
  
        // Ahora consultar productos plan a plan
        for (const plan of this.planCreado) {
          this.consultarProductosPlan(plan);
        }
      },
      error: (err) => {
        this.errores.push('No se pudieron cargar los planes.');
      }
    });
  }

  irAAsociarProductos(plan: PlanVenta) {
    this.router.navigate(['/asociar-productos', plan.id]);
  }
  irAAsociarVendedores(plan: PlanVenta) {
    this.router.navigate(['/asociar-vendedor', plan.id]);
  }

  consultarProductosPlan(plan: any) {
    this.planVentaService.consultarProductosPlan(plan.id).subscribe({
      next: (respuesta) => {
        console.log("Respuesta del backend:", respuesta);
  
        const productos = respuesta.planVenta?.Productos || respuesta.planVenta?.productos || [];
        plan.tieneProductos = productos.length > 0;
        console.log(`Plan ${plan.nombre} tiene productos: ${plan.tieneProductos}`);
      },
      error: (err) => {
        console.error(`Error al consultar productos del plan ${plan.id}:`, err);
      }
    });
  }
}