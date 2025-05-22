import { Component, OnInit } from '@angular/core';
import { AuditoriaService } from './auditoria.service';
import { Router } from '@angular/router';
import { AuthService } from '../login/auth.service';
import { AuthGuard } from '../guards/auth.guard';

@Component({
  selector: 'app-auditar',
  templateUrl: './auditar.component.html',
  styleUrls: ['./auditar.component.css']
})
export class AuditarComponent implements OnInit {
  auditorias: any[] = [];
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();
  idSeleccionado: string = '';

  // Lista de usuarios únicos
  usuarios: { id: string, userName: string }[] = [];

  // Paginación
  paginaActual: number = 1;
  auditoriasPorPagina: number = 5;

  // Ordenamiento
  ordenAscendente: boolean = true;

  constructor(private auditoriaService: AuditoriaService, private router: Router, private  authService: AuthGuard) {}
  
  ngOnInit() {
    if (this.authService.isTokenExpired()) {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }
  }

  consultarAuditorifecha() {
    if (!this.fechaInicio || !this.fechaFin) {
      alert('Selecciona las fechas correctamente.');
      return;
    }

    const fechaInicioISO = this.fechaInicio.toISOString();
    const fechaFinISO = this.fechaFin.toISOString();

    const fechaInicioFormatted = this.fechaInicio.toISOString().split('T')[0];
const fechaFinFormatted = this.fechaFin.toISOString().split('T')[0];

    this.auditoriaService.obtenerAuditoriasPorFecha(new Date(fechaInicioISO), new Date(fechaInicioISO))
      .subscribe({
        next: (data) => {
          this.auditorias = data.auditorias || [];
          this.paginaActual = 1;

          // Extraer usuarios únicos
          const mapaUsuarios = new Map<string, string>();
          this.auditorias.forEach(a => {
            if (!mapaUsuarios.has(a.idUsuario)) {
              mapaUsuarios.set(a.idUsuario, a.userName);
            }
          });

          this.usuarios = Array.from(mapaUsuarios.entries()).map(([id, userName]) => ({ id, userName }));
        },
        error: (err) => {
          console.error('Error al consultar auditorías:', err);
        }
      });
  }

  consultarPorUsuario() {
    if (!this.idSeleccionado) return;

    this.auditoriaService.obtenerAuditoriasPorUsuario(this.idSeleccionado)
      .subscribe({
        next: (data) => {
          this.auditorias = data.auditorias || [];
          this.paginaActual = 1;
        },
        error: (err) => {
          console.error('Error al consultar auditorías:', err);
        }
      });
  }

  get auditoriasPaginadas(): any[] {
    const inicio = (this.paginaActual - 1) * this.auditoriasPorPagina;
    return this.auditorias.slice(inicio, inicio + this.auditoriasPorPagina);
  }

  get totalPaginas(): number {
    return Math.ceil(this.auditorias.length / this.auditoriasPorPagina);
  }

  paginasVisibles(): number[] {
    const rango = 2;
    const paginas: number[] = [];

    const inicio = Math.max(1, this.paginaActual - rango);
    const fin = Math.min(this.totalPaginas, this.paginaActual + rango);

    for (let i = inicio; i <= fin; i++) {
      paginas.push(i);
    }

    return paginas;
  }

  cambiarPagina(pagina: number): void {
    if (pagina >= 1 && pagina <= this.totalPaginas) {
      this.paginaActual = pagina;
    }
  }

  ordenarPorFecha(): void {
    this.auditorias.sort((a, b) => {
      const fechaA = new Date(a.fechaCreacion).getTime();
      const fechaB = new Date(b.fechaCreacion).getTime();
      return this.ordenAscendente ? fechaA - fechaB : fechaB - fechaA;
    });

    this.ordenAscendente = !this.ordenAscendente;
    this.paginaActual = 1;
  }
}