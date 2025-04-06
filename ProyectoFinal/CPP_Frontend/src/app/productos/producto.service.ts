import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'https://productos-596275467600.us-central1.run.app/api/Productos/Crear';

constructor(private http: HttpClient) { }
guardarProducto(producto: any): Observable<any> {
  return this.http.post<any>(this.apiUrl, producto);
}
}
