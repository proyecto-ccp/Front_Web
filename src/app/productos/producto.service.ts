import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private crearUrl = environment.apiUrl+'/api/Productos/Crear';
  private consultarUrl = environment.apiUrl+'/api/Productos/Consultar';
  private archivoUrl = environment.apiUrl+'/api/Archivos/EnviarPlanoCsv';
  private addPlanV=environment.apiUrlCP+'/api/PlanesVentas';

  constructor(private readonly http: HttpClient) {}

  guardarProducto(producto: any): Observable<any> {
    return this.http.post<any>(this.crearUrl, producto);
  }

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    const headers = new HttpHeaders({
      'Accept': 'text/plain'
    });

    return this.http.post<any>(this.archivoUrl, formData, { headers });
  }

  obtenerProductos(): Observable<any> {
    return this.http.get<any>(this.consultarUrl);
  }
  agregarProductos(planId: string, productos: { idProducto: number; valorTotal: number }[]): Observable<any> {
    
    const url = `${this.addPlanV}/${planId}/Productos`;
    return this.http.post(url, productos, {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      }
    });
  }
}