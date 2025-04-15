import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RutaserviceService {
  private apiUrl = 'https://productos-596275467600.us-central1.run.app/api/Productos/Crear';
constructor(private http: HttpClient) { 

}
guardarProducto(ruta: any): Observable<any> {
  return this.http.post<any>(this.apiUrl, ruta);
}
}




