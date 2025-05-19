import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = environment.apiUrlPe+'/api/Pedido';

  constructor(private http: HttpClient) {}

  obtenerPedidosPorEstado(estado: string): Observable<any> {
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté guardado

    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': `Bearer ${token}`  // <-- Aquí agregamos el token
    });

    return this.http.get(`${this.apiUrl}/ObtenerPedidosPorEstado/${estado}`, { headers });
  }
}