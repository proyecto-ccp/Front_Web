import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class RutaserviceService {
  private apiUrl = environment.apiUrlRu+'/api/Rutas';;
constructor(private http: HttpClient) { 

}
guardarRutas(ruta: any): Observable<any> {
  return this.http.post<any>(this.apiUrl, ruta);
}
obtenerRutas(): Observable<any> {
  return this.http.get<any>(this.apiUrl);
}

asociarPedidosARuta(idRuta: string, pedidos: { idPedido: string }[]): Observable<any> {
  const url = `${this.apiUrl}/${idRuta}/Pedidos`;

  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'accept': 'application/json'
  });

  return this.http.post(url, pedidos, { headers });
}

}




