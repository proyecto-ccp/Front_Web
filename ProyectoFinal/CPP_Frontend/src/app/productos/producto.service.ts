import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

uploadFile(file: File): Observable<any> {
  const formData = new FormData();
  formData.append('file', file);


  const headers = new HttpHeaders({
    'Accept': 'text/plain'  // Puedes agregar más encabezados si es necesario
  });
  return this.http.post<any>('https://archivos-596275467600.us-central1.run.app/api/Archivos/EnviarPlanoCsv', formData, {
    headers, // Puedes agregar headers si es necesario
  });
}
}


