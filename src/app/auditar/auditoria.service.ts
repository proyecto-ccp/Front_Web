import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {

  private apiUrl = environment.apiUrlAu+'/api/Auditoria';
  

  constructor(private http: HttpClient) {}

  obtenerAuditoriasPorFecha(fechaInicio: Date, fechaFin: Date): Observable<any> {
    const params = {
      fechaInicio: fechaInicio.toISOString(), // ejemplo: 2025-05-22T16:00:00.420Z
      fechaFin: fechaFin.toISOString()
    };
  
    return this.http.get(`${this.apiUrl}/ObtenerAuditoriasPorFecha`, { params });
  }
  obtenerAuditoriasPorUsuario(id: string): Observable<any> {
    const params = new HttpParams().set('id', id);
    return this.http.get(`${this.apiUrl}/ObtenerAuditoriasPorUsuario`, { params });
  }
}