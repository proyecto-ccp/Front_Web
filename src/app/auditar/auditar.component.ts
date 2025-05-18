import { Component, OnInit } from '@angular/core';
import { AuditoriaService } from './auditoria.service';

@Component({
  selector: 'app-auditar',
  templateUrl: './auditar.component.html',
  styleUrls: ['./auditar.component.css']
})
export class AuditarComponent implements OnInit {
  fechaSeleccionada1 = { year: 2024, month: 4, day: 16 };
  fechaSeleccionada2 = { year: 2024, month: 4, day: 30 };
  auditorias: any=[];
  fechaInicio: Date = new Date;
  fechaFin: Date= new Date;
  idSeleccionado: string ='';

  constructor(private auditoriaService: AuditoriaService) { }

  ngOnInit() {
    const inicio = '2025-05-15T16:00:00.420Z';
    const fin = '2025-05-22T16:00:00.420Z';
    
    
  }

  consultarAuditorifecha(){
    if (!this.fechaInicio || !this.fechaFin) {
      alert('Selecciona las fechas correctamente.');
      return;
    }

    const fechaInicioISO = this.fechaInicio.toISOString();
    const fechaFinISO = this.fechaFin.toISOString();

    this.auditoriaService.obtenerAuditoriasPorFecha(new Date(fechaInicioISO), new Date(fechaFinISO))
      .subscribe({
        next: (data) => {

          this.auditorias=data.auditorias
          console.log('Auditorías encontradas:', data);
        },
        error: (err) => {
          console.error('Error al consultar auditorías:', err);
        }
      });
  }
  consultarPorUsuario(){
    this.auditoriaService.obtenerAuditoriasPorUsuario(this.idSeleccionado)
      .subscribe({
        next: (data) => {

          this.auditorias=data.auditorias
          console.log('Auditorías encontradas:', data);
        },
        error: (err) => {
          console.error('Error al consultar auditorías:', err);
        }
      });
  }
  
}
  



